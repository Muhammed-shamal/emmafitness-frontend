import { Button, Form, Input } from "antd"
import { useState } from "react"
import { useSignIn } from "../../utility/userHandle"
import PostAPI from "../../utility/api/postApi"
import { useDispatch } from "react-redux"
import { showToast } from "../../utility/redux/toastSlice"

function Login({ Close }) {
  const dispatch = useDispatch()
  const [result, setResult] = useState({ loading: false, err: false, msg: "" })
  const signIn = useSignIn()

  const formHandle = async (e) => {
    
    try {
      setResult({ ...result, loading: true });

      const user = await PostAPI({
        URI: 'auth/customer/login',
        Data: e,
        isTop: true,
      });      

      if (user.error) throw new Error(user.message);

      signIn({
        token: user.token,
        userId: user?.customer?.id,
        fullName: user?.customer?.name,
      });

      // setResult({ err: false, msg: 'Successfully logged in', loading: false });
      dispatch(showToast({ type: 'success', message: 'Successfully logged in!' }));

      if (Close) Close(true);

    } catch (err) {
      console.log(err);
      setResult({
        err: true,
        msg: err?.message || 'Something went wrong',
        loading: false,
      });
    }
  };


  return (
    <>
      <h2 className="font-semibold text-lg">Login</h2>
      <Form name="signInForm" onFinish={formHandle} autoComplete="off" className="space-y-2" >
        <Form.Item name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email',
            },
          ]}
        >
          <label> Email Id
            <Input className="h-12" />
          </label>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <label>
            Password
            <Input.Password />
          </label>
        </Form.Item>



        <Form.Item>
          <p className={`${result.err ? "text-red-500" : "text-green-500"} text-center`}>{result.msg}</p>

          <Button type="primary" className="bg-blue-500 w-full " htmlType="submit" loading={result.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login