import { Modal, Radio } from 'antd'
import React, { useState } from 'react'
import CreateAddress from '../user/CreateAddress'
import { HddOutlined, HomeOutlined } from '@ant-design/icons'

function DeliveryAddress({ address = [], selected, reload }) {
  const [popup, setPopup] = useState(false)

  const popupCloseHandle = () => {
    setPopup(false)
    reload(pre => !pre)
  }

  return (
    <div className='bg-gray-100 border border-gray-200 p-2 md:p-4 space-y-4'>
      <Modal open={popup} footer={false} onCancel={popupCloseHandle}>
        <CreateAddress close={popupCloseHandle} />
      </Modal>

      <div className='flex flex-row justify-between text-sm font-semibold'>
        Delivery Address
        <div className='text-blue-600 cursor-pointer' onClick={() => setPopup(true)}>
          Create New
        </div>
      </div>

      <Radio.Group
        className='grid grid-cols-1 md:grid-cols-3 overflow-y-auto gap-4 rounded-none'
        buttonStyle='outline'
        onChange={selected}
      >
        {
          address?.map((item) => (
            <Radio.Button
              key={item._id}
              className='bg-gray-200 rounded-none h-32 relative'
              value={item._id}
            >
              <div className='flex gap-4'>
                <div className='text-gray-400 text-6xl absolute bottom-4 right-4 z-0'>
                  {item.isOffice ? <HddOutlined /> : <HomeOutlined />}
                </div>

                <div>
                  <h3 className='font-bold truncate'>
                    {item.userName} {item.isOffice ? "(Office)" : "(Home)"}
                  </h3>
                  <p className='text-sm truncate'>
                    {item.buildingOrOffice}, {item.flatNumber}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>
                    {item.street}, {item.emirate?.emirate_name}
                  </p>
                </div>
              </div>
            </Radio.Button>
          ))
        }
      </Radio.Group>
    </div>
  );
}

export default DeliveryAddress