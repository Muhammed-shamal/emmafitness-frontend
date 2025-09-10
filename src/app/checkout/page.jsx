'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spin, Button } from 'antd';
import Title from '../../components/global/Title';
import DeliveryAddress from '../../components/checkout/DeliveryAddress';
import CartProducts from '../../components/checkout/CartProducts';
import DirectPurchaseProduct from '../../components/checkout/DirectPurchaseProduct';
import PriceSummary from '../../components/checkout/PriceSummary';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import UserSession from '../../components/user/userSessions';
import { bulkReplaceCart } from '../../utility/redux/cartSlice';
import { clearDirectPurchase } from '../../utility/redux/directPurchaseSlice';
import { showToast } from '../../utility/redux/toastSlice';
import updateApi from '../../utility/api/updateAPI';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import fetchApi from '../../utility/api/fetchApi';
import PostAPI from '../../utility/api/postApi';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const directPurchase = useSelector(state => state.directPurchase);

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [reload, setReload] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);

  // Check if we have items to purchase
  const hasCartItems = cart.items && cart.items.length > 0;
  const hasDirectPurchase = directPurchase.isDirectPurchase && directPurchase.product;

  console.log('has diectpurchase',hasDirectPurchase)

  // Redirect if no items to purchase
  useEffect(() => {
    if (!hasCartItems && !hasDirectPurchase) {
      router.push('/');
    }
  }, [hasCartItems, hasDirectPurchase, router]);

  useEffect(() => {
    if (!user || !user.userId) return;

    const ready = async () => {
      setLoading(true);
      const address = await fetchApi({
        URI: `customers/address/getBy/${user.userId}`,
        API_TOKEN: user.token
      });
      console.log('address drom server', address);
      setAddress(address);
      setLoading(false);
    };

    ready();
  }, [user, reload]);

  // Calculate order summary based on current flow
  const calculateSummary = () => {
    if (directPurchase.isDirectPurchase && directPurchase.product) {
      const product = directPurchase.product;
      const quantity = directPurchase.quantity;
      const subTotal = product.salePrice && product.salePrice < product.regularPrice
        ? product.salePrice * quantity
        : product.regularPrice * quantity;

      const shipping = 0; // Fixed shipping for example
      const taxAmount = subTotal * 0.05; // 5% tax
      const discount = product.salePrice && product.salePrice < product.regularPrice
        ? (product.regularPrice - product.salePrice) * quantity
        : 0;
      const grandTotal = subTotal + shipping + taxAmount;

      return { subTotal, shipping, taxAmount, discount, grandTotal };
    } else {
      // Regular cart flow
      const subTotal = cart.items.reduce((total, item) => total + (
        item.product.salePrice && item.product.salePrice < item.product.regularPrice
          ? item.product.salePrice * item.quantity
          : item.product.regularPrice * item.quantity
      ), 0);

      const shipping = 10; // Fixed shipping for example
      const taxAmount = subTotal * 0.05; // 5% tax
      const discount = cart.items.reduce((total, item) => total + (
        item.product.salePrice && item.product.salePrice < item.product.regularPrice
          ? (item.product.regularPrice - item.product.salePrice) * item.quantity
          : 0
      ), 0);
      const grandTotal = subTotal + shipping + taxAmount;

      return { subTotal, shipping, taxAmount, discount, grandTotal };
    }
  };

  const summary = calculateSummary();

  const buttonHandle = (data) => {
    setAddressId(data.deliveryAddress);
  };

  const createOrder = async () => {
    if (orderId) {
      // Order already created, no need to create again
      return;
    }

    if (!addressId) {
      alert('Please choose your address');
      return;
    }

    if (!user || !user.token) {
      setPopup(true);
      return;
    }

    try {
      setLoading(true);

      let orderItems = [];

      if (directPurchase.isDirectPurchase && directPurchase.product) {
        // Direct purchase flow
        orderItems = [{
          product: directPurchase.product._id,
          quantity: directPurchase.quantity,
        }];
      } else {
        // Cart flow
        orderItems = cart.items?.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        }));
      }

      const data = await PostAPI({
        URI: "customers/order/create",
        Data: {
          orderItems,
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

      dispatch(showToast({ type: "success", message: `Your order has been placed. Order# ${data._id}` }));
      setOrderId(data._id);
      setOrderData(data);

      // Clear cart after successful order creation (only if not direct purchase)
      if (!directPurchase.isDirectPurchase) {
        try {
          const data = await updateApi({
            URI: "customers/cart/replace/bulk",
            Data: {
              userId: user?.userId
            },
            token: user?.token,
            isTop: true
          });

          dispatch(bulkReplaceCart(data.cart));
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      } else {
        // Clear direct purchase state
        dispatch(clearDirectPurchase());
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      dispatch(showToast({ type: "error", message: "Order creation failed. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  // Create payment intent only after order is successfully created
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (orderId && !paymentIntentCreated) {
        try {
          const data = await PostAPI({
            URI: "customers/payment/create-intent",
            API_TOKEN: user?.token,
            Data: { totalAmount: summary.grandTotal, orderId: orderId },
            isTop: true
          });

          setClientSecret(data.clientSecret);
          setPaymentIntentCreated(true);
        } catch (error) {
          console.error("Error creating payment intent:", error);
          dispatch(showToast({ type: "error", message: "Payment setup failed. Please try again." }));
        }
      }
    };

    createPaymentIntent();
  }, [orderId, paymentIntentCreated, user?.token, summary.grandTotal, dispatch]);

  // Show nothing while checking for items
  if (!hasCartItems && !hasDirectPurchase) {
    return (
      <div className="container my-4 flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className='container my-4'>
      {popup && (
        <Modal
          open={true}
          onCancel={() => router.push(directPurchase.isDirectPurchase ? '/' : '/cart')}
          footer={null}
          width={400}
        >
          <UserSession Close={() => setPopup(false)} />
        </Modal>
      )}

      <Title titlePart2="Secure Checkout" />

      <Spin spinning={loading} tip="Processing your order...">
        <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
          {/* Left column - Order details */}
          <div className='flex-1 flex flex-col gap-4'>
            <DeliveryAddress address={address} selected={(e) => buttonHandle({ deliveryAddress: e?.target?.value })} reload={setReload} />

            {directPurchase.isDirectPurchase ? (
              <DirectPurchaseProduct product={directPurchase.product} quantity={directPurchase.quantity} />
            ) : (
              <CartProducts />
            )}

            {clientSecret && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#2563eb',
                        borderRadius: '6px'
                      }
                    }
                  }}
                >
                  <CheckoutForm
                    clientSecret={clientSecret}
                    orderData={orderData}
                  />
                </Elements>
              </div>
            )}
          </div>

          {/* Right column - Order summary */}
          <div className="w-full md:w-80">
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6 sticky top-4'>
              <h3 className='text-xl font-semibold mb-4'>Order Summary</h3>
              <div className='border-b border-gray-200 mb-4' />

              <PriceSummary
                total={summary.grandTotal}
                subTotal={summary.subTotal}
                grandTotal={summary.grandTotal}
                shipping={summary.shipping}
                discount={summary.discount}
                taxAmount={summary.taxAmount}
                taxName="VAT"
              />

              <div className='border-t border-gray-200 mt-4 pt-4'>
                <button
                  onClick={createOrder}
                  type='button'
                  disabled={!!orderId}
                  className={`w-full bg-blue-600 text-white rounded-lg text-center py-3 font-medium hover:bg-blue-700 transition-colors ${orderId ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {orderId ? "Order Created" : "Create Order & Continue to Payment"}
                </button>

                {orderId && !clientSecret && (
                  <div className="mt-3 text-sm text-blue-600 text-center">
                    Preparing payment gateway...
                  </div>
                )}

                <Button
                  type="default"
                  className="w-full mt-3"
                  onClick={() => router.push(directPurchase.isDirectPurchase ? '/' : '/cart')}
                >
                  {directPurchase.isDirectPurchase ? 'Continue Shopping' : 'Back to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default CheckoutPage;