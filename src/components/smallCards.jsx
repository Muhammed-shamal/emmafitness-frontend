'use client'

import { Card, Typography, Button } from 'antd';
const { Title, Text } = Typography;

export default function SmallCards({ product }) {
  return (
    <Card
      hoverable
      style={{ width: '100%', border: '1px solid #eee', borderRadius: 8 }}
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ padding: 20, objectFit: 'contain', height: 200 }}
        />
      }
    >
      <Title level={5} style={{ minHeight: 50 }}>{product.name}</Title>

      {product.regularPrice && (
        <Text delete style={{ color: 'red', display: 'block' }}>
          AED {product.regularPrice}
        </Text>
      )}

      <Title level={3}>AED {product.salePrice}</Title>

      <Button type="link" href={`/product/${encodeURIComponent(product.slug)}`} style={{ paddingLeft: 0 }}>
        Shop now →
      </Button>
    </Card>
  );
}
