'use client';

import { Row, Col, Card, Typography, Empty } from 'antd';
import { useEffect, useState } from 'react';
import fetchApi from '../utility/api/fetchApi';
import StoreCardSkeleton from './global/skeletons/store'
const { Title } = Typography;

export default function StorePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi({ URI: "public/stores" });
        console.log("store response", response)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])
  return (
    <div style={{ padding: '40px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        Find Your Nearest Store
      </Title>

      <Row gutter={[24, 24]} justify="center">
        {loading ? (
          // Show multiple skeletons while loading
          Array.from({ length: 4 }).map((_, index) => <StoreCardSkeleton key={index} />)
        ) : data && data.length > 0 ? (
          // Show actual store cards
          data.map((store) => (
            <Col xs={24} sm={12} md={8} lg={6} key={store.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={store.title}
                    src={store.image}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
              >
                <h3>{store.title}</h3>
                <p>{store.address}</p>
                <p>📞 {store.phone}</p>
              </Card>
            </Col>
          ))
        ) : (
          // Show empty state
          <Col span={24} style={{ textAlign: 'center', marginTop: 40 }}>
            <Empty description="No stores found" />
          </Col>
        )}
      </Row>
    </div>
  );
}
