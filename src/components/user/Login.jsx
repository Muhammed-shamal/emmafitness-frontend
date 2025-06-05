import { Button, Form, Input } from "antd"
import { useState } from "react"
import { useSignIn } from "../../utility/userHandle"
import PostAPI from "../../utility/api/postApi"

function Login({Close}) {
    const [result, setResult] = useState({ loading: false, err: false, msg: "" })
    const signIn = useSignIn()

    const formHandle = async (e) => {
      try {
        setResult({ ...result, loading: true })
        const user = await PostAPI({ URI: 'auth/local', Data: e, isTop: true }).catch(err => { throw err })
        if(user.error) throw user
        signIn({ token: user.jwt, userId: user?.user?.id, fullName: user?.user?.FullName })
        setResult({ err: false, msg: "Successfully legged in", loading: false })
        if(Close) Close(true)
      router.back()
      } catch (err) {
        console.log(err)
        setResult({ err: true, msg: err?.error?.message , loading: false })
      }
    }

  return (
    <>
      <h2 className="font-semibold text-lg">Login</h2>
      <Form name="signInForm" onFinish={formHandle} autoComplete="off" className="space-y-2" >
        <Form.Item name="identifier"
          rules={[
            {
              required: true,
              message: 'Please input your Email / User name!',
            },
          ]}
        >
          <label>  User Name / Email Id
            <Input className="h-12"/>
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