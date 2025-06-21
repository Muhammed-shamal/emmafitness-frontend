'use client'
import { useSearchParams } from 'next/navigation'
import { CategoryList } from '../../components/home'
import Filter from '../../components/products/Filter'
import ProductList from '../../components/products/ProductsList'
import fetchApi from '../../utility/api/fetchApi'
import useFilter from '../../utility/useFilter'
import { useEffect, useState } from 'react'
import CustomSpinner from '../../components/global/CustomSpinner'
import PaginationButton from '../../components/products/PaginationButton'

function Page() {
  const params = useSearchParams()
  const filter = useFilter()

  const [result, setResult] = useState({})
  const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    fetchApi({ URI: `public/products?${filter({ params })}&populate=customLabel&populate=category&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
      .then(res => {
        console.log("res is in fetch products with filter",res)
        setResult(res)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        console.log(e)
      })
  }, [params, reload])



  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='hidden md:block border-r border-r-gray-300'>
        <Filter categories={false} />
      </div>
      <div className='flex-1'>
        <div className='w-full md:w-[70vw]  p-2 bg-white max-h-52 overflow-hidden'>
          <CategoryList />
        </div>
        <CustomSpinner spinning={loading}>

          <ProductList products={result?.data} />

          <PaginationButton reload={setReload} setPagination={setPagination} meta={result?.meta} />
        </CustomSpinner>
      </div>
    </div>
  )
}

export default Page


