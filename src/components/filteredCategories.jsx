'use client';

import { Alert, Card, Col, Row, Spin, Tabs, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import fetchApi from '../utility/api/fetchApi';

function FilteredCategories() {
    const [selectedCategory, setSelectedCategory] = useState('home');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products from server when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetchApi({ URI: `public/products/${selectedCategory}` });
                console.log('response by categor',response)
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleTabChange = (key) => {
        setSelectedCategory(key);
    };

    const filteredProducts = products.filter(
        (product) => product.category === selectedCategory
    );

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 24,
                maxWidth: 1200,
                margin: '0 auto',
            }}
        >
            <Tabs
                defaultActiveKey="home"
                onChange={handleTabChange}
                centered
                style={{ marginBottom: 24, width: '100%' }}
            >
                <TabPane tab="Home Gym" key="home" />
                <TabPane tab="Functional Trainer" key="functional" />
                <TabPane tab="Smith Machine" key="smith" />
                <TabPane tab="Multi-Gym" key="multi" />
            </Tabs>

            <Row gutter={[24, 24]} justify="center" style={{ width: '100%' }}>
                {filteredProducts.length === 0 ? (
                    <p>No products found in this category.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Card
                                hoverable
                                cover={<img src={product.image} alt={product.name} />}
                                style={{ textAlign: 'center' }}
                            >
                                {product.tag && <Tag color="orange">{product.tag}</Tag>}
                                <h3>{product.name}</h3>
                                <p>
                                    <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                                        AED {product.oldPrice}
                                    </span>{' '}
                                    <strong>AED {product.price}</strong>
                                </p>
                                <Tag color="red">SAVE {product.discount}%</Tag>{' '}
                                <Tag color="gold">{product.delivery}</Tag>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
}


export default FilteredCategories