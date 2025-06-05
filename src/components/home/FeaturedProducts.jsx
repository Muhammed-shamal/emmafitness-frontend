'use client'
import ProductCard from "../global/ProductCard"
import fetchApi from "../../utility/api/fetchApi"
import { useState, useEffect, Suspense } from "react"
import CustomSpinner from "../global/CustomSpinner"

 function FeaturedProducts() {
  const [product, setProducts] = useState([{},{}, {}, {}, {}, {}])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const result = await fetchApi({ URI: 'products?filters[Featured][$eq]=true&pagination[limit]=24&populate=*&sort=createdAt:Desc' })
      .finally(()=>setLoading(false))
      setProducts(result?.data?.map(prdct => ({
        id: prdct?.id,
        name: prdct?.attributes?.Name,
        category: prdct?.attributes?.category?.data?.attributes?.Name,
        brand: prdct?.attributes?.brand?.data?.attributes?.Name,
        salePrice: prdct?.attributes?.Sale_Price,
        regularPrice: prdct?.attributes?.Regular_Price,
        imageUrl: prdct?.attributes?.Feature_Photo?.data?.attributes?.url,
        createdAt: prdct?.attributes?.createdAt,
        customLabel : prdct?.attributes?.custom_label?.data?.attributes?.Name,
        Featured: prdct?.attributes?.Featured,
        slug: prdct?.attributes?.Slug
      })))
    }
    fetch()
  }, [])


  return (
    <CustomSpinner spinning={loading}>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
      <Suspense fallback={<p>loading products...</p>}>

        {
          product?.map((product, idx) =>
          <ProductCard key={idx}
          Id={product?.id}
          Title={product?.name}
          Brand={product?.brand}
          Category={product?.category}
          SalePrice={product?.salePrice}
          RegularPrice={product?.regularPrice}
          ImageUrl={product?.imageUrl}
          createdAt={product?.createdAt}
          CustomLabel={product.customLabel}
          Slug={product?.slug}
          Featured={product?.Featured} />
          )
        }
        </Suspense>
      </div>


    </CustomSpinner>
  )
}

export default FeaturedProducts