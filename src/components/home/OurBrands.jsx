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
    <div className="w-full relative overflow-hidden">
      {/* Brand Story Section */}
      <div className="mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="space-y-4">
              {/* Brand name + description */}
              <div className="text-black">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  {brand.name}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl text-gray-700">
                  {brand.description}
                </p>
              </div>

              {/* About Link */}
              <Link
                className="text-blue-600 underline text-lg sm:text-xl md:text-2xl font-semibold mb-4 block"
                href={"/about"}
              >
                About Us
              </Link>

              {/* Story Paragraph */}
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
                {brand.story ||
                  `Since our founding, ${brand.name} has been committed to delivering exceptional quality and innovative designs. Every product is crafted with precision and care to ensure your complete satisfaction.`}
              </p>

              {/* Key points */}
              <div className="space-y-3">
                {[
                  "Premium quality materials",
                  "Ethically sourced components",
                  "Customer satisfaction guarantee",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 shrink-0 mt-1"
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
                    <span className="text-sm sm:text-base md:text-lg">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={brand.logo}
              alt="Brand showcase"
              className="w-full h-full object-contain sm:object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurBrands