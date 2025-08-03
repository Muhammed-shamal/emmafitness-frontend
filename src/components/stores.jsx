'use client';

import { Row, Col, Card, Typography } from 'antd';
const { Title } = Typography;

const stores = [
  {
    id: 1,
    image: '/stores/store1.jpg',
    title: 'Muroor Road, Al Falah Street',
    address: 'Muroor Road, Al Falah Street, Abu Dhabi',
    phone: '+971 58 133 9504',
  },
  {
    id: 2,
    image: '/stores/store2.jpg',
    title: 'Manama St, Ras Al Khor',
    address: 'Hamadi Building, Ras Al Khor Industrial Area 1, Dubai',
    phone: '+971 56 737 5433',
  },
  {
    id: 3,
    image: '/stores/store3.jpg',
    title: 'Al Khobar, Dammam',
    address: 'Naif Bin Rubian Tower, King Khaled Street, Al Khobar Al Shamalia',
    phone: '+966 53 218 9990',
  },
  {
    id: 4,
    image: '/stores/store4.jpg',
    title: 'Al Quoz 3, Sheikh Zayed Road',
    address: 'Shop No.1, The Curve Building, Sheikh Zayed Road, Dubai',
    phone: '+971 54 581 6298',
  },
  {
    id: 5,
    image: '/stores/store5.jpg',
    title: 'Deira, Airport Road',
    address: 'Al Fattan Plaza, Airport Rd, Garhoud, Dubai',
    phone: '+971 54 707 4232',
  },
];

export default function StorePage() {
  return (
    <div style={{ padding: '40px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        Find Your Nearest Store
      </Title>

      <Row gutter={[24, 24]} justify="center">
        {stores.map((store) => (
          <Col xs={24} sm={12} md={8} lg={6} key={store.id}>
            <Card
              hoverable
              cover={<img alt={store.title} src={store.image} style={{ height: 200, objectFit: 'cover' }} />}
            >
              <h3>{store.title}</h3>
              <p>{store.address}</p>
              <p>📞 {store.phone}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
