'use client'
import { useEffect, useState } from 'react'
import Title from '../../components/global/Title'
import DeliveryAddress from '../../components/checkout/DeliveryAddress'
import CartProducts from '../../components/checkout/CartProducts'
import PaymentType from '../../components/checkout/PaymentType'
import PriceSummary from '../../components/checkout/PriceSummary'
import { useDispatch, useSelector } from 'react-redux'
import fetchApi from '../../utility/api/fetchApi'
import { Form, Input, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import PostAPI from '../../utility/api/postApi'
import { bulkReplaceCart } from '../../utility/redux/cartSlice'
import { removeOrderDraft } from '../../utility/redux/orderDraftSlice'
import UserSession from '../../components/user/userSessions'
import CustomSpinner from '../../components/global/CustomSpinner'

function Page() {

  const [popup, setPopup] = useState(false)
  const [address, setAddress] = useState([])
  const [order, setOrder] = useState({})
  const [result, setResult] = useState({ err: false, loading: false, msg: "" })
  const [paymentStatus, setPaymentStatus] = useState(false)
  const orderDraft = useSelector(state => state?.orderDraft)

  const route = useRouter()
  const user = useSelector(state => state.user)
  const dispatcher = useDispatch()
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setOrder({ ...order, ...orderDraft })
  }, [orderDraft, user])



  useEffect(() => {
    const ready = async () => {
      setLoading(true)
      const address = await fetchApi({ URI: `addresses?filters[user][id][$eq]=${user?.userId}`, API_TOKEN: user?.token })
      setAddress([...address?.data])
      setLoading(false)
    }


    if (!user?.userId) setPopup(true)
    else ready()
  }, [user, reload])

  const buttonHandle = (e) => {
    setOrder(prev => ({
      ...prev, ...e
    }))
  }


  const checkoutHandle = async (values) => {
    try {
      if (!order?.deliveryAddress) throw new Error("Please select delivery address to proceed")
      else if (!order?.paymentType) throw new Error("Pease select payment type to proceed")
      else if (order?.items?.cartProduct?.lenght <= 0) throw new Error("There is no products")
      else if (order?.accountSummery?.grandTotal <= 0 || !order?.accountSummery?.grandTotal) throw new Error("Invalid price, go back to cart page")
      else {
    setLoading(true)
    
    const apiResult = await Promise.all([
      // post the order data into backend 
      PostAPI({
        URI: 'order-with-items', Data: {
          orderItems: order?.cartProduct,
          paymentType: order?.paymentType,
          user: user?.userId,
          tax: order?.accountSummery?.taxId,
          taxPers: order?.accountSummery?.taxPers,
          taxAmount: order?.accountSummery?.taxAmount,
          shippingCharge: order?.accountSummery?.shipping,
          address: order?.deliveryAddress,
          total_amount: order?.accountSummery?.total,
          discount: order?.accountSummery?.discount,
          subTotal: order?.accountSummery?.subTotal,
          Status: order?.paymentType != "Credit Card" ? "Pending" : "Payment Received"
        }, token: user?.token
      }).catch(e=>console.log(e)),

        ])
        // remove cart item from local Storage
        localStorage.clear('cart')
        
        // remove cart item from backend and redux
        dispatcher(bulkReplaceCart([]))
        dispatcher(removeOrderDraft())
        // sendMail({type: 'new-order'})
        
        
        // after that show success message and send mail
        setPaymentStatus(`Your order has been placed. Order# ${apiResult?.[0]?.data?.id} `)
      }
      
      setResult({ ...result, err: false, msg: "Action success" })
      
    } catch (err) {
      
      console.log(err)
      setResult({ ...result, err: true, msg: err.message || err.Error })
    }finally{
      
      setLoading(false)
    }
  }

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
        popup && <Modal open={true} onCancel={() => route.push('/cart')} footer={false}><UserSession Close={()=>setPopup(false)} /></Modal>
      }
      <Title titlePart2="Secure Checkout" />
      <CustomSpinner spinning={loading}>

      <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
        <div className='flex-1 flex flex-col gap-2 md:gap-4'>
          <DeliveryAddress address={address} selected={(e) => buttonHandle({ deliveryAddress: e?.target?.value })}  reload={setReload}/>
          <CartProducts />
          <PaymentType onSelect={(e) => buttonHandle({ paymentType: e.target.value })} />

          {
            order?.paymentType == 'creditcard' &&
            <div>
              <Form
                name="creditCardForm"
                className="w-full bg-white p-8 rounded-lg shadow-lg"
                onFinish={checkoutHandle}
                >
                <Form.Item
                  name="cardNumber"
                  label="Card Number"
                  rules={[{ required: true, message: 'Please enter your card number' }]}
                  >
                  <Input placeholder="Card Number" />
                </Form.Item>
                <Form.Item
                  name="cardHolder"
                  label="Card Holder"
                  rules={[{ required: true, message: 'Please enter the cardholder name' }]}
                  >
                  <Input placeholder="Card Holder" />
                </Form.Item>
                <div className='flex flex-row gap-4'>
                  <Form.Item
                    name="expiryDate"
                    label="Expiry Date"
                    rules={[{ required: true, message: 'Please enter the expiry date' }]}
                    >
                    <Input placeholder="MM/YY" />
                  </Form.Item>

                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[{ required: true, message: 'Please enter the CVV' }]}
                    >
                    <Input placeholder="CVV" />
                  </Form.Item>
                </div>
              </Form>
            </div>
          }
        </div>

        {/* summary section */}
        <div>
          <div className=' bg-gray-100 border border-gray-200 p-2 md:p-4 w-full md:w-60 flex flex-col gap-2'>
            <h3 className='font-semibold'>Summary</h3>
            <div className='border-b border-gray-200' />
            <PriceSummary
              total={order?.accountSummery?.total}
              subTotal={order?.accountSummery?.subTotal}
              grandTotal={order?.accountSummery?.grandTotal}
              shipping={order?.accountSummery?.shipping}
              discount={order?.accountSummery?.discount}
              taxAmount={order?.accountSummery?.taxAmount}
              taxName={order?.accountSummery?.taxName} />
            {result?.msg && <p className={`${result?.err ? "text-red-500" : "text-green-500"} text-sm`}>{result?.msg?.toString()}</p>}
            <button onClick={checkoutHandle} type='primary' className='bg-blue-600 text-sm text-white rounded text-center py-2 hover:bg-blue-800'>Pay</button>
          </div>
        </div>
      </div>
              </CustomSpinner>
    </div>
  )
}

export default Page

