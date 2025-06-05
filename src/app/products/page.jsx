'use client'
import { useState, useEffect } from "react"
import fetchApi from "../../utility/api/fetchApi"
import { Pagination } from "antd"
import ProductCard from '../../components/global/ProductCard'
import TitleWithSort from '../../components/products/TitleWithSort'
import Filter from '../../components/products/Filter'
import {useSearchParams} from 'next/navigation'
import useFilter from '../../utility/useFilter'
import CustomSpinner from "../../components/global/CustomSpinner"


function Page() {

  const [products, setProducts] = useState([])

  const [pagination, setPagination] = useState({pageCount: 0, pageNo: 1, pageSize: 30})
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const [maxAmount, setMaxAmount] = useState(undefined)


  const filter =  useFilter()

  useEffect(() => {
    const fetch = async () => {
      try{
        setLoading(true)
        const result = await fetchApi({ URI: `products?${filter({params})}&populate=custom_label&populate=category.name,Feature_Photo.url,brand.Name&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
        setPagination(prv=>({...prv, pageCount: result?.meta?.pagination?.pageCount , element: <Pagination onChange={handlePagination} responsive={true} pageSize={result?.meta?.pagination?.pageSize} showSizeChanger={false}   total={result?.meta?.pagination?.total} />}))
  
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
          brand: prdct?.attributes?.brand?.data?.attributes?.Name,
          slug: prdct?.attributes?.Slug
        })))

        
        if(!maxAmount) {
        const maxAmount = result?.data?.reduce((acc, prdct) => {
          const salePrice = prdct?.attributes?.Sale_Price || 0;
          const regularPrice = prdct?.attributes?.Regular_Price || 0;
          return Math.max(acc, salePrice, regularPrice);
        }, 0);
        setMaxAmount(maxAmount);
      }
     

      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)

      }
    }
    fetch()
  }, [reload, params])

  useEffect(()=>{

  },)

 

  const handlePagination = (pageNo)=>{
    setPagination(prv=>({...prv, pageNo}))
    setReload(rl=>!rl)
    window.scrollTo({ top: 0, behavior: "smooth" });

  }





  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='border-r border-r-gray-300 hidden md:block'>
        <div className="w-52 pr-2 flex flex-col gap-4">
      <Filter maxAmount={maxAmount}/>
        
        </div>
      </div>
      <div className='flex-1'>
        <div>
            <CustomSpinner spinning={loading} >
         <TitleWithSort Title="Products" setProducts={setProducts}/>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
            {products?.map((product, idx) => (
              <ProductCard
                key={idx}
                Id={product.id}
                Brand={product?.brand}
                Title={product?.name}
                Category={product?.category}
                SalePrice={product?.salePrice}
                RegularPrice={product?.regularPrice}
                ImageUrl={product?.imageUrl}
                createdAt={product?.createdAt}
                Slug={product?.slug}
                CustomLabel={product.customLabel}

              />
            ))}
          </div>
          <div className="flex flex-row justify-end mt-2 md:mt-4">

            {pagination?.element}
          </div>
          </CustomSpinner>
        </div>
      </div>
    </div>
  )
}

export default Page