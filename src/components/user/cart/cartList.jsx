'use client'
import { useEffect, useState } from 'react'
import PriceSummary from '../../checkout/PriceSummary'
import Price from '../../global/Price'
import Image from 'next/image'
import CartButton from '../../global/CartButton'
import fetchApi from '../../../utility/api/fetchApi'
import useCheckout from '../../../utility/useCheckout'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderDraft } from '../../../utility/redux/orderDraftSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DeleteOutlined } from '@ant-design/icons'
import WishListButton from '../../global/WishListButton'
import useAddAndRemoveCart from '../../../utility/useAddAndRemoveCart'
import { Button,  message } from 'antd'
import CustomSpinner from '../../global/CustomSpinner'

function CartList() {
    const cartItem = useSelector(state => state.cart)
    const [cartProduct, setCartProduct] = useState([])
    const [accountSummery, setAccountSummery] = useState({})
    const [coupon, setCoupon] = useState({ code: '', valid: false, discount: 0, msg: '' })
    const [loading, setLoading] = useState(false)

    const prdoducts = useCheckout()
    const route = useRouter()
    const dispatch = useDispatch()

    const { removeCartHandle } = useAddAndRemoveCart()

    // cart detials
    useEffect(() => {
        const ready = async () => {
            setLoading(true)
            const { cartProducts, taxDetials, totalSummary } = await prdoducts({ discount: coupon?.discount })
            setCartProduct(cartProducts)
            setAccountSummery({ ...accountSummery, ...taxDetials, ...totalSummary })
            setLoading(false)
        }
        ready()

    }, [cartItem, coupon])


    // handle coupons needs to complete
    const couponHandle = async () => {
        try {
            setLoading(true)
            if (coupon.valid) {
                setCoupon({ ...coupon, valid: false, code: "", discount: 0 })
            } else {
                const result = await fetchApi({ URI: `coupons?filters[code][$eq]=${coupon?.code}` })
                if (result?.data?.length > 0) {
                    setCoupon({ ...coupon, valid: true, discount: result?.data?.[0]?.attributes?.discount_amount, msg: 'Coupon code applied successfully' })
                } else {
                    setCoupon({ ...coupon, valid: false, discount: 0, code: '', msg: 'Coupon not valid' })
                }
            }
        } catch (err) {
            message.error(err.message || err)
        } finally {

            setLoading(true)
        }
    }

    const checkoutHandle = () => {
        dispatch(addOrderDraft({ cartProduct, accountSummery }))
        route.push('/checkout')
    }
    return (
   <CustomSpinner spinning={loading}>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row gap-4 '>

                    <div className='flex-1 space-y-4'>
                        {
                            cartProduct ?
                            cartProduct?.map(item => (
                                
                                <CartItem key={item?.products}
                                Id={item?.products} Title={item?.name}
                                Photo={item?.photo}
                                Brand={item?.Brand}
                                Desc={item?.Short_Description}
                                SalePrice={item?.Sale_Price}
                                RegularPrice={item?.Regular_Price}
                                removeFromCart={removeCartHandle} />
                                
                                ))
                                : <div className='bg-red-200 border border-red-500 p-2 rounded text-sm'>Oops! Your cart is currently empty. <br />
                                    <Link href="/products" className='text-secondary font-semibold'>Click here </Link>to browse products and add items to your cart.</div>
                        }

                        <div className=' flex flex-row justify-between bg-gray-100 border border-gray-200 p-2 gap-2'>

                            <Link href="/products" className='p-1 md:p-3 h-10 rounded  text-blue-500 text-xs md:text-base font-semibold flex items-center justify-center'>Continue shopping</Link>
                            <div>

                                <div className='w-full border border-gray-300 rounded focus-within:border-blue-300 px-2 flex items-center max-w-sm bg-white'>
                                    <input onChange={(e) => setCoupon({ code: e.target.value, valid: false })} value={coupon?.code} disabled={coupon.valid} className='outline-none w-full' placeholder='Coupon Code' />
                                    <button onClick={couponHandle} disabled={cartProduct ? false : true} className='bg-blue-500 hover:bg-blue-700 px-4 py-1 text-sm text-white rounded'>{coupon?.valid ? "Remove" : "Apply"}</button>
                                </div>
                                <span className={coupon?.valid ? "text-green-500" : "text-red-500"}>{coupon.msg?.toString()}</span>
                            </div>

                        </div>
                    </div>

                    <div>

                        <div className='bg-gray-100 p-4 border border-gray-200 space-y-4 '>
                            <h4 className='font-semibold w-60'>Order Summary</h4>

                            <div className='flex flex-col gap-2 md:gap-4 '>

                                <PriceSummary
                                    total={accountSummery?.total}
                                    shipping={accountSummery?.shipping}
                                    discount={accountSummery?.discount}
                                    subTotal={accountSummery?.subTotal}
                                    taxName={accountSummery?.taxName}
                                    taxAmount={accountSummery?.taxAmount}
                                    grandTotal={accountSummery?.grandTotal} />

                                <button onClick={checkoutHandle} disabled={cartProduct ? false : true} type='primary' className='bg-blue-600 text-sm text-white rounded text-center py-2 hover:bg-blue-800'>Checkout</button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
    </CustomSpinner>
    )
}

export default CartList


const CartItem = ({ Id, Title, Photo, Desc, SalePrice, RegularPrice, removeFromCart, Brand }) => (
    <div className='flex flex-row gap-4 bg-gray-100 border border-gray-200  p-4'>
        <Image width={120} height={120} className='max-h-44 min-w-fit mix-blend-multiply' src={`${Photo ? Photo : "/product-placehold.png"}`} alt={Title} />
        <div className='flex flex-col justify-between items-start gap-4 w-full'>
            <div>

            <h2 className='font-semibold text-sm line-clamp-1'>{Title}</h2>
            <p className='text-xs line-clamp-2 text-gray-500'>Brand : {Brand}</p>
            </div>
            <p className='text-xs line-clamp-2'>{Desc}</p>
            <Price regularPrice={RegularPrice} salePrice={SalePrice} />
            <div className='flex flex-col md:flex-row gap-2 w-full justify-between flex-wrap'>

                <div className='flex flex-row gap-4 items-center flex-wrap'>
                    <CartButton ProductId={Id} />
                </div>
                <div>

                    <Button type='text' icon={<DeleteOutlined />} className='cursor-pointer' onClick={() => removeFromCart({ ProductId: Id })}>Remove</Button>
                    <WishListButton ProductId={Id} label={false} />
                </div>
            </div>
        </div>
    </div>
)