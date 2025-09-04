import React from 'react';
import { Row, Col, Card } from 'antd';
import {
    
    CustomerServiceOutlined,
    
    ToolOutlined,
    CheckCircleOutlined,
    SettingOutlined,
    
} from '@ant-design/icons';
import Title from '../../components/global/Title';

function AboutUs() {

    const reasonsData = [
        {
            icon: <SettingOutlined className="text-4xl text-blue-600" />,
            title: 'Spare Parts & Maintenance',
            description: 'Ongoing support with spare parts and maintenance services',
        },
        {
            icon: <CheckCircleOutlined className="text-4xl text-blue-600" />,
            title: '2-Year Warranty',
            description: 'Comprehensive 2-year warranty on all gym equipment',
        },
        {
            icon: <ToolOutlined className="text-4xl text-blue-600" />,
            title: 'Professional Assembly',
            description: 'Expert installation and setup of your equipment at home',
        },
        {
            icon: <CustomerServiceOutlined className="text-4xl text-blue-600" />,
            title: '24/7 Customer Support',
            description: 'Always available to help with questions or issues anytime',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Title
                title="About Us"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <section className="mb-16">
                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} lg={14}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <img
                                        src="/gallery/www.emmafitness.ae4.jpg"
                                        className="w-full h-80 object-cover rounded-2xl shadow-lg"
                                        alt="Our team"
                                    />
                                </div>
                                <div className="col-span-1 space-y-6">
                                    <img
                                        src="/gallery/www.emmafitness.ae1.jpg"
                                        className="w-full h-44 object-cover rounded-2xl shadow-lg"
                                        alt="Our workspace"
                                    />
                                    <img
                                        src="/gallery/www.emmafitness.ae3.jpg"
                                        className="w-full h-44 object-cover rounded-2xl shadow-lg"
                                        alt="Our products"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={10}>
                            <div className="pl-0 lg:pl-8">
                                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">— About Us</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
                                    🏋️‍♂️ We Power Strength & Performance
                                </h2>
                                <p className="text-lg text-gray-600 mb-4">
                                    We provide cutting-edge gym equipment designed to elevate your fitness journey.
                                    By combining the latest technologies with durable, high-performance materials,
                                    we deliver exceptional shopping experiences and innovative solutions for every fitness level.
                                </p>
                                <p className="text-gray-600">
                                    Our dedication to quality, reliability,
                                    and customer satisfaction has made us a trusted name in the fitness and gym equipment industry for years.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* Mission, Vision & Values */}
                <section className="mb-16">
                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={8}>
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 font-bold text-xl">01</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                                <p className="text-gray-600">
                                    To provide high-quality fashion products that empower self-expression and
                                    confidence through accessible pricing and exceptional service.
                                </p>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 font-bold text-xl">02</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
                                <p className="text-gray-600">
                                    To become the most customer-centric fashion destination, revolutionizing
                                    how people discover and shop for clothing online.
                                </p>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 font-bold text-xl">03</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
                                <p className="text-gray-600">
                                    Quality, innovation, sustainability, and customer satisfaction are at the
                                    heart of everything we do.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* Why Choose Us */}
                <section className="mb-16">
                    <Row gutter={[32, 32]} className="items-end mb-12">
                        <Col xs={24} lg={12}>
                            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">— Why Choose Us</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-0">
                                We Are Known For Quality & Innovation
                            </h2>
                        </Col>
                        <Col xs={24} lg={12}>
                            <p className="text-lg text-gray-600 mb-0">
                                We continuously innovate to provide the best shopping experience with
                                cutting-edge technology and customer-focused solutions.
                            </p>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        {reasonsData.map((reason, index) => (
                            <Col xs={24} sm={12} lg={6} key={index}>
                                <Card
                                    className="h-full text-center border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
                                    bodyStyle={{ padding: '2rem 1.5rem' }}
                                >
                                    <div className="mb-4">
                                        {reason.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {reason.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {reason.description}
                                    </p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>
        </div>
    )
}

export default AboutUs;