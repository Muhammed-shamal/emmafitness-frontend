'use client'

import { Row, Col, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const cards = [
    {
        title: "Commercial Gym Setup",
        description: "Premium Equipment. Hassle-Free Installation.",
        phone: "+971 55 945 7419",
        img: "https://images.unsplash.com/photo-1554284126-8e0ef4325e7a?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Repair & Maintenance",
        description: "Fast, Reliable Support—We’ve Got You Covered.",
        phone: "+971 55 945 7419",
        img: "https://images.unsplash.com/photo-1590080877777-0c736dbddbdc?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Bike Service",
        description: "Home Pickup. Quick Repairs. Fast Delivery",
        phone: "+971 55 945 7419",
        img: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Pilates Studio Setup",
        description: "Planning a Studio? Talk to Our Experts.",
        phone: "+971 55 945 7419",
        img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80",
    },
];

export default function HelpStayStrong() {
    return (
        <div style={{ padding: "40px 20px", margin: "0 auto" }}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 40 }}>
                HOW WE HELP YOU STAY STRONG
            </Title>

            <Row gutter={[24, 24]}>
                {cards.map(({ title, description, phone, img }, idx) => (
                    <Col key={idx} xs={24} sm={12} md={12} lg={6}>
                        <Card
                            hoverable
                            cover={<img alt={title} src={img} style={{ height: 200, objectFit: "cover" }} />}
                        >
                            <Title level={5}>{title}</Title>
                            <Text>{description}</Text>
                            <br />
                            <Text strong>Call <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
