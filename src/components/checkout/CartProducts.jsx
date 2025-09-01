import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Price from "../global/Price";


function CartProducts() {
  const { items } = useSelector(state => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!items || items.length < 1) {
      router.push('/cart');
    }
  }, [items]);

  return (
    <div className='bg-gray-100 border border-gray-200 p-2 md:p-4 text-sm'>
      <div className='flex flex-row gap-2 md:gap-4 font-bold border-b border-gray-800 p-2'>
        <div className='w-1/2'>Item</div>
        <div className='w-1/4'>Quantity</div>
        <div className='w-1/4'>Price</div>
      </div>

      {items?.map((item, idx) => (
        <div
          key={idx}
          className='flex flex-row gap-2 md:gap-4 p-2 border-b border-gray-300'
        >
          <div className='w-1/2 line-clamp-1'>{item.product?.name}</div>
          <div className='w-1/4'>{item.quantity}</div>
          <div className='w-1/4'>
          {/* AED  {item.product?.salePrice || item.product?.regularPrice} */}
          <Price salePrice={2000} regularPrice={1590} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartProducts