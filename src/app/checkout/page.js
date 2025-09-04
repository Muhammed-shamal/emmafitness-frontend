'use client'
import { useEffect, useState } from 'react'
import Title from '../../components/global/Title'
import DeliveryAddress from '../../components/checkout/DeliveryAddress'
import CartProducts from '../../components/checkout/CartProducts'
import PriceSummary from '../../components/checkout/PriceSummary'
import { useDispatch, useSelector } from 'react-redux'
import fetchApi from '../../utility/api/fetchApi'
import { useRouter } from 'next/navigation'
import PostAPI from '../../utility/api/postApi'
import UserSession from '../../components/user/userSessions'
import CustomSpinner from '../../components/global/CustomSpinner'
import { Modal } from 'antd'
import { showToast } from '../../utility/redux/toastSlice'
import updateApi from '../../utility/api/deleteApi'
import CheckoutPage from '../../components/checkout/CheckoutPage'
import { bulkReplaceCart } from '../../utility/redux/cartSlice'

function Page() {
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState(false)
  const [address, setAddress] = useState([])
  const [addressId, setAddressId] = useState(null);
  const [order, setOrder] = useState({})
  // const [result, setResult] = useState({ err: false, loading: false, msg: "" })
  const orderDraft = useSelector(state => state?.orderDraft)

  const route = useRouter()
  const { items } = useSelector((state) => state.cart);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const [summary, setOrderSummary] = useState(null);
  const [reload, setReload] = useState(false)
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false)


  useEffect(() => {
    setOrder({ ...order, ...orderDraft })
  }, [orderDraft, user])

  useEffect(() => {
    if (!user || !user.userId) return;

    const ready = async () => {
      setLoading(true);
      const address = await fetchApi({
        URI: `customers/address/getBy/${user.userId}`,
        API_TOKEN: user.token
      });
      setAddress([...address]);
      setLoading(false);
    };

    ready();
  }, [user, reload]);

  useEffect(() => {
    if (!user || !user.userId) return;
    const fetchSummary = async () => {
      const data = await fetchApi({ URI: `customers/cart/summary/${user?.userId}`, API_TOKEN: user?.token });
      setOrderSummary(data);
    };
    fetchSummary();
  }, []);

  useEffect(() => {
    if (user === null || user?.userId === undefined) {
      setPopup(true);
    } else { setPopup(false) }
  }, [user]);


  const buttonHandle = (e) => {
    setAddressId(e.deliveryAddress);
  }

  const createOrder = async () => {
    if (!addressId) {
      alert('Please choose your address');
      return;
    }
    try {
      setLoading(true);
      const data = await PostAPI({
        URI: "customers/order/create",
        Data: {
          orderItems: items?.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          shippingAddress: addressId,
          paymentMethod: "Stripe",
          itemsPrice: summary.subTotal,
          shippingPrice: summary.shipping,
          taxPrice: summary.taxAmount,
          totalAmount: summary.grandTotal,
        },
        API_TOKEN: user?.token,
        isTop: true
      });


      dispatch(showToast({ type: "success", message: `Your order has been placed. Order# ${data?._id}` }));
      setOrderId(data._id);
      try {
        const data = await updateApi({
          URI: "customers/carts/replace/bulk",
          Data: {
            userId: user?.userId
          },
          API_TOKEN: user?.token,
          isTop: true
        });
        console.log("bulk data is",data);
        dispatch(bulkReplaceCart(data.cart));
      } catch (error) {
        console.error("something went wrong for remove from cart");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container my-4 '>
      {
        paymentStatus &&
        <Modal open cancelButtonProps={false}
          title="Order Placed!"
          okButtonProps={{ className: 'bg-blue-500' }}
          okText="Go to home"
          cancelText="Ok"
          onCancel={() => route.push("/")}
          onOk={() => route.push("/")}
        >{paymentStatus}</Modal>
      }
      {
        popup && <Modal open={true} onCancel={() => route.push('/cart')} footer={false}><UserSession Close={() => setPopup(false)} /></Modal>
      }
      <Title titlePart2="Secure Checkout" />

      <CustomSpinner spinning={loading}>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
          <div className='flex-1 flex flex-col gap-2 md:gap-4'>
            <DeliveryAddress address={address} selected={(e) => buttonHandle({ deliveryAddress: e?.target?.value })} reload={setReload} />
            <CartProducts />
            <CheckoutPage summary={summary ? summary : {
              subTotal: 0,
              discount: 0,
              itemsPrice: 0,
              taxAmount: 0,
              shipping: 0,
              grandTotal: 0
            }} disabled={orderId === null} orderId={orderId} />
          </div>

          {/* summary section */}
          <div>
            <div className=' bg-gray-100 border border-gray-200 p-2 md:p-4 w-full md:w-60 flex flex-col gap-2'>
              <h3 className='font-semibold'>Summary</h3>
              <div className='border-b border-gray-200' />
              <PriceSummary
                total={summary?.grandTotal}
                subTotal={summary?.subTotal}
                grandTotal={summary?.grandTotal}
                shipping={summary?.shipping}
                discount={summary?.discount}
                taxAmount={summary?.taxAmount}
                taxName="VAT"
              />
              {/* {result?.msg && <p className={`${result?.err ? "text-red-500" : "text-green-500"} text-sm`}>{result?.msg?.toString()}</p>} */}
              <button onClick={createOrder} type='primary' className='bg-blue-600 text-sm text-white rounded text-center py-2 hover:bg-blue-800'>Create Order</button>
            </div>
          </div>
        </div>
      </CustomSpinner>
    </div>
  )
}

export default Page

