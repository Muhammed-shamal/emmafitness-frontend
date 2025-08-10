'use client'
import { useState, useEffect } from "react"
import fetchApi from "../../utility/api/fetchApi"
import { Pagination, Spin } from "antd"
import TitleWithSort from '../../components/products/TitleWithSort'
import Filter from '../../components/products/Filter'
import { useSearchParams } from 'next/navigation'
import useFilter from '../../utility/useFilter'
import { productUrl } from "../../utility/api/constant"
import ProductCard2 from '../../components/global/ProductCard2'


function Page() {

  const [products, setProducts] = useState([])

  const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const [maxAmount, setMaxAmount] = useState(undefined)


  const filter = useFilter()

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const result = await fetchApi({ URI: `public/products?${filter({ params })}&populate=customLabel&populate=category.name,brand.Name&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
        console.log('result in products page', result)
        setPagination(prv => ({ ...prv, pageCount: result?.meta?.pagination?.pageCount, element: <Pagination onChange={handlePagination} responsive={true} pageSize={result?.meta?.pagination?.pageSize} showSizeChanger={false} total={result?.meta?.pagination?.total} /> }))

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
  }, [reload, params])


  const handlePagination = (pageNo) => {
    setPagination(prv => ({ ...prv, pageNo }))
    setReload(rl => !rl)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='border-r border-r-gray-300 hidden md:block'>
        <div className="w-52 pr-2 flex flex-col gap-4">
          <Filter maxAmount={maxAmount} />

        </div>
      </div>
      <div className='flex-1'>
        <div>
          <Spin spinning={loading}>
            <div>
              <TitleWithSort Title="Products" setProducts={setProducts} />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                {products?.map((product, idx) => (
                  <ProductCard2
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

              <div className="flex flex-row justify-end mt-2 md:mt-4">
                {pagination?.element}
              </div>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default Page