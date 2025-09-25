import { useState } from "react"
import { Button, Input,message } from "antd"

import { useDispatch } from "react-redux"
import { showToast } from "../../utility/redux/toastSlice"
import PostAPI from "../../utility/api/postApi"
import { useRouter } from "next/navigation"

function ForgotUser({ close,goToLogin }) {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSendOtp = async () => {
    if (!emailRegex.test(email)) {
      dispatch(showToast({ type: "error", message: "Please enter a valid email address." }));
      return;
    }
    
    try {
      setLoading(true);
      const res = await PostAPI({ 
        URI: "auth/customer/send-otp", 
        Data: { email }, 
        isTop: true 
      });
      
      dispatch(showToast({ type: 'success', message: res.message }));
      setOtpSent(true);
    } catch (err) {
      dispatch(showToast({ 
        type: 'error', 
        message: err.response?.data?.message || "Failed to send OTP. Please try again." 
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    
    // Validation
    if (newPassword !== confirmPassword) {
      dispatch(showToast({ type: "error", message: "Passwords do not match" }));
      return;
    }
    
    if (newPassword.length < 6) {
      dispatch(showToast({ type: "error", message: "Password must be at least 6 characters long" }));
      return;
    }

    try {
      setLoading(true);
      const res = await PostAPI({ 
        URI: "auth/customer/verify-reset", 
        Data: { email, otp, newPassword }, 
        isTop: true 
      });
      
      dispatch(showToast({ type: 'success', message: res.message }));
      setResetSuccess(true);
      
      // Clear form and close after success
      setTimeout(() => {
        if (close) close();
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
        setResetSuccess(false);
      }, 2000);
      
    } catch (err) {
      dispatch(showToast({ 
        type: 'error', 
        message: err.response?.data?.message || "Invalid or expired OTP. Please try again." 
      }));
    } finally {
      setLoading(false);
    }
  };

  // If reset was successful, show success message
   if (resetSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="font-semibold text-lg text-green-700 mb-2">Password Reset Successful!</h2>
        <p className="text-gray-600 mb-4">Your password has been reset successfully.</p>
        <Button 
          type="primary" 
          onClick={goToLogin} // Use goToLogin instead of Close
          className="bg-green-600 hover:bg-green-700"
        >
          Continue to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleReset} className="flex flex-col justify-center gap-4 p-1">
      <h2 className="font-semibold text-lg text-gray-800">Reset Password</h2>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email ID</label>
        <div className="flex border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <Input
            type="email"
            className="flex-1 border-none shadow-none h-10"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || !emailRegex.test(email) || otpSent}
            className="px-4 bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Sending..." : "Get OTP"}
          </button>
        </div>
        {!otpSent && (
          <p className="text-xs text-gray-500">We&apos;ll send a verification code to your email</p>
        )}
      </div>

      {otpSent && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Verification Code</label>
            <Input 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              className="h-10"
              placeholder="Enter 6-digit code" 
              maxLength={6}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Input.Password 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="h-10"
              placeholder="Create new password" 
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <Input.Password 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="h-10"
              placeholder="Confirm new password" 
            />
          </div>
          
          <Button 
            htmlType="submit" 
            type="primary" 
            loading={loading}
            disabled={!otp || !newPassword || !confirmPassword}
            className="h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            Reset Password
          </Button>
        </>
      )}
      
      {/* <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={close}
          className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
        >
          Back to Login
        </button>
      </div> */}
    </form>
  );
}

export default ForgotUser;
