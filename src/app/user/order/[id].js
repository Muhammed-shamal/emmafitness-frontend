'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Card,
    Row,
    Col,
    Typography,
    Divider,
    List,
    Avatar,
    Tag,
    Button,
    Spin,
    Alert,
    Steps
} from 'antd';
import {
    ShoppingCartOutlined,
    CreditCardOutlined,
    TruckOutlined,
    CheckCircleOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { Step } = Steps;

const OrderDetailsPage = () => {
    const user = useSelector(state => state.user)
    const router = useRouter();
    const { id } = router.query;

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const order = user?.userId && await fetchApi({ URI: `customers/order/getMyOrders/${id}`, API_TOKEN: user?.token })
            setOrder([...order?.data])
        }
        fetchDetails()
    }, [])

    const getCurrentStep = () => {
        if (order?.isDelivered) return 3;
        if (order?.isPaid) return 2;
        if (order?.status === 'Processing') return 1;
        return 0;
    };

    // if (error) return (
    //     <Alert
    //         message="Error"
    //         description={error.message || 'Failed to load order details'}
    //         type="error"
    //         showIcon
    //         style={{ margin: 20 }}
    //     />
    // );

    if (!order) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
            <Spin size="large" />
        </div>
    );

    return (
        <div style={{ padding: 24 }}>
            <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/orders')}
                style={{ marginBottom: 20 }}
            >
                Back to Orders History
            </Button>

            <Card title={`Order #${order._id}`}>
                <Row gutter={24}>
                    <Col xs={24} md={16}>
                        <Steps current={getCurrentStep()} style={{ marginBottom: 30 }}>
                            <Step title="Ordered" icon={<ShoppingCartOutlined />} />
                            <Step title="Paid" icon={<CreditCardOutlined />} />
                            <Step title="Shipped" icon={<TruckOutlined />} />
                            <Step title="Delivered" icon={<CheckCircleOutlined />} />
                        </Steps>

                        <Title level={5}>Order Items</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={order.orderItems}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.product?.image} />}
                                        title={<a>{item.name}</a>}
                                        description={`Quantity: ${item.quantity}`}
                                    />
                                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                                </List.Item>
                            )}
                        />
                    </Col>

                    <Col xs={24} md={8}>
                        <Card title="Order Summary" style={{ marginBottom: 20 }}>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Text>Items:</Text>
                                <Text>${order.itemsPrice.toFixed(2)}</Text>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Text>Shipping:</Text>
                                <Text>${order.shippingPrice.toFixed(2)}</Text>
                            </Row>
                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                <Text>Tax:</Text>
                                <Text>${order.taxPrice.toFixed(2)}</Text>
                            </Row>
                            <Divider />
                            <Row justify="space-between">
                                <Text strong>Total:</Text>
                                <Text strong>${order.totalAmount.toFixed(2)}</Text>
                            </Row>
                        </Card>

                        <Card title="Shipping Details" style={{ marginBottom: 20 }}>
                            <Text strong>Name:</Text> {order.user?.name}<br />
                            <Text strong>Email:</Text> {order.user?.email}<br />
                            <Text strong>Address:</Text> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}<br />
                            <Divider />
                            <Tag
                                color={order.isDelivered ? 'success' : 'processing'}
                                icon={order.isDelivered ? <CheckCircleOutlined /> : <TruckOutlined />}
                            >
                                {order.isDelivered ?
                                    `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` :
                                    'Not yet delivered'}
                            </Tag>
                        </Card>

                        <Card title="Payment Details">
                            <Text strong>Method:</Text> {order.paymentMethod}<br />
                            <Divider />
                            <Tag
                                color={order.isPaid ? 'success' : 'error'}
                                icon={order.isPaid ? <CheckCircleOutlined /> : <CreditCardOutlined />}
                            >
                                {order.isPaid ?
                                    `Paid on ${new Date(order.paidAt).toLocaleDateString()}` :
                                    'Not yet paid'}
                            </Tag>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default OrderDetailsPage;