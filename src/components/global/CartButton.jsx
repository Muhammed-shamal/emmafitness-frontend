'use client'
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useSelector } from "react-redux"

import useAddAndRemoveCart from "../../utility/useAddAndRemoveCart"

function CartButton({ ProductId }) {
  const allCart = useSelector(state => state.cart.items)
  const {addCartHandle, removeCartHandle} = useAddAndRemoveCart({ProductId})
  const thisCart = allCart?.filter(itm => itm.productId == ProductId)
  return (
    thisCart?.[0]?.productId !== ProductId ?
      <Button className='text-white bg-blue-500 flex-1 hover:text-white h-10  rounded-none gap-2 text-center flex items-center justify-center' onClick={()=>addCartHandle({ProductId})} icon={<ShoppingCartOutlined />}> Add to cart</Button>
      : <div className="flex flex-row justify-center "><Button className="h-10 rounded-none" icon={<MinusOutlined />} onClick={()=>removeCartHandle({ProductId})} />
        <div className="flex justify-center items-center w-8">
          {thisCart?.[0]?.quantity}
        </div>
        <Button className="h-10 rounded-none" icon={<PlusOutlined />} onClick={()=>addCartHandle({ProductId})} />
      </div>
  )
}

export default CartButton
// export {addCartHandle}