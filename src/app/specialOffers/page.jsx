'use client';

import { useOffers } from '@/utility/context/OfferContext';
import { Row, Col, Card, Image, Typography, Tag, Button, Space } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

const OffersPage = () => {
  const { offers, loading } = useOffers();

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Special Offers</Title>
      
      <Row gutter={[16, 16]}>
        {offers.map((offer) => (
          <Col xs={24} sm={12} md={8} key={offer._id}>
            <Card
              cover={
                <Image
                  src={`/uploads/offers/${offer.image}`}
                  alt={offer.title}
                  preview={false}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              }
              actions={[
                <Link href={`/products?offer=${offer._id}`} passHref key="shop">
                  <Button type="primary">Shop Now</Button>
                </Link>
              ]}
            >
              <Card.Meta
                title={<Title level={4}>{offer.title}</Title>}
                description={
                  <Space direction="vertical">
                    <Text>{offer.description}</Text>
                    <Text strong>
                      Valid: {new Date(offer.startDate).toLocaleDateString()} -{' '}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </Text>
                    <Tag color="blue">{offer.offerType} offer</Tag>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OffersPage;