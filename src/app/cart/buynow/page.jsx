'use client'
import { useSearchParams, useRouter} from 'next/navigation'
import { useEffect } from 'react'
import useAddAndRemoveCart from '../../../utility/useAddAndRemoveCart'

function Page() {
  const {addCartHandle} = useAddAndRemoveCart()

  const params =  useSearchParams()
  const route = useRouter()

  useEffect(()=>{
    if(params.has('ProductId'))
    addCartHandle({ProductId: params.get('ProductId')})

    route.push('/cart')
  },[])

  return (
    <div>Loading...</div>
  )
}

export default Page