import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { productUrl } from '../../utility/api/constant'

function SingleRowProducts({ Products = [] }) {
  return (
    <>
      <Title titlePart2="You may also like" />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4'>
        {
          Products?.slice(0, 6)?.map((product, idx) =>
            <ProductCard key={idx}
              Id={product?._id}
              Title={product?.name}
              Category={product?.category?.name}
              SalePrice={product?.salePrice}
              RegularPrice={product?.regularPrice}
              ImageUrl={product?.images?.[0] ? productUrl + '/' + product.images[0] : "/product-placehold.png"}
              createdAt={product?.createdAt}
              Slug={product?.slug}
              isNewArrival={product?.isNewArrival}
              isTrending={product?.isTrending}
              isFeatured={product?.isFeatured}
              isBestSeller={product?.isBestSeller}
            />
          )
        }
      </div>
    </>
  )
}

export default SingleRowProducts