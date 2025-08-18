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
      {/* Hero Section with Brand Image */}
      {/* {brand.coverImage ? <div className="relative h-64 md:h-96 w-full">
        <Image
          src={brand.coverImage}
          alt={`${brand.name} brand showcase`}
          layout="fill"
          objectFit="cover"
          className="opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center p-6 max-w-4xl mx-auto">
            <div className="mb-6">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={300}
                height={150}
                className="mx-auto object-contain h-20 md:h-28"
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{brand.name}</h1>
            <p className="text-lg text-white/90 mb-8">{brand.description}</p>
            <Link href={brand.slug}>
              <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Shop {brand.name}
              </button>
            </Link>
          </div>
        </div>
      </div> : < div className=" py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-xl">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={200}
              height={100}
              className="object-contain h-24"
            />
          </div>
          <div className="text-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{brand.name}</h1>
            <p className="text-lg mb-6 max-w-2xl">{brand.description}</p>
            <Link href={brand.slug}>
              <button className="px-6 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 transition duration-200">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
      </div>} */}

      {/* Brand Story Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              {brand.story || `Since our founding, ${brand.name} has been committed to delivering exceptional quality and innovative designs. Every product is crafted with precision and care to ensure your complete satisfaction.`}
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Premium quality materials</span>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ethically sourced components</span>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customer satisfaction guarantee</span>
              </div>

              <div className="text-black">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{brand.name}</h1>
                <p className="text-lg mb-6 max-w-2xl">{brand.description}</p>
                <Link href={brand.slug}>
                  <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 transition duration-200">
                    Explore Collection
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video">
            <img
              src={brand.logo}
              alt="Brand showcase"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div >
  );
}

export default OurBrands