
'use client';

import CheckoutForm from './CheckoutForm'
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PostAPI from '../../utility/api/postApi';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage({ summary, orderId }) {
    const user = useSelector(state => state.user);
    
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        const fetchClientSecret = async () => {
            const data = await PostAPI({
                URI: "customers/payment/create-intent",
                API_TOKEN: user?.token,
                Data: { totalAmount: summary.grandTotal, orderId },
                isTop:true
            });
            console.log('data',data)
            setClientSecret(data.clientSecret);
        };

        if(orderId !== null){
            fetchClientSecret();
        }
    }, [summary.grandTotal, orderId]);

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
                    <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
                </Elements>
            )}
        </div>
    );
}