import { Button, Input } from "antd"


function ForgotUser({close}) {

    const formHandle = (e)=>{
        e.preventDefault()
    }
  return (
    <form onSubmit={formHandle} className="flex flex-col justify-center gap-2 md:gap-4">
      <h2 className="font-semibold text-lg">Froget Password</h2>
      <label>
        Email ID
        <div className=" focus-within:outline outline-1 outline-blue-500 border border-gray-300 rounded flex flex-row items-center ">
        <Input className="h-9 outline-none border-none shadow-none" placeholder="Email ID" />
        <span className="text-sm shrink-0 p-2 bg-blue-500 text-white rounded-r hover:cursor-pointer hover:bg-blue-400">Get OTP</span>
        </div>
      </label>
      <label>
        Enter OTP
        <Input className="h-10" placeholder="Enter OTP" />
      </label>
      <label>
        New Password
        <Input className="h-10" placeholder="New Password" />
      </label>
      <label>
        Confirm Password
        <Input className="h-10" placeholder="Confirm Password" />
      </label>

      <div className="text-center">
        <Button type="primary" className="w-24 bg-blue-500">Login</Button>
      </div>

     
    </form>
  )
}

export default ForgotUser