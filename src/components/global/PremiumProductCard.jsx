import React from 'react';
import { Card, Image, Typography, Tag, Button, Space, Divider, Rate, Badge, Tooltip } from 'antd';
import {
    ShoppingCartOutlined,
    EyeOutlined,
    HeartOutlined,
    StarFilled,
    FireFilled,
    CrownFilled,
    GiftFilled
} from '@ant-design/icons';
import { productUrl } from '../../utility/api/constant';
import Link from 'next/link';
import WishListButton from './WishListButton';

const { Text, Title } = Typography;

const PremiumProductCard = ({ product, onAddToCart }) => {
    const discountPercentage = Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100);
    const averageRating = product?.reviews.length > 0
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        : 0;

    return (
        <Badge.Ribbon
            text={product.customLabel}
            color="#1890ff"
            placement="start"
        >
            <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end text-xs font-semibold">
                <WishListButton ProductId={product._id} />

                {product.isNewArrival && <Tag color="red" className="!rounded">New</Tag>}
                {product.isTrending && <Tag color="purple" className="!rounded">Trending</Tag>}
                {product.isBestSeller && <Tag color="green" className="!rounded">Best Seller</Tag>}
                {product.CustomLabel && <Tag color="yellow" className="text-black !rounded">{product.customLabel}</Tag>}
            </div>

            <Link href={`/product/${encodeURIComponent(product.slug)}`} className="relative block group">
                <Card
                    hoverable
                    className="premium-product-card"
                    cover={
                        <div className="product-image-container">
                            <Image
                                src={`${productUrl}/${product.images[0]}`}
                                alt={product.name}
                                preview={false}
                                className="product-image"
                            />
                            {/* <div className="product-badges">
                                {product.isNewArrival && (
                                    <Tag icon={<CrownFilled />} color="gold" className="product-badge">
                                        New
                                    </Tag>
                                )}
                                {product.isBestSeller && (
                                    <Tag icon={<StarFilled />} color="volcano" className="product-badge">
                                        Bestseller
                                    </Tag>
                                )}
                                {product.isTrending && (
                                    <Tag icon={<FireFilled />} color="magenta" className="product-badge">
                                        Trending
                                    </Tag>
                                )}
                                {product.isFeatured && (
                                    <Tag icon={<GiftFilled />} color="cyan" className="product-badge">
                                        Featured
                                    </Tag>
                                )}
                            </div> */}
                        </div>
                    }
                   
                >
                    <div className="product-content">
                        <div className="product-meta">
                            <Tag color="blue">{product.brand.name}</Tag>
                            <Tag color="geekblue">{product.category.name}</Tag>
                        </div>

                        <Title level={4} className="product-title">
                            {product.name}
                        </Title>

                        <Text type="secondary" className="product-description">
                            {product.description}
                        </Text>

                        <div className="product-specs">
                            <Space size={[8, 16]} wrap>
                                <Tooltip title="Size">
                                    <Tag icon="📏">{product.specs.size}</Tag>
                                </Tooltip>
                                <Tooltip title="Machine Weight">
                                    <Tag icon="⚖️">{product.specs.machineWeight} kg</Tag>
                                </Tooltip>
                                <Tooltip title="Color">
                                    <Tag icon="🎨">{product.specs.color}</Tag>
                                </Tooltip>
                            </Space>
                        </div>
                        <div className="price-section">
                            <Text strong className="sale-price">
                                ${product.salePrice.toFixed(2)}
                            </Text>
                            {product.salePrice < product.regularPrice && (
                                <>
                                    <Text delete className="regular-price">
                                        ${product.regularPrice.toFixed(2)}
                                    </Text>
                                    <Tag color="red" className="discount-tag">
                                        {discountPercentage}% OFF
                                    </Tag>
                                </>
                            )}
                        </div>

                        <div className="product-stats">
                            <Rate
                                disabled
                                allowHalf
                                value={averageRating}
                                className="product-rating"
                            />
                            <Text type="secondary" className="sold-count">
                                {product.soldCount} sold
                            </Text>
                        </div>

                        <div className="stock-status">
                            <Text type={product.status === "In Stock" ? "success" : product.status === "Low Stock" ? "warning" : "danger"}>
                                {product.status} ({product.stockQty} available)
                            </Text>
                        </div>
                    </div>
                </Card>
            </Link>

            <style jsx global>{`
        .premium-product-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        
        .premium-product-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        
        .product-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        
        .premium-product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .product-badges {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 1;
        }
        
        .product-badge {
          margin: 0;
          font-weight: 500;
          border-radius: 4px;
        }
        
        .product-actions {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .premium-product-card:hover .product-actions {
          opacity: 1;
        }
        
        .action-btn {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .product-content {
          padding: 12px;
        }
        
        .product-meta {
          margin-bottom: 8px;
        }
        
        .product-title {
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .product-description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 12px;
          min-height: 36px;
        }
        
        .product-divider {
          margin: 12px 0;
        }
        
        .product-specs {
          margin-bottom: 12px;
        }
        
        .product-pricing {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .price-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .sale-price {
          font-size: 18px;
          color: #1890ff;
          font-weight: 600;
        }
        
        .regular-price {
          font-size: 14px;
          color: #999;
        }
        
        .discount-tag {
          font-weight: 500;
          border-radius: 4px;
        }
        
        .product-stats {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .product-rating .ant-rate-star {
          font-size: 14px;
        }
        
        .sold-count {
          font-size: 12px;
        }
        
      `}</style>
        </Badge.Ribbon>
    );
};

export default PremiumProductCard;