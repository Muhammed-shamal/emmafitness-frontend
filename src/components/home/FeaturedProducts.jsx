'use client'

import { productUrl } from "../../utility/api/constant"
import ProductCard2 from "../global/ProductCard2"
import SkeletonGrid from '../global/skeletons/SkeletonGrid'

function FeaturedProducts({ products = [] }) {
  const loading = products.length === 0;
  
    return (
      <div>
        {loading ? <SkeletonGrid /> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
  
        {
          products.map((prd, idx) =>
            <ProductCard2
              key={idx}
              Brand={prd?.brand?.name}
              Id={prd?._id}
              ImageUrl={productUrl + '/' + prd?.images?.[0]}
              createdAt={prd?.createdAt}
              RegularPrice={prd?.regularPrice}
              SalePrice={prd?.salePrice}
              Slug={prd?.slug}
              CustomLabel={prd?.customLabel}
              Title={prd?.name}
              isNewArrival={prd?.isNewArrival}
              isTrending={prd?.isTrending}
              isFeatured={prd?.isFeatured}
              isBestSeller={prd?.isBestSeller} />
          )
        }
      </div>}
      </div>
    )
}

export default FeaturedProducts
