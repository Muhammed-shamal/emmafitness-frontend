'use client';

import { Button } from 'antd';
import Image from 'next/image';
import { ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export default function SubBanner2() {
    return (
        <div className="banner-container">
            {/* Background with overlay */}
            <div className="banner-background">
                <Image
                    src="/power-zone-bg.jpg"
                    alt="Strength Training"
                    fill="true"
                    priority
                    style={{ objectFit: 'cover' }}
                    quality={100}
                />
                <div className="banner-overlay" />
            </div>

            {/* Content */}
            <div className="banner-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="banner-text"
                >
                    <h1 className="banner-title">STRENGTH & POWER ZONE</h1>
                    <p className="banner-subtitle">
                        Crush Every Rep. Build Unstoppable Strength – All from Home.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            className="banner-button"
                            icon={<ArrowRightOutlined />}
                        >
                            VIEW ALL
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            <style jsx>{`
        .banner-container {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 500px;
          max-height: 800px;
          overflow: hidden;
        }

        .banner-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }

        .banner-content {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 5%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .banner-text {
          max-width: 600px;
          color: white;
        }

        .banner-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .banner-subtitle {
          font-size: clamp(1rem, 2vw, 1.5rem);
          margin-bottom: 2.5rem;
          line-height: 1.5;
          max-width: 80%;
        }

        .banner-button {
          font-weight: 600;
          padding: 0 2rem;
          height: 3.5rem;
          font-size: 1.1rem;
          border: none;
          background: linear-gradient(90deg, #ff4d4f 0%, #f5222d 100%);
        }

        .banner-button :global(.anticon) {
          transition: transform 0.3s;
        }

        .banner-button:hover :global(.anticon) {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .banner-container {
            height: 60vh;
            min-height: 400px;
          }
          
          .banner-subtitle {
            max-width: 100%;
          }
        }
      `}</style>
        </div>
    );
}