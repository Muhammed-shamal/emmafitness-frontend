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
import { addBulkWishlist, setWishList } from '../../utility/redux/wishListSlice'
import CategoryNav from './CategoryNav'
import { showToast } from '../../utility/redux/toastSlice'


function Header() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const wishList = useSelector(state => state.wishList)
  const user = useSelector(state => state.user)
  const signOut = useSignOut()

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const restoreUser = async () => {
      try {
        if (token) {
          const response = await fetchApi({
            URI: 'customers/me',
            API_TOKEN: token,
          });

          console.log("response from auth me is", response);

          if (response?.customer) {
            dispatch(
              loggedIn({
                userId: response.customer._id,
                userName: response.customer.name,
                token,
              })
            );

            if (Array.isArray(response.carts)) {
              dispatch(
                bulkReplaceCart(
                  response.carts.map((pd) => ({
                    quantity: pd.quantity,
                    productId: pd.product?.id,
                  }))
                )
              );
            }

            if (Array.isArray(response.wishlists)) {
              dispatch(
                addBulkWishlist(
                  response.wishlists.map((item) => ({
                    id: item?.id,
                    ProductId: item?.product?.id,
                  }))
                )
              );
            }
          }
        } else {
          // Restore from local storage if not logged in
          const localCart = localStorage?.getItem('cart');
          if (localCart) {
            dispatch(bulkReplaceCart(JSON.parse(localCart)));
          }
        }
      } catch (error) {
        console.error("❌ Error restoring user:", error);
        dispatch(showToast({ type: 'error', message: error.message || 'Error restoring user' }))
      }
    };

    restoreUser();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchApi({
          URI: `customers/wishlist/getBy/${user?.userId}`,
          API_TOKEN: user?.token
        });

        // Flatten and assign only items
        const wishlistItems = result?.items || [];
        dispatch(setWishList(wishlistItems));
      } catch (error) {
        dispatch(showToast({
          type: 'error',
          message: error.message || 'Failed to fetch wishlist'
        }));
      }
      setLoading(false);
    };

    if (user?.userId && user?.token) {
      fetchData();
    }
  }, [user?.userId, user?.token, dispatch]);



  const items = user?.userId ?
    [{
      key: '1',
      label: (<Link rel="noreferrer" href="/user"> Hi, {user?.userName} </Link>),
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
                  {wishList.items?.length || 0}
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


