'use client'

import { Button, Input, Spin, Card } from 'antd'
import fetchApi from '../../../utility/api/fetchApi'
import updateApi from '../../../utility/api/updateAPI'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { showToast } from '../../../utility/redux/toastSlice'
import { useSignIn } from "../../../utility/userHandle"

const Page = () => {
  const dispatch = useDispatch();
  const signIn = useSignIn()
  const user = useSelector(state => state.user)

  const [data, setData] = useState({ name: '', phone: '', email: '' })
  const [loadingData, setLoadingData] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // 🟡 Fetch customer profile
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        const response = await fetchApi({ URI: 'customers/me', API_TOKEN: user?.token })
        console.log("response in fetch", response)
        setData({
          name: response?.customer.name || '',
          phone: response?.customer.phone || '',
          email: response?.customer.email || ''
        })
      } catch (error) {
        console.error('Fetch error:', error.message);
        dispatch(showToast({ type: 'error', message: error.message || 'Failed to fetch profile data' }))
      } finally {
        setLoadingData(false)
      }
    }
    if (user?.token) fetchData()
  }, [dispatch, user?.token])

  // 🔵 Input change handler
  const inputHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // 🟢 Form submit
  const formHandle = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      let response = await updateApi({
        URI: `customer/account/update/${user?.userId}`,
        isTop: true,
        Data: data,
        token: user?.token
      })

      console.log("update response", response)

      signIn({
        token:user?.token,
        userId: response?.updated?._id,
        userName: response?.updated?.name,
        phone: response?.updated?.phone,
        email: response?.updated?.email,
      })

      dispatch(showToast({ type: 'success', message: 'Updated successfully' }))
    } catch (error) {
      console.error("❌ Profile Update failed:", error.message);
      dispatch(showToast({ type: 'error', message: error.message }));
    } finally {
      setSubmitting(false)
    }
  }

  // ✅ UI rendering
  return (
    <div className='p-4'>
      <Card>
        <Spin spinning={loadingData}>
          <form onSubmit={formHandle} className='flex flex-col gap-4 justify-center'>
            <InputField onChange={inputHandle} value={data?.name} Name='name' Label={"User Name"} />
            <InputField onChange={inputHandle} value={data?.phone} Name='phone' Label={"Phone No"} />
            <InputField onChange={inputHandle} value={data?.email} Name='email' Label={"Email Id"} />

            {/* {resultMsg.msg && (
              <p className={`${resultMsg.err ? 'text-red-500' : 'text-green-500'} text-sm text-center`}>
                {resultMsg.msg}
              </p>
            )} */}

            <Button htmlType='submit' type='primary' loading={submitting} className='w-28 self-center bg-blue-500'>
              Save
            </Button>
          </form>
        </Spin>
      </Card>
    </div>
  )
}

export default Page

// 🧩 Reusable Input
const InputField = ({ onChange, Label, Name, value }) => (
  <label className='flex flex-col text-sm gap-1'>
    {Label}
    <Input value={value} onChange={onChange} name={Name} placeholder={Label} className='rounded' />
  </label>
)
