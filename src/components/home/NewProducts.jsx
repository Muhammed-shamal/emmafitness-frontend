'use client'
import ProductCard from "../global/ProductCard"
import { useEffect, useState } from "react"
import fetchApi from "../../utility/api/fetchApi"
import CustomSpinner from "../global/CustomSpinner"
import { productUrl } from "../../utility/api/constant"
function NewProducts() {

  const [product, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      const result = await fetchApi({ URI: 'public/products/new' })
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
        slug: prdct.slug,
      })))
    }
    fetch()
  }, [])



  return (
    <CustomSpinner spinning={loading}>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">

        {
          product?.map((prd, idx) =>
            <ProductCard
              Brand={prd?.brand}
              Id={prd?.id}
              ImageUrl={`${productUrl}/${prd?.imageUrl}`}
              createdAt={prd?.createdAt}
              RegularPrice={prd?.regularPrice}
              SalePrice={prd?.salePrice}
              Slug={prd?.slug}
              CustomLabel={product.customLabel}
              Title={prd?.name}
              key={idx} />
          )
        }
      </div>

    </CustomSpinner>
  )
}

export default NewProducts