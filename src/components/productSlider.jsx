'use client'

import React, { useEffect, useState } from 'react';
// import { Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // For Swiper v9+
// import SeasonalHeader from './seasonalHeader'
import fetchApi from '../utility/api/fetchApi';
import { productUrl } from '../utility/api/constant';
import ProductCardSkeleton from './global/skeletons/productSlider';
import { getSeason, } from '../utility/Season/getSeason'
import Link from 'next/link';
import Title from './global/Title';
import { RightOutlined } from '@ant-design/icons';
import { Card, Skeleton } from 'antd';

const ProductSlider = () => {
    const season = getSeason();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await fetchApi({ URI: 'public/products/top10' });
                setProducts(response);
            } catch (error) {
                console.error(error);
            } finally { setLoading(false) }
        };

        fetchTopProducts();
    }, []);


    const getImage = (product) => {
        return product.images && product.images.length > 0
            ? `${productUrl}/${product.images[0]}` // adjust this path as per your backend
            : '/product-placehold.png'; // fallback image
    };

    return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <Title
          titlePart1={"Trending this"}
          titlePart2={season}
          bgType="light"
          className="mb-6 sm:mb-8"
        />

        {/* Mobile view all link - shown only on mobile */}
        <div className="sm:hidden flex justify-end mb-4">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center">
            View all <RightOutlined className="ml-1 text-xs" />
          </a>
        </div>

        {/* Products Carousel */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          loop={true}
          className="mt-4 sm:mt-6"
          spaceBetween={16}
          breakpoints={{
            0: { 
              slidesPerView: 1.2,
              spaceBetween: 12
            },
            480: { 
              slidesPerView: 1.8,
              spaceBetween: 14
            },
            640: { 
              slidesPerView: 2.5,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 18
            },
            1024: { 
              slidesPerView: 3.5,
              spaceBetween: 20
            },
            1280: { 
              slidesPerView: 4,
              spaceBetween: 24
            },
          }}
        >
          {loading ? (
            // Show skeleton loaders while loading
            [...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <Card 
                  className="w-full h-full" 
                  cover={
                    <Skeleton.Image 
                      active 
                      className="!w-full !h-44 sm:!h-52 md:!h-60" 
                    />
                  }
                >
                  <Skeleton active paragraph={{ rows: 2 }} />
                </Card>
              </SwiperSlide>
            ))
          ) : (
            // Show actual products when loaded
            products.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <Link href={`/product/${encodeURIComponent(product.slug)}`} passHref>
                  <div className="flex flex-col bg-gray-50 rounded-xl overflow-hidden h-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100">
                    {/* Product Image */}
                    <div className="w-full h-44 sm:h-52 md:h-60 lg:h-64 overflow-hidden">
                      <img
                        alt={product.name}
                        src={getImage(product)}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <h5 className="text-sm sm:text-base font-semibold mb-1 line-clamp-1 text-gray-800">
                        {product.customLabel || product.name}
                      </h5>

                      {product.salePrice && product.salePrice < product.regularPrice ? (
                        <div>
                          <p className="text-base sm:text-lg font-bold text-red-600">
                            AED {product.salePrice}
                          </p>
                          <p className="text-xs sm:text-sm line-through text-gray-500">
                            AED {product.regularPrice}
                          </p>
                        </div>
                      ) : (
                        <p className="text-base sm:text-lg font-bold text-gray-900">
                          AED {product.regularPrice}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductSlider;