import { useState } from 'react'
import Login from './Login'
import ForgotUser from './ForgotUser'
import SignUp from './SignUp'

function UserSession({ Close = () => {} }) {
  const [view, setView] = useState("login");

  const renderWindow = () => {
    switch (view) {
      case "forgot":
        return <ForgotUser Close={Close} />;
      case "signup":
        return <SignUp Close={Close} />;
      default:
        return <Login Close={Close} />;
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {renderWindow()}
      <div className="flex flex-row justify-between">
        {view === "login" && (
          <span
            onClick={() => setView("forgot")}
            className="hover:cursor-pointer hover:text-red-500"
          >
            Forgot Password?
          </span>
        )}
        <span
          onClick={() => setView(view !== "signup" ? "signup" : "login")}
          className="hover:cursor-pointer hover:text-red-500"
        >
          {view === "signup" ? "Login?" : "New User?"}
        </span>
      </div>
    </div>
  );
}

export default UserSession