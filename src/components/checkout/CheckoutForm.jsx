'use client';

import { useEffect, useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement,
    PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';

export default function CheckoutForm({ clientSecret, orderId }) {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentRequest, setPaymentRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'AE',
                currency: 'aed',
                total: {
                    label: 'Order Total',
                    amount: 10000, // Update dynamically if needed
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then((result) => {
                if (result) {
                    setPaymentRequest(pr);
                }
            });
        }
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setMessage('');

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
            // Optionally: redirect to success page or show order summary
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {paymentRequest && (
                <PaymentRequestButtonElement options={{ paymentRequest }} />
            )}

            <div className="border p-4 rounded">
                <CardElement options={{ hidePostalCode: true }} />
            </div>

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>

            {message && <div className="text-sm text-red-600 mt-2">{message}</div>}
        </form>
    );
}
