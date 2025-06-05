'use client'
import { Button, Card, Modal } from 'antd'
import Image from 'next/image'
import  { useEffect, useState } from 'react'
import RegisterService from '../../../components/user/service/RegisterService'
import fetchApi from '../../../utility/api/fetchApi'
import { useSelector } from 'react-redux'

function Page() {

  const [popup, setPopup] = useState(false)
  const [requests, setRequests] = useState([])
  const userDetails = useSelector(state => state.user)


  useEffect(()=>{
    userDetails?.userId && fetchApi({ URI: `service-requests?filters[user][id][$eq]=${userDetails?.userId}&sort=createdAt:Desc`, API_TOKEN: userDetails?.token })
    .then((res) => {
        setRequests([...res?.data])
    })
    .catch(e => console.log(e))
  },[userDetails])


  return (
   

    <div className="space-y-4">
      
      <div className="flex flex-row justify-end">
        <Button onClick={() => setPopup(!popup)} type="primary" className="bg-blue-500">
          Add New
        </Button>
        <Modal footer={false} open={popup} onCancel={() => setPopup(false)}>
        <RegisterService close={()=>setPopup(false)} />
      </Modal>
      </div>
      {requests?.map((item, idx) => (
      <Card key={idx}>
         <div className='flex flex-row justify-between border-b border-gray-200 font-semibold'>
           <div>Service Order No {String(item?.id).padStart(4, '0')}</div>
           <div className='text-green-500 '> {item?.attributes?.Status}</div>
         </div>
             <div className='grid mt-4'>

               <h3 className='font-semibold truncate'>{item?.attributes?.Subject}
               </h3>
               <p className='truncate'>{item?.attributes?.Description}</p>
               <p className='text-xs'>Dated: {item?.attributes?.createdAt}</p>
             </div>
       </Card>
      ))}
    </div>
  )
}

export default Page