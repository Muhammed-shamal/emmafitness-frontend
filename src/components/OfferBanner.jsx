
'use client';

import React from 'react';
import {  Carousel, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useOffers } from '../utility/context/OfferContext';
import { bannerUrl } from '../utility/api/constant';

const OffersBanner = () => {
  const { offers, loading } = useOffers();  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 rounded-xl animate-pulse">
        <div className="text-gray-400">Loading offers...</div>
      </div>
    );
  }

  if (offers.length === 0) return null;

  return (
    <div className="my-8 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Special Offers
        </h2>
        
        <Carousel 
          autoplay 
          effect="fade"
          dotPosition="top"
          className="rounded-2xl overflow-hidden shadow-lg"
          autoplaySpeed={5000}
        >
          {offers.map((offer) => (
            <div key={offer._id} className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden">
                {/* Image Section */}
                <div className="relative h-64 md:h-80">
                  <Image
                    src={`${bannerUrl}/${offer.image}`}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={offer === offers[0]}
                  />
                  {offer.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      {offer.discount}% OFF
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <div className="mb-4">
                    {offer.category && (
                      <span className="text-indigo-600 text-sm font-semibold uppercase tracking-wide">
                        {offer.category}
                      </span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                  
                  {offer.expiryDate && (
                    <div className="mb-5">
                      <div className="text-xs text-gray-500 uppercase mb-1">
                        Limited Time Offer
                      </div>
                      <div className="flex items-center text-sm text-red-600 font-medium">
                        <svg 
                          className="w-4 h-4 mr-1" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        Expires: {new Date(offer.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="primary"
                    size="large"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
                    onClick={() => {
                      window.location.href = `/offeredProducts?offer=${offer._id}`;
                    }}
                    icon={<RightOutlined />}
                    iconPosition="end"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        
        {/* Indicator Dots Customization */}
        <style jsx global>{`
          .ant-carousel .slick-dots-top {
            top: -30px;
          }
          .ant-carousel .slick-dots li button {
            background: #cbd5e1;
            opacity: 0.5;
          }
          .ant-carousel .slick-dots li.slick-active button {
            background: #4f46e5;
            opacity: 1;
          }
        `}</style>
      </div>
    </div>
  );
};

export default OffersBanner;