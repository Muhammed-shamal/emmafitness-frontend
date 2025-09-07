'use client'
import { Button, Form, Input, Select } from "antd"
import postApi from "../../utility/api/postApi";
import { useState } from "react";
import { useSignIn } from '../../utility/userHandle'
import { showToast } from "../../utility/redux/toastSlice";
import { useDispatch } from "react-redux";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';


function SignUp({ Close = () => { } }) {

  const signIn = useSignIn()
  const dispatch = useDispatch();

  const [result, setResult] = useState({
    loading: false, err: false, msg: ""
  });

  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your phone number!'));
    }
    if (!isValidPhoneNumber('+' + value)) {
      return Promise.reject(new Error('Please enter a valid phone number!'));
    }
    return Promise.resolve();
  };


  async function formHandle(e) {
    try {
      setResult({ ...result, loading: true });
      const user = await postApi({ URI: 'auth/customer/new-register', Data: e, isTop: true })
      console.log('user is', user);
      if (user.error) throw user

      signIn({
        token: user.token,
        userId: user?.customer?._id,
        userName: user?.customer?.name,
        phone: user?.customer?.phone,
        email: user?.customer?.email,
      })
      dispatch(showToast({ type: 'success', message: user?.message || 'Registered Successfully' }));
      setResult({ err: false, msg: "Registered Successfully", loading: false });
      Close && Close(true)

    } catch (error) {
      dispatch(showToast({ type: 'error', message: error?.message || 'Something went wrong' }));
      setResult({ err: true, msg: error?.message || "Unable to register", loading: false });
      console.error('Error during registration:', error);
    }
  }

  return (
    <div onSubmit={formHandle} className="flex flex-col justify-center ">
      <h2 className="font-semibold text-lg">Register New User</h2>

      <Form
        className="space-y-2"
        name="signUpForm"
        onFinish={formHandle}
        autoComplete="off"
      >
        <Form.Item name="name"
          rules={[
            {
              required: true,
              message: 'Please input your user name!',
            },
          ]}
        >
          <label>User Name
            <Input className="h-12" />
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
          name="phone"
          rules={[{ validator: validatePhoneNumber }]}
          label="Phone Number"
        >
          <PhoneInput
            country={'ae'} // Default country: United Arab Emirates (+971)
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
            }}
            containerStyle={{ width: '100%' }}
            inputStyle={{ width: '100%', height: '2.25rem' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters!',
            },
          ]}
        >
          <label>
            Password
            <Input.Password className="h-12" />
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
            <Input.Password className="h-12" />
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
            <Input className="h-12" />
          </label>
        </Form.Item>


        <Form.Item>
          {result.msg && (
            <p className={`${result.err ? 'text-red-500' : 'text-green-500'} text-sm text-center`}>
              {result.msg}
            </p>
          )}
          <Button type="primary" className="bg-blue-500 w-full " htmlType="submit" loading={result.loading} disabled={result.loading}>
            Register
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default SignUp

