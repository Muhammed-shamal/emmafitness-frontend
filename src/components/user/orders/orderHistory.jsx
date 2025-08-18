'use client'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fetchApi from "../../../utility/api/fetchApi"
import { Card } from "antd"
import Image from "next/image"
import moment from "moment"

function OrderHistory() {

    const user = useSelector(state => state.user)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const bring = async () => {
            const order = user?.userId && await fetchApi({ URI: `orders?filters[user]=${user?.userId}sort[updatedAt]=desc`, API_TOKEN: user?.token })
            setOrders([...order?.data])
        }
        bring()
    }, [user])

    return (
        <div className="flex flex-col gap-2 md:gap-4">

            {orders?.map(items =>
                <Card key={items?.id} >
                    <div className='flex flex-row justify-between border-b border-gray-200 font-semibold'>
                        <div>Order No {String(items?.id).padStart(4, '0')}</div>
                        <p>{moment(items?.createdAt).format("DD-MMM-YYYY")}</p>
                        <div className='text-green-500 '> {items?.Status}</div>
                    </div>
                    {
                        items?.order_items?.data?.map(products => (
                            <div key={products?.id} className='flex gap-4 p-2 border-b border-b-gray-100 h-10'>
                                <Image src={products?.product?.data?.Feature_Photo?.data?.url ? process.env.NEXT_PUBLIC_API_URL + products?.product?.data?.attributes?.Feature_Photo?.data?.attributes?.url : "/product-placehold.png"} className="w-fit  rounded-full overflow-hidden object-contain" width={20} height={20} alt={'products?.attributes?.products'} />
                                <h3 className='font-semibold line-clamp-1 flex-1'>{products?.product?.data?.Name} </h3>
                                <h3 className='font-semibold line-clamp-1 '>{products?.quantity} </h3>
                                <h3 className='font-semibold line-clamp-1 '>x </h3>
                                <h3 className='font-semibold line-clamp-1 '>{products?.price} </h3>
                            </div>
                        ))
                    }
                </Card>
            )}
        </div>
    )
}

export default OrderHistory