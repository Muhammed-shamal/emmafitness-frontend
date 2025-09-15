'use client';

import { useState } from 'react';
import Head from 'next/head';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
  Typography,
  Divider,
  Space,
  Select
} from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  
} from '@ant-design/icons';
import emailjs from '@emailjs/browser';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function ContactPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      // Optional custom validation for phone number
      const phoneRegex = /^[\d\s()+-]{7,}$/;
      if (!phoneRegex.test(values.phone)) {
        
        message.error('Please enter a valid phone number (at least 7 digits).');
        return;
      }

      // Optional validation for message length
      if (values.message.length > 2000) {
        
        message.error('Message is too long (maximum 2000 characters).');
        return;
      }

      // Initialize emailjs
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          to_name: "Emma Fitness UAE",
          from_email: values.email,
          to_email: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
          phone: values.phone || "N/A",
          subject: values.subject,
          department: values.department,
          message: values.message,
        }
      );

      message.success('Your message has been sent successfully!');
      form.resetFields();
      
    } catch (error) {
      console.error('Failed to send email:', error);
      
      message.error('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Head>
        <title>Contact Us | Your E-Commerce Store</title>
        <meta name="description" content="Get in touch with us for any questions or support" />
      </Head>

      <div style={{ padding: '40px 0', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: '10px' }}>
            Contact Us
          </Title>
          <Paragraph style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
            Have questions about our products or need support? We're here to help and would love to hear from you.
          </Paragraph>

          <Row gutter={[32, 32]}>
            {/* Contact Form */}
            <Col xs={24} md={14}>
              <Card title="Send us a message" bordered={false}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input placeholder="Your name" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input placeholder="your.email@example.com" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      { required: true, message: 'Please enter your phone number' },
                      {
                        pattern: /^[\d\s()+-]{7,}$/,
                        message: 'Please enter a valid phone number (at least 7 digits)',
                      },
                    ]}
                  >
                    <Input placeholder="e.g. +971 50 123 4567" size="large" />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input placeholder="What is this regarding?" size="large" />
                  </Form.Item>

                  <Form.Item
                    name="department"
                    label="Department"
                    rules={[{ required: true, message: 'Please select a department' }]}
                  >
                    <Select placeholder="Select department" size="large">
                      <Option value="sales">Sales Inquiry</Option>
                      <Option value="support">Customer Support</Option>
                      <Option value="billing">Billing Question</Option>
                      <Option value="returns">Returns & Refunds</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="Please describe your inquiry in detail..."
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button

                      htmlType="submit"
                      size="large"
                      icon={<SendOutlined />}
                      loading={loading}
                      block
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            {/* Contact Information */}
            <Col xs={24} md={10}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="Contact Information" bordered={false}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <PhoneOutlined style={{ fontSize: 20, color: '#1890ff', marginRight: 12 }} />
                        <div>
                          <Text strong>Phone Support</Text>
                          <br />
                          <Text>+971 563296585</Text>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                        <MailOutlined style={{ fontSize: 20, color: '#1890ff', marginRight: 12 }} />
                        <div>
                          <Text strong>Email</Text>
                          <br />
                          <Text>emmafitdxb@gmail.com</Text>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 16 }}>
                        <EnvironmentOutlined style={{ fontSize: 20, color: '#1890ff', marginRight: 12, marginTop: 4 }} />
                        <div>
                          <Text strong>Address</Text>
                          <br />
                          <Text>Maleha St - Warehouses Land<br />Industrial Area<br />Sharjah - United Arab Emirates</Text>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ClockCircleOutlined style={{ fontSize: 20, color: '#1890ff', marginRight: 12 }} />
                        <div>
                          <Text strong>Business Hours</Text>
                          <br />
                          <Text>Mon-Fri: 9AM - 6PM EST<br />Sat: 10AM - 4PM EST<br />Sun: Closed</Text>
                        </div>
                      </div>
                    </div>

                    <Divider />

                    {/* <div>
                      <Title level={5}>Follow Us</Title>
                      <Space size="middle">
                        <Button 
                          type="text" 
                          icon={<FacebookOutlined style={{ color: '#4267B2' }} />} 
                          size="large"
                        />
                        <Button 
                          type="text" 
                          icon={<InstagramOutlined style={{ color: '#E1306C' }} />} 
                          size="large"
                        />
                        <Button 
                          type="text" 
                          icon={<TwitterOutlined style={{ color: '#1DA1F2' }} />} 
                          size="large"
                        />
                        <Button 
                          type="text" 
                          icon={<WhatsAppOutlined style={{ color: '#25D366' }} />} 
                          size="large"
                        />
                      </Space>
                    </div> */}
                  </Space>
                </Card>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}