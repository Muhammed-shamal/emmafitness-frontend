'use client';

import Price from "../../../components/global/Price"
import OffLabel from "../../../components/global/label/OffLabel"
import CartButton from "../../../components/global/CartButton"
import { BuyNow2 } from "../../../components/checkout/buyNow"
import WishLIstButton from '../../../components/global/WishListButton'
import { Divider, Tag, Spin, Empty, List, Rate, Avatar, Button } from "antd"
import ImageSection from '../../../components/singleProduct/ImageSection'
import DescriptionSection from '../../../components/singleProduct/descriptionSection'
import SingleRowProducts from '../../../components/global/SingleRowProducts'
import fetchApi from "../../../utility/api/fetchApi"
import Image from "next/legacy/image"
import DescriptionWithReadMore from '../../../components/DescriptionWithReadMore'
import { brandUrl, productUrl } from "../../../utility/api/constant"
import { useEffect, useState } from "react";
import moment from 'moment'
import {
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import basicData from "../../../utility/basicDatas";

function Page({ params }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchApi({ URI: `public/products/getBy/${params.single_product}` });
        setProduct(res);

        const catId = res?.category?._id;
        const productId = res?._id;
        const related = await fetchApi({ URI: `public/products/related?categoryId=${catId}&excludeId=${productId}` })
        setRelatedProducts(related);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.single_product, product?.category?._id, product?._id]);


  const handleBuyNow = () => {
    if (!product?._id) return;
    router.push(`/order?productId=${product._id}`);
  }


  const specialIcons = [
    // { url: "/icons/shipped.png", alt: "shopping", title: "Free Shipping" },
    { url: "/icons/easy-installation.png", alt: "installation", title: "Free Installation" },
    { url: "/icons/guarantee.png", alt: "guarantee", title: "Product Warranty" },
  ]

  return (
    <Spin spinning={loading}>
      <div className="container my-4 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row bg-white shadow rounded p-4">

          <ImageSection
            Images={
              product?.images?.length > 0
                ? product.images.map(img => ({
                  url: `${productUrl}/${img}`,
                  alt: product.name
                }))
                : [{
                  url: "/product-placehold.png",
                  alt: "Placeholder"
                }]
            }
          />

          <div className="lg:border-l pl-4 max-w-md flex flex-col gap-4">
            <div className="mt-4 space-y-4">
              {/* Product Name and Brand */}
              <div>
                <h1 className="text-xl font-bold">{product?.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <small className="text-gray-600">{product?.brand?.name}</small>
                  {product?.brand?.logo && (
                    <Image
                      src={brandUrl + '/' + product?.brand.logo}
                      className="object-contain"
                      width={120}
                      height={40}
                      alt={`${product?.brand?.name} logo`}
                    />
                  )}
                </div>
              </div>

              <Divider />

              {/* Special Icons */}
              <div className="flex flex-wrap gap-4">
                {specialIcons.map((it) => (
                  <div key={it.url} className="flex flex-col items-center text-center">
                    <div className="border border-gray-200 flex items-center justify-center rounded-full h-12 w-12">
                      <Image src={it.url} width={30} height={30} alt={it.alt} />
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{it.title}</span>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Price */}
              <Price salePrice={product?.salePrice} regularPrice={product?.regularPrice} />

              {/* Off Label */}
              <div className="mt-2">
                <OffLabel RegularPrice={product?.regularPrice} SalePrice={product?.salePrice} />
              </div>

              {/* Stock & Labels */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
                {product?.stockQty < 1 ? (
                  <span className="text-red-600">Out of stock</span>
                ) : product?.stockQty < 10 ? (
                  <span className="text-orange-500">Stock - {product?.stockQty} left</span>
                ) : (
                  <span className="text-green-700">In stock</span>
                )}

                {product?.isNewArrival && <Tag color="red">New Arrival</Tag>}
                {product?.isFeatured && <Tag color="gold">Featured</Tag>}
                {product?.isTrending && <Tag color="purple">Trending</Tag>}
                {product?.isBestSeller && <Tag color="green">Best Seller</Tag>}
                {product?.customLabel && (
                  <Tag color="yellow" className="text-black">
                    {product.customLabel}
                  </Tag>
                )}
              </div>

              <Divider />

              {/* Support Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <a
                  href={`${basicData.whatsapp.slug}?text=Hello, I'm interested in ${product?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border rounded-md px-4 py-3 shadow hover:shadow-md transition"
                >
                  <span>Need more details or assistance? Chat with our specialist</span>
                  <Image src="/icons/whatsapp.svg" width={24} height={24} alt="WhatsApp" />
                </a>

                <a
                  href={basicData.telphone.slug}
                  className="flex items-center justify-between border rounded-md px-4 py-3 shadow hover:shadow-md transition"
                >
                  <span>Request a Callback</span>
                  <Image src="/icons/phone.svg" width={24} height={24} alt="Phone" />
                </a>
              </div>

              {/* Delivery Estimate */}
              <div className="text-sm text-gray-600 font-medium">
                🚚 Expected Delivery in{" "}
                <span className="text-black font-semibold">3–5 Business Days</span>
              </div>

              {/* Social Share Section */}
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Share this product</p>
                <div className="flex items-center gap-4 text-xl">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:opacity-80"
                  >
                    <FaFacebookSquare />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:opacity-80"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:opacity-80"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:opacity-80"
                  >
                    <FaWhatsapp />
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(currentUrl)}
                    title="Copy link"
                    className="text-gray-600 hover:text-black"
                  >
                    <FaLink />
                  </button>
                </div>
              </div>

              {/* Description */}
              <DescriptionWithReadMore text={product?.description} />
            </div>

            <div className="flex flex-row gap-4">
              <CartButton productId={product?._id} />
              <BuyNow2 product={product} />
              <WishLIstButton ProductId={product?._id} />
            </div>
          </div>
        </div>


        {/* Reviews Section */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-2xl font-bold mb-6 border-b pb-3">Customer Reviews</h2>

          {product?.reviews && product.reviews.length > 0 ? (
            <>
              {/* Review Summary */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg md:w-1/3">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {calculateAverageRating(product.reviews).toFixed(1)}
                  </div>
                  <Rate
                    value={calculateAverageRating(product.reviews)}
                    disabled
                    className="text-lg mb-2"
                    character={({ index }) => {
                      const avgRating = calculateAverageRating(product.reviews);
                      return index < Math.floor(avgRating) ? (
                        <StarFilled className="text-yellow-400" />
                      ) : index < avgRating ? (
                        <StarHalfFilled className="text-yellow-400" />
                      ) : (
                        <StarOutlined className="text-yellow-400" />
                      );
                    }}
                  />
                  <p className="text-gray-600 text-sm">
                    Based on {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = product.reviews.filter(r => Math.round(r.rating) === star).length;
                    const percentage = (count / product.reviews.length) * 100;

                    return (
                      <div key={star} className="flex items-center mb-2">
                        <div className="w-12 text-right mr-2">
                          <span className="text-gray-600">{star} star</span>
                        </div>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-right ml-2">
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="border-t pt-6">
                <List
                  itemLayout="vertical"
                  dataSource={product.reviews}
                  renderItem={(review) => (
                    <li className="pb-6 mb-6 border-b last:border-b-0 last:mb-0">
                      <div className="flex items-start mb-3">
                        <Avatar
                          size={40}
                          icon={<UserOutlined />}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-800">
                              {review.user?.name || 'Anonymous Customer'}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {moment(review.createdAt).format('MMM DD, YYYY')}
                            </span>
                          </div>
                          <Rate
                            value={review.rating}
                            disabled
                            className="text-sm mb-2"
                            character={({ index }) => {
                              return index < review.rating ? (
                                <StarFilled className="text-yellow-400" />
                              ) : (
                                <StarOutlined className="text-yellow-400" />
                              );
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      {/* Helpful buttons */}
                      {/* <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">Was this helpful?</span>
                        <Button
                          type="text"
                          size="small"
                          icon={<LikeOutlined />}
                          className="flex items-center mr-2"
                        >
                          <span className="ml-1">Yes</span>
                        </Button>
                        <Button
                          type="text"
                          size="small"
                          icon={<DislikeOutlined />}
                          className="flex items-center"
                        >
                          <span className="ml-1">No</span>
                        </Button>
                      </div> */}
                    </li>
                  )}
                />
              </div>
            </>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-500">No reviews yet. Be the first to review this product!</span>
              }
            />
          )}
        </div>

        <DescriptionSection fullDescription={product?.description} />
        {relatedProducts && relatedProducts.length > 0 ? (
          <SingleRowProducts Products={relatedProducts} />
        ) : (
          <div className="bg-white text-center p-6 border rounded shadow-sm">
            <p className="text-gray-500 text-sm">No related products found in this category.</p>
          </div>
        )}

      </div>
    </Spin>
  );
}

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
};

// Custom half-star icon component
const StarHalfFilled = () => (
  <span className="anticon">
    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <defs>
        <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" fill="url(#halfStar)"></path>
    </svg>
  </span>
);

export default Page


