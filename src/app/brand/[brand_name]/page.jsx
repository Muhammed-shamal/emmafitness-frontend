'use client'
import { useEffect, useState } from 'react'
import Filter from '../../../components/products/Filter'
import useFilter from '../../../utility/useFilter'
import { useParams, useSearchParams } from 'next/navigation'
import fetchApi from '../../../utility/api/fetchApi'
import CustomSpinner from '../../../components/global/CustomSpinner'
import ProductsList from '../../../components/products/ProductsList'
import PaginationButton from '../../../components/products/PaginationButton'

function Page() {

  const [products, setProducts] = useState({})
  const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const filter = useFilter()
  const params = useParams()
  const searchparams = useSearchParams()



  useEffect(() => {
    setLoading(true)
    fetchApi({ URI: `products?${filter({ params: searchparams })}&filters[brand][slug][$eq]=${params?.brand_name}&populate=Feature_Photo,category&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
      .then(res => {
        setProducts(res)

      })
      .catch(e => {
        console.log(e)
      }).finally(() => {
        setLoading(false)

      })
  }, [searchparams, reload])

  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='border-r border-r-gray-300'>
        <Filter brand={false} />
      </div>


      <CustomSpinner spinning={loading}>

        <ProductsList products={products?.data} />

        <PaginationButton meta={products?.meta} setPagination={setPagination} reload={setReload} />
      </CustomSpinner>
    </div>
  )
}

export default Page