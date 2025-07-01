'use client'

import { useEffect, useState } from "react"
import TitleWithSort from "./TitleWithSort"
import { productUrl } from "../../utility/api/constant"
import ProductCard2 from "../global/productCard2"


function ProductsList({ products }) {
  const [product, setProducts] = useState()


  useEffect(() => {
    if (!products) return;

    setProducts(
      products.map((prdct) => ({
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
      }))
    );
  }, [products]);



  return (
    <div>
      <TitleWithSort Title="Products" setProducts={setProducts} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {
          product && product?.map((product, idx) =>
            <ProductCard2 key={idx}
              Id={product.id}
              Title={product?.name}
              Category={product?.category}
              Brand={product?.brand}
              SalePrice={product?.salePrice}
              RegularPrice={product?.regularPrice}
              ImageUrl={`${productUrl}/${product?.imageUrl}`}
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