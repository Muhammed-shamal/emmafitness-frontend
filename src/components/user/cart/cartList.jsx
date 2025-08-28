'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    Button,
    InputNumber,
    Space,
    Typography,
    Card,
    Divider,
    Spin,
    Alert,
    Badge,
    Popconfirm,
    message
} from 'antd';
import {
    ShoppingCartOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    CheckOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import fetchApi from '@/utility/api/fetchApi';
import { setLoading, removeFromCart, setCart, setError, updateCartItemQuantity } from '@/utility/redux/cartSlice';
import updateApi from '@/utility/api/updateAPI';
const { Title, Text } = Typography;

const CartPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { items, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.userId) {
            fetchCart();
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            dispatch(setLoading(true));
            const response = await fetchApi({ URI: `customers/cart/${user?.userId}` })
            console.log('cart response', response);
            dispatch(setCart(response.data?.items || []));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch cart'));
            dispatch(showToast({ type: 'error', message: err.response?.data?.message || 'Failed to fetch data' }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleQuantityChange = async (productId, quantity) => {
        try {
            if (quantity < 1) {
                message.warning('Quantity must be at least 1');
                return;
            }

            dispatch(updateCartItemQuantity({ productId, quantity }));

            if (user?._id) {
                await updateApi({
                    URI: "customers/cart/update", token: user.token, Data: {
                        userId: user?.userId,
                        productId,
                        quantity
                    }
                });
            }
        } catch (err) {
            message.error('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            dispatch(removeFromCart(productId));

            if (user?._id) {
                await updateApi({
                    URI: "customers/cart/remove", token: user.token, Data: {
                        userId: user?.userId,
                        productId
                    }
                });
            }
            message.success('Item removed from cart');
        } catch (err) {
            message.error('Failed to remove item');
        }
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            message.warning('Your cart is empty');
            return;
        }
        router.push('/checkout');
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0).toFixed(2);
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (product) => (
                <Space>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 60, height: 60, objectFit: 'cover' }}
                    />
                    <Text strong>{product.name}</Text>
                </Space>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'product',
            key: 'price',
            render: (product) => `$${product.price.toFixed(2)}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    min={1}
                    max={100}
                    defaultValue={quantity}
                    value={quantity}
                    onChange={(value) => handleQuantityChange(record.product._id, value)}
                />
            ),
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            render: (_, record) => (
                <Text strong>
                    ${(record.product.price * record.quantity).toFixed(2)}
                </Text>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to remove this item?"
                    onConfirm={() => handleRemoveItem(record.product._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            ),
        },
    ];

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ margin: 20 }}
            />
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.back()}
                style={{ marginBottom: 20 }}
            >
                Continue Shopping
            </Button>

            <Title level={3}>
                <ShoppingCartOutlined /> Your Cart
                <Badge
                    count={items.length}
                    showZero
                    style={{ marginLeft: 10 }}
                />
            </Title>

            <Table
                columns={columns}
                dataSource={items}
                rowKey={(record) => record.product._id}
                pagination={false}
                scroll={{ x: true }}
                style={{ marginBottom: 24 }}
                locale={{ emptyText: 'Your cart is empty' }}
            />

            <Card style={{ marginTop: 20 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={4}>Order Summary</Title>
                    <Divider />

                    <Space direction="vertical" style={{ width: '100%' }}>
                        {items.map((item) => (
                            <div key={item.product._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>
                                    {item.product.name} x {item.quantity}
                                </Text>
                                <Text>
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </Text>
                            </div>
                        ))}
                    </Space>

                    <Divider />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong>Total:</Text>
                        <Title level={4}>${calculateTotal()}</Title>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        block
                        icon={<CheckOutlined />}
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                    >
                        Proceed to Checkout
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default CartPage;