'use client'
import ProductCard from "../global/ProductCard"
import { useEffect, useState } from "react"
import fetchApi from "../../utility/api/fetchApi"
import CustomSpinner from "../global/CustomSpinner"
function NewProducts() {

  const [product, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      const result = await fetchApi({ URI: 'products?sort[createdAt]=desc&pagination[limit]=18&populate=*' })
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
        customLabel : prdct?.attributes?.customLabel?.data?.attributes?.Name,
        slug: prdct?.attributes?.Slug
      })))
    }
    fetch()
  }, [])

  

  return (
    <CustomSpinner spinning={loading}>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">

  {
    product?.map((prd,idx)=>
      <ProductCard 
      Brand={prd?.brand} 
      Id={prd?.id} 
      ImageUrl={prd?.imageUrl} 
      createdAt={prd?.createdAt} 
      RegularPrice={prd?.regularPrice} 
      SalePrice={prd?.salePrice} 
      Slug={prd?.slug} 
      CustomLabel={product.customLabel}
      Title={prd?.name} 
      key={idx}/>
      )
  }
</div>

</CustomSpinner>
  )
}

export default NewProducts