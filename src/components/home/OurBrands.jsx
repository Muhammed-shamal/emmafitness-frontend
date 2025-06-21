'use client'

import { useEffect, useRef, useState } from "react";
import ScrollButton from '../global/ScrollButton'
import Image from "next/legacy/image";
import fetchApi from "../../utility/api/fetchApi";
import Link from "next/link";
import { brandUrl } from "../../utility/api/constant";

function OurBrands() {
  const ref = useRef(null)
  const [data, setData] = useState([])
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(null)

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX)
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };


  const handleMouseMove = (e) => {
    if (isMouseDown) {
      ref.current.scrollTo({
        left: startX > e.pageX ? (ref.current.scrollLeft + e.pageX) * 0.9 : (ref.current.scrollLeft - e.pageX) - 20,
        behavior: "smooth",
      })
    }

  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchApi({ URI: 'public/brands?populate=*&sort=updatedAt&pagination[limit]=100' }).catch(e => console.log(e))
      setData(result?.data?.map(brand => (
        {
          url: brandUrl + '/' + brand?.logo,
          alt: brand?.name,
          slug: "/brand/" + brand?.slug
        }
      )))
    }

    fetchData()
  }, [])

  return (
    <div className="relative ">
      <ScrollButton Ref={ref} />
      <div ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="max-w-[90vw] overflow-x-scroll flex gap-2 md:gap-4 ease-in-out hide-scrollbar">
        {
          data && data?.map((item, idx) =>
            <Link key={idx} href={item?.slug} className="h-14 w-16 md:h-20 md:w-36  object-cover p-2 flex items-center justify-center border-gray-200 border bg-gray-100 flex-shrink-0">
              <Image className="mix-blend-multiply" key={idx} src={item?.url ? item?.url : "/#"} alt={item?.alt} width={200} height={120} />
            </Link>
          )
        }

      </div>
    </div>
  )
}

export default OurBrands