"use client";
import { useEffect, useState } from "react";
import { bannerUrl } from "../utility/api/constant";
import Link from "next/link";

export default function Sale({ offer }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasEnded, setHasEnded] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!offer) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(offer.endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setHasEnded(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [offer]);

  if (!offer || hasEnded) return null; // Hide if no active offer or offer has ended  

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-xl border border-red-100">
          {/* Image Section */}
          <div className="md:w-1/2 h-72 md:h-auto bg-cover bg-center relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bannerUrl}/${offer.image})` }}
            ></div>
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full">
              {offer.discountType === 'percentage'
                ? `${offer.discountValue}% OFF`
                : `$${offer.discountValue} OFF`}
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 flex items-center p-8 md:p-12">
            <div className="w-full">
              {offer.subTitle && (
                <span className="text-red-600 text-sm font-medium uppercase tracking-wider block mb-2">
                  {offer.subTitle}
                </span>
              )}

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
                {offer.title}
              </h2>

              {offer.description && (
                <p className="text-gray-600 mb-6">
                  {offer.description.split('\r\n\r\n')[0]}
                </p>
              )}

              {/* Countdown Timer */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Offer ends in:</p>
                <div className="flex space-x-2 md:space-x-3">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <div className="bg-gray-900 text-white text-lg font-bold py-2 px-3 rounded-md w-12 md:w-14">
                        {unit.value.toString().padStart(2, "0")}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{unit.label}</span>
                    </div>
                  ))}
                </div>
              </div>

             
              <Link
                href={`/offeredProducts?offer=${offer._id}`}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
              >
                {offer.ctaText || "Shop Now"} →
              </Link>

              {offer.product && (
                <p className="text-xs text-gray-400 mt-3">
                  Featured: {offer.product.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
