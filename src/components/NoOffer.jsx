'use client'

import { useState } from 'react';
import PostAPI from '../utility/api/postApi';

export default function NoOffers() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await PostAPI({ URI: "subscribe/add", Data: { email }, isTop: true });
    if (response.message) {
      setSubscribed(true);
      setEmail('');
    }

    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-crimson-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100">
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                ></path>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            No Active Offers Right Now
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Check back soon for exclusive deals and promotions on our premium gym equipment and accessories.
          </p>

          {/* Features list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '⏰', title: 'Regular Sales', text: 'We offer discounts seasonally' },
              { icon: '🎁', title: 'Special Deals', text: 'Exclusive offers for members' },
              { icon: '📧', title: 'Get Notified', text: 'Be first to know about new offers' }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Email Subscription */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Get notified about future offers</h3>

            {subscribed ? (
              <div className="bg-green-100 text-green-700 py-3 px-4 rounded-lg">
                ✅ Thank you! We&apos;ll notify you when new offers are available.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>

          {/* Browse button */}
          {/* <div className="mt-8">
            <a
              href="/products"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              Browse Our Products
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}