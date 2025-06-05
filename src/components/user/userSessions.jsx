import { useState } from 'react'
import Login from './Login'
import ForgotUser from './ForgotUser'
import SignUp from './SignUp'

function UserSession({Close=()=>{}}) {
  const [window, setWindow] = useState(<Login Close={Close} />)
  return (
    <div className='flex flex-col gap-4'>
      {window}
      <div className="flex flex-row justify-between">
          <span onClick={() => setWindow(<ForgotUser   close={Close}/>)} className="hover:cursor-pointer hover:text-red-500">Forgote?</span>
          <span onClick={() => setWindow(prevState => prevState?.type?.name  !== "SignUp" ?  <SignUp  Close={Close} /> : <Login Close={Close}/>)} className="hover:cursor-pointer hover:text-red-500">
           {window.type?.name  === "SignUp" ? "Login?" :  "New User?"}
            </span>
        </div>
    </div>
  )
}

export default UserSession