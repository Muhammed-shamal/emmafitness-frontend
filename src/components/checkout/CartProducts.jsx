import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"


function CartProducts() {
  const items = useSelector(state => state?.orderDraft)
  const route = useRouter()
  useEffect(()=>{
    if(items.length < 1) route.push('/cart')
  },[])

  return (
    <div className='bg-gray-100 border border-gray-200 p-2 md:p-4 text-sm'>
      <div className='flex flex-row gap-2 md:gap-4 font-bold border-b border-gray-800 p-2'>
        <div className='w-1/2'>Item</div>
        <div className='w-1/4'>Quantity</div>
        <div className='w-1/4'>Price</div>
      </div>


      {
        items?.cartProduct?.map((it, idx) => (
          <div key={idx} className={`flex flex-row gap-2 md:gap-4 p-2 border-b border-gray-300'}`}>
            <div className='w-1/2 line-clamp-1'>{it?.name}</div>
            <div className='w-1/4'>{it?.quantity}</div>
            <div className='w-1/4'>{it?.Sale_Price || items?.Regular_Price}</div>
          </div>
        ))
      }
    </div>
  )
}

export default CartProducts