'use client'
import { Button, Input } from 'antd'
import Card from 'antd/es/card/Card'
import fetchApi from '../../../utility/api/fetchApi'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import updateApi from '../../../utility/api/updateAPI'

function Page() {

  const user = useSelector(state => state.user)
  const [data, setData] = useState({ FullName: '', username: '', Mobile: '', email: '' })
  const [result, setResult] = useState({ loading: false, err: false, msg: '' })


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi({ URI: 'users/me', API_TOKEN: user?.token }).catch(e => console.log(e))
      setData({
        FullName: data?.FullName, username: data?.username, Mobile: data?.Mobile, email: data?.email
      })
    }
    fetchData()
  }, [user?.token])


  const inputHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const formHandle = async (e) => {
    e.preventDefault()
    try {
      setResult({ ...result, loading: true })
      await updateApi({ URI: `users/${user?.userId}`, isTop: true, Data: data, token: user?.token })
      setResult({ ...result, loading: false, err: false, msg: "Updated successfully!" })
    } catch (err) {

      setResult({ ...result, loading: false, err: true, msg: err?.error?.message || err?.error || err?.message || err?.toString() })
    }
  }

  return (
    <div>
      <Card>
        <form onSubmit={formHandle} className='flex flex-col gap-2 justify-center'>
          <InputFeild onChange={inputHandle} value={data?.FullName} Name='FullName' Label={"Full Name"} />
          <InputFeild onChange={inputHandle} value={data?.username} Name='username' Label={"User Name"} />
          <InputFeild onChange={inputHandle} value={data?.Mobile} Name='Mobile' Label={"Mobile No"} />
          <InputFeild onChange={inputHandle} value={data?.email} Name='email' Label={"Email Id"} />
          {result.msg && <p className={result?.err ? 'text-secondary text-sm text-center' : "text-green-500 text-sm text-center"}>{result?.msg}</p>}
          <button><Button type='primary' loading={result?.loading} className='bg-blue-500 w-28'>Save</Button></button>
        </form>
      </Card>
    </div>
  )
}

export default Page


const InputFeild = ({ onChange, Label, Name, value }) => (
  <label>
    {Label}
    <Input value={value} className='rounded' onChange={onChange} name={Name} placeholder={Label} />
  </label>
)

