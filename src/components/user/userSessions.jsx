import { useState } from 'react'
import Login from './Login'
import ForgotUser from './ForgotUser'
import SignUp from './SignUp'
import { ArrowLeftOutlined } from '@ant-design/icons';

function UserSession({ Close = () => {} }) {
  const [view, setView] = useState("login");
  const [viewHistory, setViewHistory] = useState(["login"]); // Track navigation history

  const goBack = () => {
    if (viewHistory.length > 1) {
      // Remove current view from history
      const newHistory = viewHistory.slice(0, -1);
      setViewHistory(newHistory);
      // Go to previous view
      setView(newHistory[newHistory.length - 1]);
    } else {
      // If no history, close the modal
      Close();
    }
  };

  const navigateTo = (newView) => {
    setViewHistory([...viewHistory, newView]);
    setView(newView);
  };

  const renderWindow = () => {
    switch (view) {
      case "forgot":
        return <ForgotUser Close={Close} goToLogin={() => navigateTo("login")} />;
      case "signup":
        return <SignUp Close={Close} goToLogin={() => navigateTo("login")} />;
      default:
        return <Login Close={Close} />;
    }
  };

  const getHeaderTitle = () => {
    switch (view) {
      case "forgot":
        return "Reset Password";
      case "signup":
        return "Create Account";
      default:
        return "Login";
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Header with back button and title */}
      <div className="flex items-center justify-between border-b pb-3">
        {view !== "login" ? (
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeftOutlined className="mr-1" />
            Back
          </button>
        ) : (
          <div />
        )}
        
        <h3 className="text-lg font-semibold text-gray-800 flex-1 text-center">
          {getHeaderTitle()}
        </h3>
        
        <button
          onClick={Close}
          className="text-gray-400 hover:text-gray-600 text-lg"
        >
          ×
        </button>
      </div>

      {/* Current view content */}
      {renderWindow()}

      {/* Footer navigation links */}
      <div className="flex flex-row justify-between pt-2 border-t">
        {view === "login" && (
          <button
            onClick={() => navigateTo("forgot")}
            className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
          >
            Forgot Password?
          </button>
        )}
        
        {view === "login" && (
          <button
            onClick={() => navigateTo("signup")}
            className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
          >
            New User? Sign Up
          </button>
        )}
        
        {view === "signup" && (
          <button
            onClick={() => navigateTo("login")}
            className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
          >
            Already have an account? Login
          </button>
        )}
        
        {view === "forgot" && (
          <button
            onClick={() => navigateTo("login")}
            className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}


export default UserSession