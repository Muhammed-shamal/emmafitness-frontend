'use client'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import fetchApi from "../../../utility/api/fetchApi"
import { stripePromise } from '../../checkout/CheckoutForm'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import {
    Card,
    Row,
    Col,
    Tag,
    Button,
    Divider,
    Typography,
    Descriptions,
    Collapse,
    Space,
    Modal,
    Spin,
    Alert
} from 'antd';
import {
    DollarOutlined,
    ShoppingOutlined,
    UserOutlined,
    EnvironmentOutlined,
    CreditCardOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import Image from "next/image"
import moment from "moment"
import { baseUrl, productUrl } from "../../../utility/api/constant"
import PostAPI from "../../../utility/api/postApi";

const { Title, Text } = Typography;
const { Panel } = Collapse;

function OrderHistory() {

    const user = useSelector(state => state.user)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const bring = async () => {
            if (!user?.userId) return;

            const order = await fetchApi({
                URI: `customers/order/getMyOrders/${user?.userId}`,
                API_TOKEN: user?.token,
            });

            console.log('order data is', order, Array.isArray(order));

            if (Array.isArray(order)) {
                setOrders(order);
            } else if (order?.data && Array.isArray(order.data)) {
                setOrders(order.data);
            } else {
                console.warn('Order is not an array. Response:', order);
            }
        };

        bring();
    }, [user]);

    const handleRetryPayment = async (order) => {
        setSelectedOrder(order);
        setLoadingPayment(true);
        setPaymentModalVisible(true);

        try {
            const data = await PostAPI({
                URI: "customers/payment/create",
                API_TOKEN: user?.token,
                Data: { amount: order.totalAmount, orderId: order._id, },
                isTop: true
            });

            setClientSecret(data.client_secret);
        } catch (err) {
            console.error("Failed to create payment intent:", err);
            setPaymentStatus({
                type: 'error',
                message: 'Failed to initialize payment. Please try again.'
            });
        } finally {
            setLoadingPayment(false);
        }
    };

    const closePaymentModal = () => {
        setPaymentModalVisible(false);
        setClientSecret(null);
        setSelectedOrder(null);
        setPaymentStatus(null);
    };

    const handleDownloadInvoice = async (orderId) => {
        console.log('order id', orderId);
        try {
            const response = await fetch(`${baseUrl}/api/customers/order/invoice/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Accept': 'application/pdf'
                }
            });

            if (!response.ok) {
                const errorText = await response.text(); // for error body
                throw new Error(`Failed to fetch invoice: ${errorText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Invoice download failed:', error);
            alert(error.message || 'Unable to download invoice.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'green';
            case 'Shipped': return 'blue';
            case 'Processing': return 'orange';
            case 'Pending': return 'gold';
            case 'Cancelled': return 'red';
            default: return 'default';
        }
    };

    const paymentStatusTag = (isPaid) => (
        <Tag color={isPaid ? 'green' : 'red'} icon={isPaid ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}>
            {isPaid ? 'PAID' : 'UNPAID'}
        </Tag>
    );

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Order History</Title>

            {orders?.map(order => (
                <Card
                    key={order._id}
                    style={{ marginBottom: '24px', borderRadius: '8px' }}
                    bodyStyle={{ padding: 0 }}
                >
                    {/* Order Header */}
                    <div style={{ padding: '16px 24px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Space size="large">
                                    <Text strong>Order #: {String(order._id).substring(0, 8).toUpperCase()}</Text>
                                    <Text>{moment(order.createdAt).format("DD MMM YYYY, hh:mm A")}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space>
                                    {paymentStatusTag(order.isPaid)}
                                    <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
                                </Space>

                                {order.status === 'Delivered' && <Space>
                                    <Tag style={{ cursor: "pointer" }} color={"processing"} onClick={() => handleDownloadInvoice(order._id)}>Download Invoice</Tag>
                                </Space>}
                            </Col>
                        </Row>
                    </div>

                    {/* Order Content */}
                    <div style={{ padding: '24px' }}>
                        <Row gutter={24}>
                            {/* Products List */}
                            <Col xs={24} lg={14}>
                                <Title level={5} style={{ marginBottom: '16px' }}>
                                    <ShoppingOutlined /> Order Items ({order.orderItems.length})
                                </Title>

                                {order.orderItems.map((item, index) => (
                                    <div key={item._id || index} style={{ marginBottom: '16px' }}>
                                        <Row gutter={12} align="middle">
                                            <Col flex="60px">
                                                <Image
                                                    src={`${productUrl}/${item.product.images[0]}`}
                                                    width={60}
                                                    height={60}
                                                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                                                    alt={item.product.name}
                                                    fallback="https://via.placeholder.com/60?text=No+Image"
                                                />
                                            </Col>
                                            <Col flex="auto">
                                                <Text strong>{item.product.name}</Text>
                                                <div>
                                                    <Text type="secondary">Qty: {item.quantity}</Text>
                                                    {item.product.specs && (
                                                        <div style={{ marginTop: '4px' }}>
                                                            {item.product.specs.color && (
                                                                <Tag size="small">Color: {item.product.specs.color}</Tag>
                                                            )}
                                                            {item.product.specs.size && (
                                                                <Tag size="small">Size: {item.product.specs.size}</Tag>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col>
                                                <Text strong>AED {(item.price * item.quantity).toFixed(2)}</Text>
                                                <div><Text type="secondary">AED {item.price} each</Text></div>
                                            </Col>
                                        </Row>
                                        {index < order.orderItems.length - 1 && <Divider style={{ margin: '12px 0' }} />}
                                    </div>
                                ))}
                            </Col>

                            {/* Order Details */}
                            <Col xs={24} lg={10}>
                                <Collapse defaultActiveKey={['summary']} ghost>
                                    {/* Summary Panel */}
                                    <Panel header="Order Summary" key="summary">
                                        <Descriptions column={1} size="small">
                                            <Descriptions.Item label="Items Total">
                                                AED {order.itemsPrice.toFixed(2)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Shipping">
                                                AED {order.shippingPrice.toFixed(2)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Tax">
                                                AED {order.taxPrice.toFixed(2)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Total Amount">
                                                <Text strong>AED {order.totalAmount.toFixed(2)}</Text>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Panel>

                                    {/* Customer Panel */}
                                    <Panel header="Customer Information" key="customer">
                                        <Space direction="vertical">
                                            <div>
                                                <UserOutlined /> {order.user.name}
                                            </div>
                                            <div>
                                                {order.user.email}
                                            </div>
                                        </Space>
                                    </Panel>

                                    {/* Shipping Panel */}
                                    <Panel header="Shipping Address" key="shipping">
                                        <Space direction="vertical">
                                            <div>
                                                <EnvironmentOutlined /> {order.shippingAddress.street}
                                            </div>
                                            <div>
                                                {order.shippingAddress.buildingOrOffice}
                                                {order.shippingAddress.flatNumber && `, Flat ${order.shippingAddress.flatNumber}`}
                                            </div>
                                            <div>
                                                Contact: {order.shippingAddress.contactNo}
                                            </div>
                                        </Space>
                                    </Panel>

                                    {/* Payment Panel */}
                                    <Panel header="Payment Information" key="payment">
                                        <Space direction="vertical">
                                            <div>
                                                <CreditCardOutlined /> {order.paymentMethod}
                                            </div>
                                            <div>
                                                Status: {paymentStatusTag(order.isPaid)}
                                            </div>
                                            {!order.isPaid && (
                                                <Button
                                                    style={{ marginTop: 2 }}
                                                    size="small"
                                                    icon={<DollarOutlined />}
                                                    onClick={() => handleRetryPayment(order)}
                                                    loading={loadingPayment && selectedOrder?._id === order._id}
                                                >
                                                    Pay Now
                                                </Button>
                                            )}
                                        </Space>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </div>
                </Card>
            ))}

            {/* Payment Modal with Stripe Embedded Checkout */}
            <Modal
                title={`Complete Payment - Order #${selectedOrder ? String(selectedOrder._id).substring(0, 8).toUpperCase() : ''}`}
                open={paymentModalVisible}
                onCancel={closePaymentModal}
                footer={null}
                width={700}
                bodyStyle={{ padding: 0, minHeight: '500px' }}
            >
                {paymentStatus ? (
                    <div style={{ padding: '24px' }}>
                        <Alert
                            message={paymentStatus.type === 'success' ? 'Payment Successful' : 'Payment Failed'}
                            description={paymentStatus.message}
                            type={paymentStatus.type}
                            showIcon
                        />
                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            <Button type="primary" onClick={closePaymentModal}>
                                Close
                            </Button>
                        </div>
                    </div>
                ) : loadingPayment ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <Spin size="large" tip="Initializing payment..." />
                    </div>
                ) : clientSecret ? (
                    <div style={{ height: '500px' }}>
                        <EmbeddedCheckoutProvider
                            stripe={stripePromise}
                            options={{ clientSecret }}
                        >
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    </div>
                ) : (
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                        <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                        <p style={{ marginTop: '16px' }}>Unable to initialize payment. Please try again.</p>
                        <Button onClick={closePaymentModal} style={{ marginTop: '16px' }}>
                            Close
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default OrderHistory