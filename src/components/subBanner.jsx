'use client';

import React from 'react'
import { Button, Typography, Row, Col, Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function SubBanner() {
    return (
        <div style={{ background: '#f7f7f7', minHeight: '50vh' }}>
            {/* Custom Banner */}
            <div style={{ background: '#fff', padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
                <Row gutter={[32, 32]} align="middle" style={{ maxWidth: '1200px', width: '100%' }}>
                    {/* Text Section */}
                    <Col xs={24} md={12}>
                        <Tag color="volcano" style={{ fontSize: '14px', marginBottom: '10px' }}>
                            NEW SEASON COLLECTION
                        </Tag>
                        <Title level={1} style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                            Build Power. Train Hard. Dominate.
                        </Title>
                        <Paragraph style={{ fontSize: '16px', color: '#555' }}>
                            Discover elite home gym setups and strength equipment. Perfect for your transformation journey.
                        </Paragraph>
                        <Button type="link" size="large" icon={<RightOutlined />}>
                            Explore Equipment
                        </Button>
                    </Col>

                    {/* Image Section */}
                    <Col xs={24} md={12}>
                        <img
                            src="/strong-man-training-gym.jpg"
                            alt="Fitness Equipment"
                            style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        />
                    </Col>
                </Row>
            </div>

            {/* Categories */}
            {/* <div style={{ background: '#fff', padding: '40px 20px', textAlign: 'center' }}>
                <Title level={3}>Explore Categories</Title>
                <div style={{ marginTop: 20 }}>
                    {['Home Gym', 'Functional Trainer', 'Smith Machine', 'Multi-Gym'].map((category) => (
                        <Button key={category} type="default" size="large" style={{ margin: '10px' }}>
                            {category}
                        </Button>
                    ))}
                </div>
            </div> */}
        </div>
    );
}

export default SubBanner