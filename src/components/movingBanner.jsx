'use client';

import React from 'react';
import { Carousel, Button } from 'antd';
import 'antd/dist/reset.css';

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
  position: 'relative',
};

const bannerData = [
  {
    title: 'Sled Runner Elite Treadmill',
    price: 'AED 17,995',
    oldPrice: 'AED 22,495',
    description: '23.8" Touch Screen Display | 36 Sled Resistance Modes',
    imgSrc: '/6636.jpg', // You should replace with your image URL or local path
  },
  
   {
    title: 'Abcd Treadmill',
    price: 'AED 15,000',
    oldPrice: 'AED 16,495',
    description: '23.8" Touch Screen Display | 36 Sled Resistance Modes',
    imgSrc: '/dumbbells-fitness.jpg', // You should replace with your image URL or local path
  },
];

const MovingBanner = () => (
  <Carousel autoplay speed={800}>
    {bannerData.map((banner, index) => (
      <div key={index}>
        <div style={{ ...contentStyle, backgroundColor: '#f5f5f5', color: '#000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '400px' }}>
            {/* Left content */}
            <div style={{ flex: 1, padding: 20 }}>
              <h2 style={{ color: '#e60023' }}>AXOX FITNESS</h2>
              <h1>{banner.title}</h1>
              <h2 style={{ color: '#e60023' }}>{banner.price} <del style={{ color: '#888', fontWeight: 'normal', marginLeft: 10 }}>{banner.oldPrice}</del></h2>
              <p>{banner.description}</p>
              <Button type="primary" size="large">Shop Now</Button>
            </div>

            {/* Right content */}
            <div style={{ flex: 1 }}>
              <img src={banner.imgSrc} alt={banner.title} style={{ maxWidth: '100%', maxHeight: '350px' }} />
            </div>
          </div>
        </div>
      </div>
    ))}
  </Carousel>
);

export default MovingBanner;