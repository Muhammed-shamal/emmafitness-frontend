import Price from "../../../components/global/Price"
import OffLabel from "../../../components/global/label/OffLabel"
import CartButton from "../../../components/global/CartButton"
import BuyNow from "../../../components/global/BuyNowButton"
import WishLIstButton from '../../../components/global/WishListButton'
import { Divider, Tag } from "antd"
import ImageSection from '../../../components/singleProduct/ImageSection'
import DescriptionSection from '../../../components/singleProduct/descriptionSection'
import SingleRowProducts from '../../../components/global/SingleRowProducts'
import fetchApi from "../../../utility/api/fetchApi"
import Image from "next/legacy/image"
import MarkDownText from "../../../components/global/MarkDownText"

async function Page({ params }) {

  let product, relatedProducts
  try {
    product = await fetchApi({ URI: `public/products?filters[Slug][$eq]=${params?.single_product}&populate=category,brand.Photo,Photos` })

    relatedProducts = await fetchApi({ URI: `public/products?filters[category][id][$eq]=${product?.data?.[0]?.attributes?.category?.data?.[0]?.id}&sort[0]=createdAt:asc&populate=category` })
  } catch (err) {
    console.log(err)
  }


  const specialIcons = [
    { url: "/icons/shipped.png", alt: "shopping", title: "Free Shipping" },
    { url: "/icons/easy-installation.png", alt: "installation", title: "Free Installation" },
    { url: "/icons/guarantee.png", alt: "guarantee", title: "Product Warranty" },
  ]


  return (
    <div className="container my-4 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row bg-white shadow rounded p-4 ">

        <ImageSection Images={[
          {
            url: product?.data?.[0]?.attributes?.Feature_Photo?.data?.attributes?.url,
            alt: product?.data?.[0]?.attributes?.Feature_Photo?.data?.attributes?.alternativeText,
          },
          ...(product?.data?.[0]?.attributes?.Photos?.data?.map(({ attributes }) => ({
            url: attributes?.url,
            alt: attributes?.alternativeText,
          })) || [])
        ]} />

        <div className="lg:border-l  pl-4 max-w-md flex flex-col gap-4 ">

          <div className="mt-4">

            <h1 className="text-xl font-bold">{product?.data?.[0]?.attributes?.Name}</h1>
            <Image
              src={product?.data?.[0]?.attributes?.brand?.data?.attributes?.Photo?.data?.attributes?.url ? product?.data?.[0]?.attributes?.brand?.data?.attributes?.Photo?.data?.attributes?.url : "/product-placehold.png"}
              className="object-cover"
              width={120}
              height={40} />

            <Divider />
            <div className="flex gap-2 md:gap-4 ">
              {
                specialIcons?.map(it =>
                  <div key={it.url} className="flex flex-col items-center justify-center">
                    <div className="border flex border-gray-200 items-center justify-center  rounded-full h-10 w-10 md:h-12 md:w-12">
                      <Image src={it.url} width={30} height={30} alt={it.alt} />
                    </div>
                    <span className="text-xs text-gray-600 text-center">{it.title}</span>
                  </div>
                )
              }
            </div>
            <Divider />

            <Price salePrice={product?.data?.[0]?.attributes?.Sale_Price}
              regularPrice={product?.data?.[0]?.attributes?.Regular_Price} />
            <OffLabel RegularPrice={product?.data?.[0]?.attributes?.Regular_Price}
              SalePrice={product?.data?.[0]?.attributes?.Sale_Price} />
            <div className="mt-2 text-xs">
              
              <Tag color="cyan" className="rounded-none">{product?.data?.[0]?.attributes?.Condition}</Tag>

              {
                product?.data?.[0]?.attributes?.Stock < 3 && product?.data?.[0]?.attributes?.Stock > 0 ?
                <span className=" text-orange-500 font-semibold">Stock - {product?.data?.[0]?.attributes?.Stock} left</span>
                : product?.data?.[0]?.attributes?.Stock < 1 ?
                <span className=" text-red-600 font-semibold">Out of stock</span>
                : <span className=" text-green-700 font-semibold">In stock</span>
              }


            </div>
            <Divider />
            <div className="text-sm">
              <MarkDownText text={product?.data?.[0]?.attributes?.ShortDescription} />
            </div>
          </div>

          <div className="flex flex-row gap-4">

            <CartButton ProductId={product?.data?.[0]?.id} />
            <BuyNow ProductId={product?.data?.[0]?.id} />
            <WishLIstButton ProductId={product?.data?.[0]?.id} />
          </div>
        </div>
      </div>

      <DescriptionSection fullDescription={product?.data?.[0]?.attributes?.Full_Description} />

      <SingleRowProducts Products={relatedProducts?.data} />
    </div>
  )
}

export default Page


