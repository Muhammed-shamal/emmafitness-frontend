'use client'
import Image from "next/image"
import Title from "../global/Title"
import { useEffect, useRef, useState } from "react"
import ScrollButton from "../global/ScrollButton"
import Link from "next/link"
import fetchApi from "../../utility/api/fetchApi"
import CustomSpinner from "../global/CustomSpinner"

export const dynamic = 'force-dynamic';

function CategoryList() {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [startX, setStartX] = useState(null)
    const ref = useRef(null)


    

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX)
      };
    
      const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    
  
      const handleMouseMove = (e) => {
        if (isMouseDown){
            ref.current.scrollTo({
                left: startX > e.pageX ? (ref.current.scrollLeft + e.pageX)*0.9: (ref.current.scrollLeft - e.pageX)-20,
                behavior: "smooth",
            })
        }
        
      };

   

    useEffect(() => {
        setLoading(true)
        const fetch = async () => {
            const result = await fetchApi({ URI: "Categories?populate=*&sort=Order&pagination[limit]=100" }).catch(e=>console.log(e)).finally(()=>setLoading(false)) || null
            setCategory(result?.data?.map(dt => ({
                label: dt?.attributes?.Name,
                img: dt?.attributes?.Photo?.data?.attributes?.url ? `${dt?.attributes?.Photo?.data?.attributes?.url}` : "/product-placehold.png",
                slug: dt?.attributes?.slug
            })))
        }
        fetch()
    }, [])
    return (
        <CustomSpinner spinning={loading}>
            <Title title="Top Categories" />
            <div className="relative">
                <ScrollButton Ref={ref} />

                <div ref={ref} 
                className="flex flex-row gap-2 md:gap-4  w-fits overflow-x-auto hide-scrollbar"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                >

                    {
                        category?.map((ct, idx) => (
                            <Link href={`/category/${ct?.slug}`} key={idx} className="flex justify-center flex-col items-center  flex-shrink-0">
                                <Image className=" h-20 w-20 md:h-28 md:w-28 rounded-full bg-red-300 object-cover border-gray-300 border-4 flex justify-center items-center "
                                    src={ct?.img || "/"}
                                    width={150}
                                    height={150}
                                    alt={ct.label} /> 
                                <h3 className="font-bold text-sm">{ct?.label}</h3>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </CustomSpinner>
    )
}

export default CategoryList