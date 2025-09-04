'use client'
import { useState, useEffect } from "react"
import fetchApi from "../../../utility/api/fetchApi"
import TitleWithSort from '../../../components/products/TitleWithSort'
import Filter from '../../../components/products/Filter'
import { useSearchParams } from 'next/navigation'
import CustomSpinner from "../../../components/global/CustomSpinner"
import { productUrl } from "../../../utility/api/constant"
import ProductCard from '../../../components/global/ProductCard'
import { Spin } from "antd"


function Page() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useSearchParams()
  const [maxAmount, setMaxAmount] = useState(undefined)

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchApi({ URI: 'public/products/featured?data=all' })

        setProducts(result?.map(prdct => ({
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
  }, [params])


  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='border-r border-r-gray-300 hidden md:block'>
        {/* <div className="w-52 pr-2 flex flex-col gap-4">
          <Filter maxAmount={maxAmount} />
        </div> */}
      </div>
      <div className='flex-1'>
        <div>
          <Spin spinning={loading}>
            <div>
              <TitleWithSort Title="All Featured Products" setProducts={setProducts} />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                {products?.map((product, idx) => (
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
                    isNewArrival={product?.isNewArrival}
                    isTrending={product?.isTrending}
                    isFeatured={product?.isFeatured}
                    isBestSeller={product?.isBestSeller}
                  />
                ))}
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default Page