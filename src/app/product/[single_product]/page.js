'use client';

import Price from "../../../components/global/Price"
import OffLabel from "../../../components/global/label/OffLabel"
import CartButton from "../../../components/global/CartButton"
import BuyNow from "../../../components/global/BuyNowButton"
import WishLIstButton from '../../../components/global/WishListButton'
import { Divider, Tag,Spin } from "antd"
import ImageSection from '../../../components/singleProduct/ImageSection'
import DescriptionSection from '../../../components/singleProduct/descriptionSection'
import SingleRowProducts from '../../../components/global/SingleRowProducts'
import fetchApi from "../../../utility/api/fetchApi"
import Image from "next/legacy/image"
import MarkDownText from "../../../components/global/MarkDownText"
import { brandUrl, productUrl } from "../../../utility/api/constant"
import { useEffect, useState } from "react";

function Page({ params }) {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchApi({ URI: `public/products/getBy/${params.single_product}`});
        setProduct(res);

        const catId = res?.category?._id;
        const productId = res?._id;
        const related = await fetchApi({URI: `public/products/related?categoryId=${catId}&excludeId=${productId}`})
        setRelatedProducts(related);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.single_product,product?.category?._id, product?._id]);


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
<OffLabel RegularPrice={product?.regularPrice} SalePrice={product?.salePrice} />

<div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
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

          <div className="text-sm">
            <MarkDownText text={product?.description} />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <CartButton ProductId={product?._id} />
          <BuyNow ProductId={product?._id} />
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


