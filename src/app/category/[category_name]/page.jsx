'use client'
import Filter from '../../../components/products/Filter'
import fetchApi from '../../../utility/api/fetchApi'
import ProductsList from '../../../components/products/ProductsList'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFilter from '../../../utility/useFilter'
import CustomSpinner from '../../../components/global/CustomSpinner'
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
    fetchApi({ URI: `products?${filter({ params: searchparams })}&populate=custom_label&filters[category][slug][$eq]=${params?.category_name}&populate=Feature_Photo,category&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo || 1}&pagination[pageSize]=${pagination?.pageSize || 20}` })
      .then(res => {
        setProducts(res)

        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        console.log(e)
      })
  }, [searchparams, reload])

  return (
    <div className='container flex flex-row gap-4 my-4'>
      <div className='border-r border-r-gray-300'>
        <Filter categories={false} />
      </div>
      <CustomSpinner spinning={loading}>

        <ProductsList products={products?.data} />

        <PaginationButton meta={products?.meta} setPagination={setPagination} reload={setReload} />
      </CustomSpinner>

    </div>
  )
}

export default Page

