import React from 'react';
import { Carousel, Card } from 'antd';

const products = [
  {
    title: "Treadmill",
    price: 3000,
    currency: "AED",
    imgSrc: "/treadmill.png",
  },
  {
    title: "Exercise Bike",
    price: 2000,
    currency: "AED",
    imgSrc: "/images/exercise-bike.png",
  },
  {
    title: "Rower",
    price: 3000,
    currency: "AED",
    imgSrc: "/images/rower.png",
  },
];

const PriceCarousel = () => {
  return (
    <Carousel dots={true} autoplay>
      {products.map((product, index) => (
        <div key={index} style={{ padding: 20, background: '#fef0e3', display: 'flex', justifyContent: 'center' }}>
          <Card
            hoverable
            style={{ width: 300, textAlign: 'center' }}
            cover={<img alt={product.title} src={product.imgSrc} style={{ maxHeight: 150, objectFit: 'contain' }} />}
          >
            <h2>{product.price.toLocaleString()} {product.currency}</h2>
            <p>{product.title}</p>
          </Card>
        </div>
      ))}
    </Carousel>
  );
};

export default PriceCarousel;