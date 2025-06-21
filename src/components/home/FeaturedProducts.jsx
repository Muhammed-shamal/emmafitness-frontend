'use client'
import ProductCard from "../global/ProductCard"
import fetchApi from "../../utility/api/fetchApi"
import { useState, useEffect, Suspense } from "react"
import CustomSpinner from "../global/CustomSpinner"
import { productUrl } from "../../utility/api/constant"

function FeaturedProducts() {
  const [product, setProducts] = useState([{}, {}, {}, {}, {}, {}])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const result = await fetchApi({ URI: 'public/products?filters[Featured][$eq]=true&pagination[limit]=24&populate=*&sort=createdAt:Desc' })
        .finally(() => setLoading(false))
      setProducts(result?.data?.map(prdct => ({
        id: prdct._id,
        name: prdct.name,
        category: prdct.category?.name || "Uncategorized",
        brand: prdct.brand?.name || "No Brand", // it's just a string ID for now
        salePrice: prdct.salePrice,
        regularPrice: prdct.regularPrice,
        imageUrl: prdct.images?.[0] || "", // first image as main image
        createdAt: prdct.createdAt,
        customLabel: prdct.customLabel,
        Featured: prdct.featured,
        slug: prdct.slug,
      })))
    }
    fetch()
  }, [])


  return (
    <CustomSpinner spinning={loading}>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        <Suspense fallback={<p>loading products...</p>}>

          {
            product?.map((prd, idx) =>
              <ProductCard key={idx}
                Brand={prd?.brand}
                Id={prd?.id}
                ImageUrl={`${productUrl}/${prd?.imageUrl}`}
                createdAt={prd?.createdAt}
                RegularPrice={prd?.regularPrice}
                SalePrice={prd?.salePrice}
                Slug={prd?.slug}
                CustomLabel={product.customLabel}
                Title={prd?.name}
                Featured={prd?.Featured} />
            )
          }
        </Suspense>
      </div>


    </CustomSpinner>
  )
}

export default FeaturedProducts