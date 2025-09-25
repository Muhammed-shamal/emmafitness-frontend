'use client'
import { Checkbox, Input, Slider } from "antd"
import { memo, useEffect, useState } from "react"
import Title from '../global/Title'
import fetchApi from "../../utility/api/fetchApi"
import { useRouter, usePathname } from 'next/navigation'

function Filter({ categories = true, brand = true, maxAmount = 20000 }) {
  const [category, setCategory] = useState([])
  const [brands, setBrand] = useState([])
  const [filters, setFilters] = useState({})
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await Promise.all([brand ? fetchApi({ URI: 'brands' }) : [], categories ? fetchApi({ URI: 'categories' }) : []])
        setBrand(result?.[0]?.data?.map(prdct => ({
          value: prdct?.id,
          label: prdct?.attributes?.Name,
          slug: prdct?.attributes?.Slug
        })))
        setCategory(result?.[1]?.data?.map(prdct => ({
          value: prdct?.id,
          label: prdct?.attributes?.Name,
          slug: prdct?.attributes?.Slug
        })))

      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [])


  useEffect(() => {
    const filterArray = []
    let startIndex = filterArray.length
    if (filters?.category?.length > 0) {
      filterArray.push(...filters?.category?.map((it, idx) => `filters[category][id][$in][${idx}]=${it}`))
    }
    if (filters?.brands?.length > 0) {
      startIndex = filterArray.length
      filterArray.push(...filters?.brands?.map((it, idx) => `filters[brand][id][$in][${startIndex + idx}]=${it}`))
    }
    if (filters?.priceRange?.length > 0) {
      filterArray.push(...filters?.priceRange?.map((it, idx) => `filters[Sale_Price][$between]=${it}`))
    }
    // applyFilter(filterArray.join('&')||"")
    router.push(`?${filterArray.join('&')}`)
  }, [filters])




  return (
    <div className="hidden md:flex w-52 pr-2  flex-col gap-4">

      {/* Price range */}
      <div>
        <Title titlePart2="Price range" type="small" />
        <Slider range onChange={(e) => setFilters(pr => ({ ...pr, priceRange: e }))} value={filters?.priceRange} min={0} max={maxAmount} />
        <div className="flex flex-row items-center gap-2">
          <label className="text-xs">From</label><Input onChange={(e) => setFilters(prv => ({ ...prv, priceRange: [e.target.value, filters?.priceRange?.[1]] }))} value={filters?.priceRange?.[0]} />
          <label className="text-xs">To</label><Input onChange={(e) => setFilters(prv => ({ ...prv, priceRange: [filters?.priceRange?.[0], e.target.value] }))} value={filters?.priceRange?.[1]} />
        </div>
      </div>

      {/* Category */}
      {
        brand &&
        <div>
          <Title titlePart2="Brand" type="small" />
          <div>
            <Checkbox.Group className="flex flex-col" options={brands} onChange={(e) => setFilters(prv => ({ ...prv, brands: e }))} />
          </div>
        </div>
      }

      {/* Category */}
      {categories && <div>
        <Title titlePart2="Category" type="small" />
        <div >
          <Checkbox.Group className="flex flex-col" options={category} onChange={(e) => setFilters(prv => ({ ...prv, category: e }))} />
        </div>

      </div>}

    </div>
  )
}

export default memo(Filter)