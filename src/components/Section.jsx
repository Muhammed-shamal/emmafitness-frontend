import React from 'react';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

const Section = () => {
  return (
    <section className="py-12 px-4">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Promotion Card */}
          <div className="md:w-2/3 relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-80 md:h-96 w-full relative overflow-hidden">
              <img 
                src="/gallery/banner1.jpg" 
                alt="Women's Collection" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black">
              <p className="text-sm font-medium mb-2">New Gym Collection</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-red-600 block">50% OFF</span> Popular Items!
              </h3>
              <Link 
                href="/shop-grid-left-sidebar" 
                className="inline-flex items-center bg-white text-gray-900 font-medium px-5 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 group-hover:scale-105"
              >
                Shop Now
                <ArrowRightOutlined className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Side Promotions */}
          <div className="md:w-1/3 flex flex-col gap-6">
            {/* First Small Promotion */}
            <div className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
              <div className="h-56 w-full relative overflow-hidden">
                <img 
                  src="/gallery/banner2.jpg" 
                  alt="Men's Collection" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white">
                <h4 className="text-xl font-bold">
                  New Men's<br />Collection
                </h4>
              </div>
            </div>

            {/* Second Small Promotion */}
            <div className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex-1">
              <div className="h-56 w-full relative overflow-hidden">
                <img 
                  src="/gallery/banner3.jpg" 
                  alt="Leather Bags" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              
              <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white">
                <h4 className="text-xl font-bold">
                  Leather Bags<br />And Purses
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;