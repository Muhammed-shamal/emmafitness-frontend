'use client';

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import PostAPI from "../../utility/api/postApi";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage({ summary, disabled, orderId }) {
    const user = useSelector(state => state.user);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentOpen, setPaymentOpen] = useState(false);

    // Fetch clientSecret only when paymentOpen becomes true
    useEffect(() => {
        console.log('try to succes payemnt')
        if (paymentOpen && !clientSecret) {
            const fetchClientSecret = async () => {
                try {
                    const data = await PostAPI({
                        URI: "customers/payment/create",
                        API_TOKEN: user?.token,
                        Data: { amount: summary.grandTotal, orderId: orderId, },
                        isTop: true
                    });

                    console.log('data is',data);
                    setClientSecret(data.client_secret);
                } catch (err) {
                    console.error("Failed to fetch client secret:", err);
                }
            };

            fetchClientSecret();
        }
    }, [paymentOpen, clientSecret, user?.token, orderId]);

    return (
        <form>
            <div id="checkout">
                {paymentOpen && clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                )}
            </div>

            <button
                type="button"
                disabled={disabled}
                onClick={() => setPaymentOpen(true)}
                className={`w-full rounded py-2 px-4 mt-4 transition-colors duration-200
          ${disabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'}
        `}
            >
                {disabled ? 'Processing...' : `Pay ${summary.grandTotal} AED`}
            </button>
        </form>
    );
}