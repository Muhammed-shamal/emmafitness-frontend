'use client'
import ProductCard from "../global/ProductCard"
import { useEffect, useState } from "react"
import TitleWithSort from "./TitleWithSort"


 function ProductsList({ products }) {
  const [product, setProducts] = useState()


  useEffect(()=>{

    setProducts(products?.map(prdct => ({
      id: prdct?.id,
      name: prdct?.attributes?.Name,
      category: prdct?.attributes?.category?.data?.attributes?.Name,
      brand: prdct?.attributes?.brand?.data?.attributes?.Name,
      salePrice: prdct?.attributes?.Sale_Price,
      regularPrice: prdct?.attributes?.Regular_Price,
      imageUrl: prdct?.attributes?.Feature_Photo?.data?.attributes?.url,
      createdAt: prdct?.attributes?.createdAt,
      customLabel : prdct?.attributes?.custom_label?.data?.attributes?.Name,
      brand: prdct?.attributes?.brand?.data?.attributes?.Name,
      slug: prdct?.attributes?.Slug
    })))
  },[products])


  return (
    <div>
           <TitleWithSort Title="Products" setProducts={setProducts}/>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {
         product && product?.map((product, idx) =>
            <ProductCard key={idx}
            Id={product.id}
            Title={product?.name}
            Category={product?.category}
            Brand={product?.brand}
            SalePrice={product?.salePrice}
            RegularPrice={product?.regularPrice}
            ImageUrl={product?.imageUrl}
            createdAt={product?.createdAt}
            Slug={product?.slug}
            CustomLabel={product.customLabel}
            />
          )
        }
      </div>
    </div>
  )
}

export default ProductsList