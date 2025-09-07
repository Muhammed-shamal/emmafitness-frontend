import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  Tag,
  Typography,
  Rate,
  Badge,
  Button
} from 'antd';
import {
  ShoppingCartOutlined,
} from '@ant-design/icons';
import WishListButton from './WishListButton';
import { productUrl } from '../../utility/api/constant';
import Price from './Price';

const { Title, Text } = Typography;

const PremiumProductCard = ({ product, onAddToCart, offer = null, discountInfo = null }) => {

  // Calculate regular discount
  const regularDiscount = product.salePrice < product.regularPrice
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  // Use offer discount if available
  const effectiveDiscount = discountInfo?.discountPercent || regularDiscount;
  const displayPrice = product.salePrice;
  const originalPrice = product.regularPrice;

  const averageRating = product?.reviews?.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div
      className="relative group"
    >
      {/* Custom Label Ribbon */}
      {product.customLabel && (
        <Badge.Ribbon
          text={product.customLabel}
          color="#1890ff"
          placement="start"
          className="z-20"
        >
          <div></div>
        </Badge.Ribbon>
      )}

      {/* Offer Ribbon */}
      {offer && (
        <div className="absolute top-2 left-2 z-30 mt-6">
          <Tag color="red" className="font-bold px-2">
            {offer.discountType === 'percentage'
              ? `${offer.discountValue}% OFF`
              : `$${offer.discountValue} OFF`}
          </Tag>
        </div>
      )}


      {/* Status Badges */}
      <div className="absolute top-2 right-2 z-30 flex flex-col gap-1 items-end">
        <WishListButton ProductId={product._id} />

        {product.isNewArrival && (
          <Tag color="red" className="text-xs font-semibold !rounded-full">New</Tag>
        )}
        {product.isTrending && (
          <Tag color="purple" className="text-xs font-semibold !rounded-full">Trending</Tag>
        )}
        {product.isBestSeller && (
          <Tag color="green" className="text-xs font-semibold !rounded-full">Best Seller</Tag>
        )}
      </div>

      <Link href={`/product/${encodeURIComponent(product.slug)}`}>
        <Card
          hoverable
          className="h-full overflow-hidden transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-xl"
          bodyStyle={{ padding: '16px' }}
          cover={
            <div className="relative h-60 overflow-hidden bg-gray-100">
              <Image
                src={product.images?.[0] ? `${productUrl}/${product.images[0]}` : '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          }
        >
          {/* Brand and Category */}
          <div className="flex gap-1 mb-2 flex-wrap">
            <Tag color="blue" className="text-xs !m-0">
              {product.brand?.name || 'No Brand'}
            </Tag>
            <Tag color="geekblue" className="text-xs !m-0">
              {product.category?.name || 'Uncategorized'}
            </Tag>
          </div>

          {/* Product Name */}
          <Title
            level={5}
            className="font-semibold mb-2 line-clamp-2 h-12"
            style={{ marginBottom: '8px' }}
          >
            {product.name}
          </Title>

          {/* Price Section */}
          {/* <div className="flex items-center gap-2 mb-3">
            <Text strong className="text-lg text-blue-600">
              ${displayPrice.toFixed(2)}
            </Text>
            
            {displayPrice < originalPrice && (
              <>
                <Text delete className="text-gray-500 text-sm">
                  ${originalPrice.toFixed(2)}
                </Text>
                <Tag color="red" className="text-xs font-semibold !m-0">
                  {effectiveDiscount}% OFF
                </Tag>
              </>
            )}
          </div> */}

          <Price salePrice={displayPrice} regularPrice={originalPrice} />

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Rate
              disabled
              allowHalf
              value={averageRating}
              className="text-sm"
            />
            <Text type="secondary" className="text-xs">
              ({product.reviews?.length || 0})
            </Text>
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            <Text
              type={product.status === "In Stock" ? "success" :
                product.status === "Low Stock" ? "warning" : "danger"}
              className="text-sm font-medium"
            >
              {product.status} • {product.stockQty} available
            </Text>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-1 text-xs text-gray-500 mb-3">
            {product.specs?.size && product.specs.size !== "N/A" && (
              <div className="flex items-center">
                <span className="mr-1">📏</span>
                <span className="truncate">{product.specs.size}</span>
              </div>
            )}
            {product.specs?.color && product.specs.color !== "N/A" && (
              <div className="flex items-center">
                <span className="mr-1">🎨</span>
                <span className="truncate">{product.specs.color}</span>
              </div>
            )}
          </div>

          {/* Add to Cart Button (visible on mobile always) */}
          <Button
            type="primary"
            block
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            className="hidden md:block lg:hidden xl:block"
            disabled={product.status === "Out of Stock"}
          >
            Add to Cart
          </Button>
        </Card>
      </Link>
    </div>
  );
};

export default PremiumProductCard;