
'use client';

import CheckoutForm from './CheckoutForm'
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PostAPI from '../../utility/api/postApi';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage({ summary, orderData }) {
    const user = useSelector(state => state.user);

    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const fetchClientSecret = async () => {
            const data = await PostAPI({
                URI: "customers/payment/create-intent",
                API_TOKEN: user?.token,
                Data: { totalAmount: summary.grandTotal, orderId: orderData._id },
                isTop: true
            });
            console.log('data', data)
            setClientSecret(data.clientSecret);
        };

        if (orderData._id !== null) {
            fetchClientSecret();
        }
    }, [summary.grandTotal, orderData._id]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm clientSecret={clientSecret} orderData={orderData} />
                </Elements>
            )}
        </div>
    );
}