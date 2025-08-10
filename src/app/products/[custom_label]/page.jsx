'use client'
import Filter from '../../../components/products/Filter'
import fetchApi from '../../../utility/api/fetchApi'
import ProductsList from '../../../components/products/ProductsList'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFilter from '../../../utility/useFilter'
import CustomSpinner from '../../../components/global/CustomSpinner'
import PaginationButton from '../../../components/products/PaginationButton'
import { FeaturedBanner } from '../../../components/home'


function Page() {

  const [products, setProducts] = useState({})
  const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
  const [banner, setBanner] = useState()
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const filter = useFilter()
  const params = useParams()
  const searchparams = useSearchParams()


  useEffect(() => {
    setLoading(true)

    fetchApi({ URI: `custom-labels?filter[$eq][slug]=${params?.customLabel}&populate=Banner_1440x250` }).then(({ data }) => {
      setBanner(data[0])
    })

    fetchApi({ URI: `public/products?${filter({ params: searchparams })}&filters[customLabel][slug][$eq]=${params?.customLabel}&populate=customLabel&populate=category&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo || 1}&pagination[pageSize]=${pagination?.pageSize || 20}` })
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
      {/* <div className='border-r border-r-gray-300'>
        <Filter categories={false} />
      </div> */}
      <CustomSpinner spinning={loading}>
        {
          banner?.attributes?.Banner_1440x250?.data &&
          <FeaturedBanner BigScreen={banner?.attributes?.Banner_1440x250?.data} />
        }

        <ProductsList products={products?.data} />

        <PaginationButton meta={products?.meta} setPagination={setPagination} reload={setReload} />
      </CustomSpinner>

    </div>
  )
}

export default Page

