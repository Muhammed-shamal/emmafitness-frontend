'use client';

import Price from "../../../components/global/Price"
import OffLabel from "../../../components/global/label/OffLabel"
import CartButton from "../../../components/global/CartButton"
import { BuyNow2 } from "../../../components/checkout/buyNow"
import WishLIstButton from '../../../components/global/WishListButton'
import { Divider, Tag, Spin } from "antd"
import ImageSection from '../../../components/singleProduct/ImageSection'
import DescriptionSection from '../../../components/singleProduct/descriptionSection'
import SingleRowProducts from '../../../components/global/SingleRowProducts'
import fetchApi from "../../../utility/api/fetchApi"
import Image from "next/legacy/image"
import MarkDownText from "../../../components/global/MarkDownText"
import { brandUrl, productUrl } from "../../../utility/api/constant"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

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
    { url: "/icons/shipped.png", alt: "shopping", title: "Free Shipping" },
    { url: "/icons/easy-installation.png", alt: "installation", title: "Free Installation" },
    { url: "/icons/guarantee.png", alt: "guarantee", title: "Product Warranty" },
  ]


  return (
    <Spin spinning={loading}>
      <div className="container my-4 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row bg-white shadow rounded p-4">

          <ImageSection
            Images={[
              {
                url: `${product?.images?.[0] ? productUrl + '/' + product.images[0] : "/product-placehold.png"}`,
                alt: product?.name,
              },
            ]}
          />

          <div className="lg:border-l pl-4 max-w-md flex flex-col gap-4">
            <div className="mt-4">
              <h1 className="text-xl font-bold">{product?.name}</h1>
              <Image
                src={`${product?.brand?.logo ? brandUrl + '/' + product?.brand.logo : "/product-placehold.png"}`}
                className="object-cover"
                width={120}
                height={40}
                alt="brand-logo"
              />

              <Divider />

              <div className="flex gap-2 md:gap-4">
                {specialIcons.map((it) => (
                  <div key={it.url} className="flex flex-col items-center justify-center">
                    <div className="border flex border-gray-200 items-center justify-center rounded-full h-10 w-10 md:h-12 md:w-12">
                      <Image src={it.url} width={30} height={30} alt={it.alt} />
                    </div>
                    <span className="text-xs text-gray-600 text-center">{it.title}</span>
                  </div>
                ))}
              </div>

              <Divider />

              <Price salePrice={product?.salePrice} regularPrice={product?.regularPrice} />

              <div className="mt-3">
                <OffLabel RegularPrice={product?.regularPrice} SalePrice={product?.salePrice} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                {/* <Tag color="cyan" className="rounded-none">{product?.status}</Tag> */}

                {product?.stockQty < 10 && product?.stockQty > 0 ? (
                  <span className="text-orange-500 font-semibold">Stock - {product?.stockQty} left</span>
                ) : product?.stockQty < 1 ? (
                  <span className="text-red-600 font-semibold">Out of stock</span>
                ) : (
                  <span className="text-green-700 font-semibold">In stock</span>
                )}

                {product?.isNewArrival && <Tag color="red">New Arrival</Tag>}
                {product?.isFeatured && <Tag color="gold">Featured</Tag>}
                {product?.isTrending && <Tag color="purple">Trending</Tag>}
                {product?.isBestSeller && <Tag color="green">Best Seller</Tag>}
                {product?.customLabel && <Tag color="yellow" className="text-black">{product?.customLabel}</Tag>}
              </div>

              <Divider />

              {/* Support Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full text-sm">
                <a
                  href={`https://wa.me/971551187470?text=Hello, I'm interested in ${product?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border rounded-md px-4 py-3 shadow hover:shadow-md transition"
                >
                  <span>Need More Details or Assistance? Chat with our specialist</span>
                  <Image src="/icons/tiktok.svg" width={24} height={24} alt="WhatsApp" />
                </a>

                <a
                  href="tel:+971551187470"
                  className="flex items-center justify-between border rounded-md px-4 py-3 shadow hover:shadow-md transition"
                >
                  <span>Request a Callback</span>
                  <Image src="/icons/phone.svg" width={24} height={24} alt="Callback" />
                </a>
              </div>

              {/* Delivery Estimate */}
              <div className="text-sm mt-4 text-gray-600 font-medium">
                <p>🚚 Expected Delivery in <span className="text-black font-semibold">3–5 Business Days</span></p>
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


              <div className="text-sm">
                <MarkDownText text={product?.description} />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <CartButton productId={product?._id} />
              <BuyNow2 productId={product?._id} product={product} />
              <WishLIstButton ProductId={product?._id} />
            </div>
          </div>
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

export default Page


