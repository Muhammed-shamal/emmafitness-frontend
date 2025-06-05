import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'

function SingleRowProducts({Products = []}) {
  return (
    <>
        <Title titlePart2="You may also like"/>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4'>
       {
        Products?.slice(0, 6)?.map((product, idx)=>
          <ProductCard key={idx} 
          Id={product?.id} 
          Title={product?.attributes?.Name} 
          Category={product?.attributes?.category?.data?.attributes?.Name} 
          SalePrice={product?.attributes?.Sale_Price} 
          RegularPrice={product?.attributes?.Regular_Price} 
          ImageUrl={product?.attributes?.Feature_Photo?.data?.attributes?.url}
          createdAt={product?.attributes?.createdAt}
          Slug={product?.attributes?.Slug}/>
          )
        }
        </div>
    </>
  )
}

export default SingleRowProducts