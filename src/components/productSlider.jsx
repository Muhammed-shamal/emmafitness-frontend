'use client'

import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; // For Swiper v9+
import SeasonalHeader from './seasonalHeader'
import fetchApi from '../utility/api/fetchApi';
import { productUrl } from '../utility/api/constant';
import ProductCardSkeleton from './global/skeletons/productSlider';
import Link from 'next/link';

const { Title, Text } = Typography;

const ProductSlider = () => {
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
        <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
            {/* Mini Banner */}
            <SeasonalHeader />

            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                style={{ marginTop: '2rem' }}
                spaceBetween={24}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {loading ? <ProductCardSkeleton /> : products.map((product, index) => (
                    <SwiperSlide key={product._id || index}>
                        <Link href={`/product/${encodeURIComponent(product.slug)}`}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: '#f9f9f9',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    height: '100%',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    alt={product.name}
                                    src={getImage(product)}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div style={{ padding: '1rem' }}>
                                    <Title level={5} style={{ marginBottom: 4 }}>
                                        {product.customLabel || product.name}
                                    </Title>
                                    {product.salePrice && product.salePrice < product.regularPrice ? (
                                        <div>
                                            <Title level={4} style={{ margin: 0, color: '#d32f2f' }}>
                                                AED {product.salePrice}
                                            </Title>
                                            <Text delete type="secondary" style={{ fontSize: 14 }}>
                                                AED {product.regularPrice}
                                            </Text>
                                        </div>
                                    ) : (
                                        <Title level={4} style={{ margin: 0 }}>
                                            AED {product.regularPrice}
                                        </Title>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;