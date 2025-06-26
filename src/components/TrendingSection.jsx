'use client'

import { useEffect, useState } from "react"
import fetchApi from "../utility/api/fetchApi"
import ProductCard from "./global/ProductCard"

export default function TrendingSection() {

  const [trendingProducts, setTrendingProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [maxAmount, setMaxAmount] = useState(0)


  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const result = await fetchApi({ URI: `public/products/trending` })

        setTrendingProducts(result?.data?.map(prdct => ({
          id: prdct._id,
          name: prdct.name,
          category: prdct.category?.name || "Uncategorized",
          brand: prdct.brand?.name || "No Brand", // it's just a string ID for now
          salePrice: prdct.salePrice,
          regularPrice: prdct.regularPrice,
          imageUrl: prdct.images?.[0] || "", // first image as main image
          createdAt: prdct.createdAt,
          customLabel: prdct.customLabel,
          slug: prdct.slug,
        })))


        if (!maxAmount) {
          const maxAmount = result?.data?.reduce((acc, prdct) => {
            const salePrice = prdct?.attributes?.Sale_Price || 0;
            const regularPrice = prdct?.attributes?.Regular_Price || 0;
            return Math.max(acc, salePrice, regularPrice);
          }, 0);
          setMaxAmount(maxAmount);
        }

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)

      }
    }
    fetch()
  }, [maxAmount])

  return (
    <>
      {
        trendingProducts && (<section className="my-8 px-4 md:px-12">
          {/* Mini Banner */}
          <div className="w-full h-[100px] bg-gradient-to-r from-yellow-100 to-orange-200 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-wider">
              TRENDING THIS <span className="text-orange-500">SUMMER</span>
            </h2>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {trendingProducts?.map((product, index) => (
              <ProductCard
                key={idx}
                Id={product.id}
                Brand={product?.brand}
                Title={product?.name}
                Category={product?.category}
                SalePrice={product?.salePrice}
                RegularPrice={product?.regularPrice}
                ImageUrl={`${productUrl}/${product?.imageUrl}`}
                createdAt={product?.createdAt}
                Slug={product?.slug}
                CustomLabel={product.customLabel}

              />
            ))}
          </div>
        </section>)
      }
    </>
  )
}
