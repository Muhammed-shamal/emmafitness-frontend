'use client'
import { ArrowLeftOutlined, ArrowRightOutlined, SlidersOutlined } from "@ant-design/icons"
import { Carousel } from "antd"
import Image from "next/legacy/image"
import {  useRef } from "react"

function ImageSection({ Images }) {

    const changeCarousel = (index) => {
        carousel.current.goTo(index)
    }

    const carousel = useRef()


    return (
        <div className="relative flex-1 flex justify-center ">
            
                <Carousel ref={carousel}   className="max-w-xs md:max-w-md lg:max-w-lg " dots={false}  >

                    {
                        Images?.map((img, idx) => (
                            <div key={idx}>
                                <Image src={img?.url ? img?.url : "/product-placehold.png"} className="object-contain p-2  max-h-96 " alt={img?.alt} width={450} height={450} />
                            </div>
                        ))
                    }
                </Carousel>

            <div className="flex gap-4 absolute bottom-6">

                <ArrowLeftOutlined className="border border-gray-200 rounded-full p-3" onClick={()=>carousel.current.next()}/>
                <ArrowRightOutlined  className="border border-gray-200 rounded-full p-3" onClick={()=>carousel.current.prev()}/>
            </div>

            <div className="absolute left-4 flex flex-row md:flex-col gap-2 flex-wrap">
                {Images?.map((img, index) =>
                <div key={index} className="h-6 w-6 md:h-16 object-cover md:w-h-20 rounded md:w-16 border-gray-200 border">
                    <Image key={index} onClick={() => changeCarousel(index)} src={img?.url ? img?.url : "/product-placehold.png"} className=" hover:scale-110 cursor-pointer" alt={img.title} width={80} height={80} />
                </div>
                )}

            </div>

        </div>
    )
}

export default ImageSection