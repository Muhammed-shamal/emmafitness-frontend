'use client'
import { useEffect, useState } from "react"
import fetchApi from "../../utility/api/fetchApi"
import CustomSpinner from '../../components/global/CustomSpinner'
import {  useSearchParams } from 'next/navigation'
import PaginationButton from "../../components/products/PaginationButton"
import ProductList from '../../components/products/ProductsList'

function Page() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
  const [reload, setReload] = useState(false)

  const router = useSearchParams()
  const terms = router.get('term')
  useEffect(() => {
    setLoading(true)
    fetchApi({ URI: `public/products?filters[$or][0][Name][$containsi]=${terms}&filters[$or][1][Full_Description][$containsi]=${terms}&filters[$or][2][Short_Description][$containsi]=${terms}&populate=customLabel&populate=category&populate=brand&sort[createdAt]=desc&&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
      .then((data) => {
        setProducts(data)

      }).finally(() => setLoading(false))
  }, [terms, reload])


  return (
    <CustomSpinner spinning={loading}>

      <div className='container mb-2 md:mb-4'>

        <ProductList products={products?.data} />
        <PaginationButton reload={setReload} setPagination={setPagination} meta={products?.meta} />

      </div>
    </CustomSpinner>
  )
}

export default Page