import { useState } from "react"
import { Button, Input,message } from "antd"

import { useDispatch } from "react-redux"
import { showToast } from "../../utility/redux/toastSlice"
import PostAPI from "../../utility/api/postApi"
import { useRouter } from "next/navigation"

function ForgotUser({ close }) {
  const [email, setEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // ✅ Standard email validation

  const handleSendOtp = async () => {
    if (!emailRegex.test(email)) {
      dispatch(showToast({ type: "error", message: "Please enter a valid email address." }));
      return
    }
    
    try {
      setLoading(true)
      const res = await PostAPI({ URI: "auth/customer/send-otp", Data: { email }, isTop: true });
      console.log('res is', res);
      dispatch(showToast({ type: 'success', message: res.message }));
      setOtpSent(true);
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.response?.data?.message || "Failed to send OTP" }));
    } finally {
      setLoading(false)
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return message.error("Passwords do not match");
    try {
      setLoading(true)
      const res = await PostAPI({ URI: "auth/customer/verify-reset", Data: { email, otp, newPassword }, isTop: true });
      dispatch(showToast({ type: 'success', message: res.message }));
      router.refresh();
    } catch (err) {
      console.log('erroris', err);
      dispatch(showToast({ type: 'error', message: err.response?.data?.message || "Invalid or expired OTP" }));
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col justify-center gap-2 md:gap-4">
      <h2 className="font-semibold text-lg">Forgot Password</h2>

      <label>
        Email ID
        <div className="focus-within:outline outline-1 outline-blue-500 border border-gray-300 rounded flex flex-row items-center ">
          <Input
            className="h-9 border-none shadow-none"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={handleSendOtp}
            type="button"
            className="text-sm shrink-0 p-2 bg-blue-500 text-white rounded-r hover:cursor-pointer hover:bg-blue-400"
          >
            Get OTP
          </button>
        </div>
      </label>

      {otpSent && (
        <>
          <label>
            Enter OTP
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} className="h-10" placeholder="Enter OTP" />
          </label>
          <label>
            New Password
            <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-10" placeholder="New Password" />
          </label>
          <label>
            Confirm Password
            <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-10" placeholder="Confirm Password" />
          </label>
        </>
      )}

      <div className="text-center">
        <Button  htmlType="submit" type="primary" className="w-24 bg-blue-500" disabled={!otpSent || loading}>Reset</Button>
      </div>
    </form>
  );
}

export default ForgotUser;
