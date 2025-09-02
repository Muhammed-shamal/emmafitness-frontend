'use client'

import { motion } from 'framer-motion';
import { RightOutlined } from '@ant-design/icons';
import { Tag, Typography, Button, Row, Col, Carousel } from 'antd';

const { Title, Paragraph } = Typography;

const heroImages = [
  "/gallery/banner1.jpg",
  "/gallery/banner2.jpg",
  "/gallery/banner3.jpg"
];

export default function SmallBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        padding: '40px 20px',
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      }}
    >
      <Row
        gutter={[24, 16]}
        align="middle"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Text Content */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Tag
              color="#ff4d4f"
              style={{
                fontSize: '12px',
                padding: '0 8px',
                fontWeight: 600,
                letterSpacing: '1px',
                marginBottom: '12px',
                border: 'none'
              }}
            >
              NEW SEASON
            </Tag>

            <Title
              level={2}
              style={{
                fontWeight: 800,
                marginBottom: '12px',
                lineHeight: 1.3,
                color: '#2d3436'
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Build Power.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Train Hard.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Dominate.
              </motion.span>
            </Title>

            <Paragraph
              style={{
                fontSize: '14px',
                color: '#636e72',
                marginBottom: '20px',
                maxWidth: '90%'
              }}
            >
              Elite gym equipment for serious athletes. Transform your training today.
            </Paragraph>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="primary"
                shape="round"
                href={`/products`}
                size="middle"
                icon={<RightOutlined style={{ fontSize: '12px' }} />}
              >
                Shop Now
              </Button>
            </motion.div>
          </motion.div>
        </Col>

        {/* Image Content */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              aspectRatio: '16/9'
            }}
          >
            <Carousel
              autoplay
              autoplaySpeed={2000}
              effect="fade"
              dots={false}
              style={{
                height: '100%',
                width: '100%'
              }}
            >
              {heroImages.map((img, index) => (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={img}
                      alt={`Hero ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60px',
                        background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.5) 100%)'
                      }}
                    />
                  </motion.div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        </Col>

        {/* Decorative Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,77,79,0.1) 0%, transparent 70%)',
            zIndex: 0
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 0.5, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </Row>
    </motion.div>
  );
}