"use client";

import { useEffect, useState } from "react";
import { 
  Card, 
  Result, 
  Spin, 
  Typography, 
  Space,
  Button,
  Alert,
  Divider 
} from "antd";
import { 
  CheckCircleOutlined, 
  LoadingOutlined, 
  ArrowLeftOutlined,
  MailOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;

export default function Page() {
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      setError("No session ID found in URL");
      setLoading(false);
      return;
    }

    fetch(`/api/session-status?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching session status:", err);
        setError("Failed to retrieve payment status. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 16
      }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
          Verifying your payment...
        </Title>
        <Text type="secondary">Please wait while we confirm your transaction</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
        <Result
          status="error"
          title="Unable to Verify Payment"
          subTitle={error}
          extra={[
            <Button 
              type="primary" 
              key="console" 
              onClick={() => router.push('/')}
            >
              Return to Home
            </Button>,
            <Button 
              key="buy"
              onClick={() => router.push('/checkout')}
            >
              Try Checkout Again
            </Button>,
          ]}
        />
      </div>
    );
  }

  if (status === "open") {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            <Title level={3} style={{ marginTop: 24 }}>
              Redirecting to Checkout
            </Title>
            <Text>
              Please wait while we redirect you back to the checkout process.
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  if (status === "complete") {
    return (
      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          status="success"
          title="Payment Successful!"
          subTitle="Thank you for your purchase. Your transaction has been completed successfully."
          extra={[
            <Button 
              type="primary" 
              key="console" 
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>,
            <Button 
              key="buy"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>,
          ]}
        />
        
        <Card style={{ marginTop: 24 }}>
          <Title level={4}>Order Details</Title>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Text strong>Payment Status:</Text>
              <div>
                <Alert 
                  message="Completed" 
                  type="success" 
                  showIcon 
                  style={{ width: 'fit-content', marginTop: 8 }}
                />
              </div>
            </div>
            
            <div>
              <Text strong>Confirmation Email:</Text>
              <Paragraph style={{ margin: 0, marginTop: 8 }}>
                <MailOutlined style={{ marginRight: 8 }} />
                A confirmation email has been sent to <Text mark>{customerEmail}</Text>
              </Paragraph>
            </div>
            
            <Divider />
            
            <Paragraph type="secondary">
              If you have any questions about your order, please contact our 
              support team at support@yourcompany.com or call us at (800) 123-4567.
            </Paragraph>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <Card>
        <Result
          status="info"
          title="Payment Status Unknown"
          subTitle="We couldn't determine the status of your payment. Please contact support if this issue persists."
          extra={
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/')}
            >
              Return Home
            </Button>
          }
        />
      </Card>
    </div>
  );
}