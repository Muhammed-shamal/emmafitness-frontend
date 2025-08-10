'use client';

import { bannerUrl } from '../utility/api/constant';
import { useOffers } from '../utility/context/OfferContext';
import { Carousel, Card, Image, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const OffersBanner = () => {
  const { offers, loading } = useOffers();  

  if (loading || offers.length === 0) return null;

  return (
    <div style={{ margin: '30px 0' }}>
      <Carousel autoplay effect="fade" dotPosition="top">
        {offers.map((offer) => (
          <div key={offer._id}>
            <Card
              cover={
                <Image
                  src={`${bannerUrl}/${offer.image}`}
                  alt={offer.title}
                  preview={false}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta
                title={<Title level={4}>{offer.title}</Title>}
                description={<Text>{offer.description}</Text>}
              />
              <Button 
                style={{ marginTop: 16 }}
                onClick={() => {
                  // Navigate to products page with offer filter
                  window.location.href = `/offeredProducts?offer=${offer._id}`;
                }}
              >
                Shop Now
              </Button>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default OffersBanner;