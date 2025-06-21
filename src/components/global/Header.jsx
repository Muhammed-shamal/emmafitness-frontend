'use client'
import Image from 'next/image'
import Search from './Search'
import Link from 'next/link'
import { HeartOutlined, PhoneOutlined, ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { bulkReplaceCart } from '../../utility/redux/cartSlice'
import { loggedIn } from '../../utility/redux/userSlice'
import Dropdown from 'antd/es/dropdown/dropdown'
import { Modal } from 'antd'
import fetchApi from '../../utility/api/fetchApi'
import { useSignOut } from '../../utility/userHandle'
import UserSession from '../user/userSessions'
import { addBulkWishlist } from '../../utility/redux/wishListSlice'
import CategoryNav from './CategoryNav'


function Header() {

    const dispatcher = useDispatch()
    const cart = useSelector(state => state.cart)
    const wishList = useSelector(state => state.wishList)
    const user = useSelector(state => state.user)
    const signOut = useSignOut()

    const [popup, setPopup] = useState(false)

    useEffect(() => {

        const token = localStorage.getItem('token')
        const checkUser = async () => {

            if (token) {

                const users = await fetchApi({ URI: 'users/me?populate=carts.product,wishlists.product', API_TOKEN: token }).catch(e => console.log(e))
                dispatcher(loggedIn({ userId: users?.id, fullName: users?.FullName, token }))
                dispatcher(bulkReplaceCart(users?.carts?.map(pd => ({ quantity: pd?.quantity, productId: pd?.product.id }))))
                dispatcher(addBulkWishlist(users?.wishlists?.map((item) => (
                    {
                        id: item?.id,
                        ProductId: item?.product?.id
                    }
                ))))

            } else if (typeof localStorage !== 'undefined') {
                dispatcher(bulkReplaceCart(JSON.parse(localStorage?.getItem('cart'))))
            }

        }

        checkUser()


    }, [])



    const items = user?.userId ?
        [{
            key: '1',
            label: (<Link rel="noreferrer" href="/user"> Hi, {user?.fullName} </Link>),
        },
        {
            key: '2',
            label: (<Link rel="noreferrer" href="/user/order"> Order History </Link>),
        },
        {
            key: '3',
            label: (<Link rel="noreferrer" href="/user/address"> Address </Link>),
        },
        {
            key: '4',
            label: (<Link rel="noreferrer" href="/user/service">Service Request</Link>),
        },
        {
            key: '5',
            label: (<Link rel="noreferrer" href="/user/profile"> Profile</Link>),
        },
        {
            key: '6',
            label: (<span onClick={() => signOut()} > Logout</span>),
        }
        ] :
        [{
            key: '7',
            label: (<div onClick={() => setPopup(!popup)} className='w-24'> Login </div>),
        }
        ]

    return (
        <>
            {popup && (
                <Modal open={true} onCancel={() => setPopup(false)} footer={false}>
                    <UserSession Close={() => setPopup(false)} />
                </Modal>
            )}

            <div className='bg-lightPrimary text-black sticky top-0 z-50 shadow-md'>
                <div className='container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 py-2'>

                    {/* Logo */}
                    <Link href="/">
                        <Image src="/logos/emma_logo.svg" width={200} height={65} alt='Emma Fitness Logo' />
                    </Link>

                    {/* Search bar - Desktop */}
                    <div className='flex-1 hidden md:block'>
                        <Search />
                    </div>

                    {/* Phone number */}
                    <div className='hidden md:flex items-center gap-2 font-bold text-sm'>
                        <PhoneOutlined className='text-secondary' />
                        <Link href="tel:+91 8304912033">
                            +91 8304912033</Link>
                    </div>

                    {/* Icons */}
                    <div className='text-xl md:text-2xl font-bold flex flex-row gap-4 cursor-pointer items-center'>
                        {/* User */}
                        <Dropdown menu={{ items }} placement='top' arrow>
                            <UserAddOutlined className='text-red-500' />
                        </Dropdown>

                        {/* Wishlist */}
                        <Link href="/user/wishlist" className='hover:text-secondary'>
                            <div className='relative'>
                                <HeartOutlined className='text-red-500' />
                                <div className='h-4 w-4 text-xs text-white bg-secondary rounded-full flex items-center justify-center absolute -top-1 -right-1'>
                                    {wishList?.reduce((prev, cur) => parseInt(cur?.quantity || 1) + prev, 0)}
                                </div>
                            </div>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className='hover:text-secondary text-3xl'>
                            <div className='relative'>
                                <ShoppingCartOutlined className='text-red-500' />
                                <div className='h-4 w-4 text-xs text-white bg-secondary rounded-full flex items-center justify-center absolute -top-1 -right-1'>
                                    {cart?.reduce((prev, cur) => parseInt(cur?.quantity || 1) + prev, 0) || 0}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Mobile View: Search and Phone */}
                <div className='block md:hidden container pb-2'>
                    <div className='mb-2'><Search /></div>
                    <div className='flex items-center gap-2 text-sm'>
                        <PhoneOutlined className='text-secondary' />
                        <Link href="tel:+91 8304912033">
                            +91 8304912033</Link>
                    </div>
                </div>

                {/* Category List */}
                <CategoryNav />
            </div>
        </>
    )

}


export default Header


