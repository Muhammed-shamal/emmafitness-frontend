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
        <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
            {/* Section Title */}
            <Title
                titlePart1={"Trending this"}
                titlePart2={season}
                bgType="light"
                className="mb-6 sm:mb-8"
            />

            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="mt-4 sm:mt-6"
                spaceBetween={16}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 1.2 }, // gives a peek of next card
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {loading ? (
                    <ProductCardSkeleton />
                ) : (
                    products.map((product, index) => (
                        <SwiperSlide key={product._id || index}>
                            <Link href={`/product/${encodeURIComponent(product.slug)}`}>
                                <div className="flex flex-col bg-gray-50 rounded-xl overflow-hidden h-full shadow-sm hover:shadow-lg transition-all duration-300">
                                    {/* Product Image */}
                                    <div className="w-full h-44 sm:h-52 md:h-64 overflow-hidden">
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
    );
};

export default ProductSlider;