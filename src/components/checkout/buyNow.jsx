import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {

  Modal,

  Spin,

} from 'antd';
import {
  ShoppingCartOutlined,

} from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { showToast } from '../../utility/redux/toastSlice';
import PostAPI from '../../utility/api/postApi';
import fetchApi from '../../utility/api/fetchApi';


// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const BuyNow2 = ({ productId, product }) => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    // Try to get default address if available
    if (user) {
      fetchDefaultAddress();
    }
  }, [user]);

  const fetchDefaultAddress = async () => {
    try {
      const data = await fetchApi({
        URI: `customers/address/getBy/${user.userId}`,
        API_TOKEN: user?.token,
      });
      console.log('data is address', data)
      if (data) {
        setAddressId(data[0]?._id);
      }
    } catch (error) {
      console.error("Failed to fetch default address:", error);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      dispatch(showToast({ type: 'error', message: 'Please login to continue' }));
      return;
    }

    console.log('product is',product)
    console.log('addressId is',addressId)

    if (!productId || !product?.salePrice || !addressId) {
      dispatch(showToast({ type: 'error', message: 'Missing product or shipping info' }));
      return;
    }


    setLoading(true);
    try {
      const quantity = 1;
      const itemsPrice = product.salePrice * quantity;
      const shippingPrice = 20; // Or calculate based on logic
      const taxPrice = 0; // Or calculate based on logic
      const totalAmount = itemsPrice + shippingPrice + taxPrice;

      // Create order

      const data = await PostAPI({
        URI: "customers/order/create",
        Data: {
          orderItems: [
            {
              product: productId,
              quantity,
              price: product.salePrice,
            }
          ],
          shippingAddress: addressId,
          paymentMethod: "Stripe",
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalAmount: totalAmount,
        },
        API_TOKEN: user?.token,
        isTop: true
      });

      setOrderId(data._id);

      // Create payment intent
      const paymentData = await PostAPI({
        URI: "customers/payment/create",
        API_TOKEN: user?.token,
        Data: { amount: totalAmount, orderId: orderId, },
        isTop: true
      });

      setClientSecret(paymentData.client_secret);
      setShowPayment(true);
    } catch (error) {
      console.error("Buy now error:", error);
      dispatch(showToast({ type: 'error', message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    dispatch(showToast({ type: 'success', message: 'Payment successful! Your order has been placed.' }));
    setShowPayment(false);
    router.push('/orders');
  };

  return (
    <>
      <button
        onClick={handleBuyNow}
        disabled={loading || product?.stockQty < 1}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${loading || product?.stockQty < 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
      >
        {loading ? (
          <Spin size="small" />
        ) : (
          <ShoppingCartOutlined />
        )}
        Buy Now
      </button>

      <Modal
        title="Complete Your Purchase"
        open={showPayment}
        onCancel={() => setShowPayment(false)}
        footer={null}
        width={750}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-1">
          {clientSecret ? (
            <div style={{ height: '500px' }}>
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" tip="Initializing payment..." />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};