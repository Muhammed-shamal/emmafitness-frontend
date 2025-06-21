'use client'

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Card } from "antd"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import fetchApi from "../../../utility/api/fetchApi"
import Price from "../../global/Price"
import Link from "next/link"
import deleteAPI from "../../../utility/api/deleteApi"
import { removeWishList } from "../../../utility/redux/wishListSlice"
import useAddAndRemoveCart from "../../../utility/useAddAndRemoveCart"

function WishLists() {

    const user = useSelector(state => state.user)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const currentWishlist = useSelector(state => state.wishList)
    const { addCartHandle } = useAddAndRemoveCart()
    useEffect(() => {
        const fectData = async () => {
            setLoading(true)
            try {
                const result = await fetchApi({ URI: `wishlists?filters[users][id][$eq]=${user?.userId}`, API_TOKEN: user?.token }).catch(e=>console.log(e))
                setData([...result?.data])
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        fectData()
    }, [currentWishlist])

    const buttonHandle = async ({ id, cart = false }) => {
        try {
            if (cart) addCartHandle({ ProductId: id })
            await deleteAPI({ URI: `wishlists/${id}`, token: user?.token })
            dispatch(removeWishList(id))
        } catch (err) {
            console.log(err)
        }
    }




    return (
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            {
                data?.map((items, idx) => (

                    <Card key={idx} loading={loading}>
                        <div className='flex flex-col md:flex-row gap-4 '>

                            <div>
                                <Image src={`${items?.attributes?.product?.data?.attributes?.Feature_Photo?.data?.attributes?.url || "/"}`} alt='test' width={150} height={150} />
                            </div>

                            <div className='md:border-l border-gray-200 md:pl-4 flex flex-col items-stretch justify-between w-full'>
                                <Link href={`/product/${items?.attributes?.product?.data?.attributes?.Slug}`}><h3 className='font-semibold line-clamp-2 hover:text-secondary'>{items?.attributes?.product?.data?.attributes?.Name}</h3></Link>
                                <p className="text-xs text-gray-600 line-clamp-2">{items?.attributes?.product?.data?.attributes?.Short_Description}</p>
                                <Price regularPrice={items?.attributes?.product?.data?.attributes?.Regular_Price} salePrice={items?.attributes?.product?.data?.attributes?.Sale_Price
                                } />
                                <div className=' flex flex-row gap-4 justify-end'>
                                    <div onClick={() => buttonHandle({ id: items?.id, cart: true })} className='hover:text-secondary hover:cursor-pointer'>
                                        <ShoppingCartOutlined /> Add to cart
                                    </div>
                                    <div onClick={() => buttonHandle({ id: items?.id })} className='border-l border-gray-200 pl-3 hover:text-secondary hover:cursor-pointer'>
                                        <DeleteOutlined /> Remove

                                    </div>
                                </div>
                            </div>
                        </div>

                    </Card>
                ))
            }
        </div>
    )
}

export default WishLists