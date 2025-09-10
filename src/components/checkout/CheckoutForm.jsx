'use client'

import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ clientSecret, orderData }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [paymentRequest, setPaymentRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'tabby'

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'AE',
                currency: 'aed',
                total: {
                    label: 'Order Total',
                    amount: Math.round(orderData.totalAmount * 100), // Convert to cents
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.on('paymentmethod', async (ev) => {
                setLoading(true);
                const { error } = await stripe.confirmCardPayment(
                    clientSecret,
                    { payment_method: ev.paymentMethod.id },
                    { handleActions: false }
                );

                if (error) {
                    setMessage(error.message);
                    ev.complete('fail');
                } else {
                    ev.complete('success');
                    setMessage('✅ Payment successful!');
                    router.push('/user/order');
                }
                setLoading(false);
            });

            pr.canMakePayment().then((result) => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        }
    }, [stripe, clientSecret, orderData.totalAmount, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setMessage('');

        try {
            if (paymentMethod === 'card') {
                // Standard card payment
                const cardElement = elements.getElement(CardElement);
                
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                    },
                });

                if (error) {
                    setMessage(error.message);
                } else if (paymentIntent.status === 'succeeded') {
                    setMessage('✅ Payment successful!');
                    router.push('/user/order');
                }
            } else if (paymentMethod === 'tabby') {
                // For Tabby, we need to redirect to their payment page
                // This would require additional Tabby-specific integration
                setMessage('Tabby payment selected. This would redirect to Tabby payment page.');
                
                // In a real implementation, you would:
                // 1. Create a Tabby session
                // 2. Redirect to Tabby's payment page
                // 3. Handle the callback
            }
        } catch (error) {
            setMessage(error.message || 'An error occurred during payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
            {/* Payment Method Selector */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div 
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                            paymentMethod === 'card' 
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-sm font-medium">Credit Card</span>
                        </div>
                    </div>
                    
                    <div 
                        className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                            paymentMethod === 'tabby' 
                                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('tabby')}
                    >
                        <div className="flex flex-col items-center">
                            <img src="/payment-icons/tabby.svg" alt="Tabby" className="h-8 w-auto mb-2" />
                            <span className="text-sm font-medium">Tabby</span>
                        </div>
                    </div>
                </div>
            </div>

            {paymentRequest && paymentMethod === 'card' && (
                <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">Quick Payment</div>
                    <PaymentRequestButtonElement
                        options={{ paymentRequest }}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    />
                </div>
            )}

            {paymentMethod === 'card' && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Details</h3>

                    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                        <CardElement
                            options={{
                                hidePostalCode: true,
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                        padding: '10px',
                                    },
                                }
                            }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your payment details are encrypted and secure
                    </p>
                </div>
            )}

            {paymentMethod === 'tabby' && (
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Pay with Tabby</h3>
                    <p className="text-sm text-purple-700 mb-4">
                        Pay in 4 interest-free installments. No fees, no interest.
                    </p>
                    <div className="bg-white p-3 rounded border border-purple-100">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Today</span>
                            <span className="font-medium">AED {orderData.totalAmount ? (orderData.totalAmount / 4).toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>In 2 weeks</span>
                            <span className="font-medium">AED {orderData.totalAmount ? (orderData.totalAmount / 4).toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>In 4 weeks</span>
                            <span className="font-medium">AED {orderData.totalAmount ? (orderData.totalAmount / 4).toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>In 6 weeks</span>
                            <span className="font-medium">AED {orderData.totalAmount ? (orderData.totalAmount / 4).toFixed(2) : '0.00'}</span>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className={`
                    w-full py-3 px-4 rounded-lg font-medium text-white
                    transition-all duration-200 flex items-center justify-center
                    ${!stripe || loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : paymentMethod === 'tabby' 
                            ? 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                    }
                `}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </>
                ) : (
                    <>
                        {paymentMethod === 'tabby' ? (
                            <>
                                <img src="/payment-icons/tabby.svg" alt="Tabby" className="h-5 w-5 mr-2" />
                                Pay with Tabby
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Pay Now
                            </>
                        )}
                    </>
                )}
            </button>

            {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${
                    message.includes('success') || (!message.includes('fail') && !message.includes('error'))
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                    <div className="flex items-start">
                        {message.includes('success') || (!message.includes('fail') && !message.includes('error')) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        <span>{message}</span>
                    </div>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-4">
                    <img src="/payment-icons/tabby.svg" alt="Tabby" className="h-8" />
                    <img src="/payment-icons/visa.svg" alt="Visa" className="h-8" />
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-8" />
                    <img src="/payment-icons/paypal.svg" alt="PayPal" className="h-8" />
                </div>
                <p className="text-xs text-center text-gray-500 mt-3">
                    All transactions are secure and encrypted. We never store your payment details.
                </p>
            </div>
        </form>
    );
}