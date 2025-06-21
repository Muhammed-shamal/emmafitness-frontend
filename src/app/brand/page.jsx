'use client'
import { useEffect, useState } from "react"
import { OurBrands } from "../../components/home"
import Filter from "../../components/products/Filter"
import ProductsList from "../../components/products/ProductsList"
import fetchApi from "../../utility/api/fetchApi"
import PaginationButton from "../../components/products/PaginationButton"
import useFilter from "../../utility/useFilter"
import { useParams, useSearchParams } from "next/navigation"
import CustomSpinner from "../../components/global/CustomSpinner"

 function Page() {


  const [result, setResult] = useState({})
  const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const filter = useFilter()
  const searchparams = useSearchParams()

  
    useEffect(() => {
    setLoading(true)
    fetchApi({ URI: `public/products?${filter({ params: searchparams })}&populate=category&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
      .then(res => {
        setResult(res)

        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        console.log(e)
      })
  }, [searchparams, reload])

  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='hidden md:block border-r border-r-gray-300'>
        <Filter />
      </div>
      <div className='flex-1'>
        <div className='w-full md:w-[70vw] bg-white p-2'>
        <OurBrands/>
        </div>
        <CustomSpinner spinning={loading}>

        <ProductsList products={result?.data}/>
        <PaginationButton setPagination={setPagination} meta={result?.meta} reload={setReload}/>
        </CustomSpinner>
      </div>
    </div>
  )
}

export default Page