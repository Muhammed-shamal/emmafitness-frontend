'use client'
import { Button, Form, Input, Select } from "antd"
import postApi from "../../utility/api/postApi";
import { useState } from "react";
import {useSignIn} from '../../utility/userHandle'

function SignUp({ Close=()=>{} }) {

  const signIn = useSignIn()

  const [result, setResult] = useState({
    loading: false, err: false, msg: ""
  })

  async function formHandle(e) {
    try{
      setResult({...result, loading: true})
      const user =  await postApi({URI: 'auth/local/register', Data: e, isTop: true})
      if(user.error) throw user

      signIn({token:user.jwt, userId:user?.user?.id, fullName: user?.user?.FullName })
      setResult({err: false, msg: "Successfully saved", loading: false})
     Close && Close(true)

    }catch(err){
      console.log(err)
      setResult({err: true, msg: err?.error?.message, loading: false})
    
    }
  }


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
          height: "2.25rem"
        }}
      >
        <Select.Option value="971">+971</Select.Option>

      </Select>
    </Form.Item>
  );

  const initialValues = {
    prefix: '971',
  };

  return (
    <div onSubmit={formHandle} className="flex flex-col justify-center ">
      <h2 className="font-semibold text-lg">Register New User</h2>


      <Form
        className="space-y-2"
        name="signUpForm"
        initialValues={initialValues}
        onFinish={formHandle}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="username"
          rules={[
            {
              required: true,
              message: 'Please input your user name!',
            },
          ]}
        >
          <label>User Name
            <Input  className="h-12"/>
          </label>
        </Form.Item>

        <Form.Item name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <label>
            Email ID
            <Input className="h-12" />
          </label>
        </Form.Item>

        <Form.Item
          name="Mobile"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },

          ]}
        >
          <label >
            Phone Number
            <Input addonBefore={prefixSelector} style={{ width: '100%' }}  />
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
            <Input.Password  className="h-12"/>
          </label>
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <label>
            Confirm Password
            <Input.Password  className="h-12"/>
          </label>
        </Form.Item>

        <Form.Item name="address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <label>Address
            <Input  className="h-12"/>
          </label>
        </Form.Item>


        <Form.Item>
        <p className={`${result.err ? "text-red-500" : "text-green-500"} text-center`}>{result.msg}</p>

          <Button type="primary" className="bg-blue-500 w-full " htmlType="submit" loading={result.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default SignUp

