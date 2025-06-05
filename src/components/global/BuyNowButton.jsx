'use client'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import useAddAndRemoveCart from '../../utility/useAddAndRemoveCart'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

function BuyNow({ProductId }) {
  const router = useRouter()
    const {addCartHandle} = useAddAndRemoveCart()
    const buttonHandle = () =>{
        addCartHandle({ProductId})
        router.push('/cart')
    }


 
  return (
    <Button  className='text-blue-400 borde border-blue-500 border flex-1 h-10 rounded-none  gap-2 text-center flex items-center justify-center' onClick={buttonHandle} > Buy Now</Button>
  
  )
}

export default BuyNow