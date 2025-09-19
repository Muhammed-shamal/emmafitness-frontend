'use client'

import { useEffect, useRef, useState } from "react";
import ScrollButton from '../global/ScrollButton'
import Image from "next/legacy/image";
import fetchApi from "../../utility/api/fetchApi";
import Link from "next/link";
import { brandUrl } from "../../utility/api/constant";

function OurBrands() {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi({
          URI: 'public/brands?populate=*&sort=updatedAt&pagination[limit]=1'
        });

        if (result?.data?.length > 0) {
          const brandData = result.data[0];
          setBrand({
            name: brandData.name,
            logo: brandUrl + '/' + brandData.logo,
            description: brandData.description || "Premium quality products for your needs",
            slug: "/brand/" + brandData.slug,
            coverImage: brandData.coverImage ? brandUrl + '/' + brandData.coverImage : null
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brand:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="w-full h-40 bg-gray-100 animate-pulse"></div>;
  if (!brand) return null;

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-12 lg:py-16">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-96 h-96 rounded-full bg-blue-50 opacity-50"></div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6 md:space-y-8">
              {/* Brand name + tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  {brand.name}
                </h1>
                <p className="text-lg md:text-lg text-gray-700 mb-6 max-w-2xl leading-relaxed">
                  {brand.description}
                </p>
              </div>

              {/* Story Paragraph */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600 text-base md:text-sm leading-relaxed">
                  {brand.story ||
                    `Since our founding, ${brand.name} has been committed to delivering exceptional quality and innovative designs. Every product is crafted with precision and care to ensure your complete satisfaction.`}
                </p>
              </div>

              {/* Key points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Premium Materials",
                    desc: "Only the finest quality materials"
                  },
                  {
                    title: "Ethically Sourced",
                    desc: "Responsibly sourced components"
                  },
                  // {
                  //   title: "Satisfaction Guarantee",
                  //   desc: "30-day money back guarantee"
                  // },
                  {
                    title: "Free Shipping",
                    desc: "On all orders over $50"
                  }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-md mr-3 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{point.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  href="/products"
                >
                  Shop Now
                </Link>
                <Link
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                  href="/about"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main image container with subtle shadow and border */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={brand.logo}
                  alt={`${brand.name} products`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-100 rounded-2xl opacity-60 z-0"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-100 rounded-2xl opacity-40 z-0"></div>

              {/* Stats badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-md p-4 z-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                  <div className="text-xs text-gray-500">Customer Rating</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurBrands