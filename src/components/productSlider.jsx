'use client'

import React from 'react';
import { Card, Typography } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SeasonalHeader from './seasonalHeader'

const { Title } = Typography;

const products = [
    {
        name: 'GX LE Upright Bike',
        brand: 'NordicTrack',
        image: '/images/upright-bike.jpg',
        price: 3495,
    },
    {
        name: 'Home XBR25 Recumbent Bike',
        brand: 'SPIRIT',
        image: '/images/recumbent-bike.jpg',
        price: 5485,
    },
    {
        name: '800IC Indoor Cycling Bike',
        brand: 'SCHWINN',
        image: '/images/indoor-cycling.jpg',
        price: 4985,
    },
    {
        name: 'T Series 7 Treadmill',
        brand: 'NordicTrack',
        image: '/images/treadmill.jpg',
        price: 4995,
    },
    {
        name: 'Cherry Rowing Machine With S4 Monitor',
        brand: 'WaterRower',
        image: '/images/rowing-machine.jpg',
        price: 5750,
    },
];

const ProductSlider = () => {
    return (
        <div style={{ padding: '2rem' }}>
            {/* Mini Banner */}
            <SeasonalHeader />

            <Swiper spaceBetween={20} slidesPerView={3} breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            }}>
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.image} style={{ height: 200, objectFit: 'cover' }} />}
                        >
                            <Title level={5}>{product.brand}</Title>
                            <p>{product.name}</p>
                            <Title level={4}>AED {product.price}</Title>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;