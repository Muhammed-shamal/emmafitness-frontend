'use client'
import Image from 'next/image'
import Search from './Search'
import Link from 'next/link'
import { CloseOutlined, HeartOutlined, PhoneOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { bulkReplaceCart, setCart } from '../../utility/redux/cartSlice'
import { loggedIn } from '../../utility/redux/userSlice'
import Dropdown from 'antd/es/dropdown/dropdown'
import { Modal, Skeleton } from 'antd'
import fetchApi from '../../utility/api/fetchApi'
import { useSignOut } from '../../utility/userHandle'
import UserSession from '../user/userSessions'
import { addBulkWishlist, setWishList } from '../../utility/redux/wishListSlice'
import CategoryNav from './CategoryNav'
import { showToast } from '../../utility/redux/toastSlice'
import { useRouter } from 'next/navigation'


function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
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
    const fetchWishlist = async () => {
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
      fetchWishlist();
    }
  }, [user?.userId, user?.token, dispatch]);


  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const result = await fetchApi({
          URI: `customers/cart/getBy/${user?.userId}`,
          API_TOKEN: user?.token
        });

        console.log('result are',result);

        // Flatten and assign only items
        const cartItems = result?.items || [];
        dispatch(setCart(cartItems));
      } catch (error) {
        console.error(error.message || 'Failed to fetch cart')
      }
      setLoading(false);
    };

    if (user?.userId && user?.token) {
      fetchCart();
    }
  }, [user?.userId, user?.token, dispatch]);

  const handleCartClick = () => {
    if (user?.token) {
      router.push('/cart');
    } else {
      setPopup(true);
    }
  };


  const items = user?.userId ?
    [{
      key: '1',
      label: (<Link rel="noreferrer" href="/user"> Hi, {user?.userName} </Link>),
    },
    {
      key: '2',
      label: (<Link rel="noreferrer" href="/user/order"> My Orders </Link>),
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
      label: (<span onClick={() => signOut(user.token)} > Logout</span>),
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
        <Modal
          open={true}
          onCancel={() => setPopup(false)}
          footer={false}
          className="premium-modal"
          closeIcon={<CloseOutlined className="text-gray-500 hover:text-secondary transition-colors" />}
        >
          <UserSession Close={() => setPopup(false)} />
        </Modal>
      )}

      <header className="bg-white text-gray-800 sticky top-0 z-50 shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col">
          {/* Top bar with contact info and user actions */}
          <div className="hidden md:flex justify-between items-center py-2 border-b border-gray-100 text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Free shipping on orders over AED 200</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="text-gray-600 hover:text-secondary transition-colors">
                Contact Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="#stores" className="text-gray-600 hover:text-secondary transition-colors">
                Find Stores
              </Link>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1 font-medium">
                <PhoneOutlined className="text-secondary" />
                <Link href="tel:+971563296585" className="hover:text-secondary transition-colors">
                  +971 563296585
                </Link>
              </div>
            </div>
          </div>

          {/* Main header content */}
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
            {/* Logo */}
            <Link href="/" className="order-1 md:order-1">
              <div className="relative w-40 h-10 md:w-48 md:h-12">
                <Image
                  src="/logos/emma_logo.svg"
                  fill
                  alt="Emma Fitness Logo"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Search bar - Desktop */}
            <div className="order-3 md:order-2 w-full md:w-1/3 lg:w-1/2 mt-4 md:mt-0">
              <Search />
            </div>

            {/* Icons */}
            <div className="order-2 md:order-3 flex items-center space-x-6">
              {/* User */}
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                overlayClassName="premium-dropdown"
                trigger={['click', 'hover']}
              >
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
                  {user?.userId ? (
                    <UserOutlined className="text-xl text-gray-700" />
                  ) : (
                    <UserAddOutlined className="text-xl text-gray-700" />
                  )}
                </button>
              </Dropdown>

              {/* Wishlist */}
              <Skeleton loading={loading} active paragraph={false} title={false}>
                <Link
                  href="/user/wishlist"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative"
                >
                  <HeartOutlined className="text-xl text-gray-700" />
                  <div className="absolute -top-1 -right-1 h-5 w-5 text-xs text-white bg-secondary rounded-full flex items-center justify-center shadow-sm">
                    {wishList.items?.length || 0}
                  </div>
                </Link>
              </Skeleton>

              {/* Cart */}
              <Skeleton loading={loading} active paragraph={false} title={false}>
                <button
                  onClick={handleCartClick}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative"
                >
                  <ShoppingCartOutlined className="text-xl text-gray-700" />
                  <div className="absolute -top-1 -right-1 h-5 w-5 text-xs text-white bg-secondary rounded-full flex items-center justify-center shadow-sm">
                    {cart.items?.reduce((prev, cur) => parseInt(cur?.quantity || 1) + prev, 0) || 0}
                  </div>
                </button>
              </Skeleton>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-100">
          <CategoryNav />
        </div>
      </header>
    </>
  );

}


export default Header


