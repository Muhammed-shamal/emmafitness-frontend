'use client'
import { Carousel } from "antd"
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";


 function MainSlider({BigScreen=[], Mobile=[]}) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(()=>{
    setIsMobile(window.innerWidth <=768 ? true : false)
   
  },[])


  
  return (
    <Carousel autoplay >
      {
        isMobile && Mobile?.length > 0? 
        Mobile?.map((a, idx)=>(
         
          <Link href={a?.attributes?.caption || "#"} key={idx}>
         <Image className=" md:h-auto object-cover" width={1368} height={550} src={`${a?.attributes?.url}`} alt={idx} />
        </Link>
        ))
        :  BigScreen?.map((a, idx)=>(
         
          <Link href={a?.attributes?.caption || "#"} key={idx}>
         <Image className=" md:h-auto object-cover" width={1500} height={450} src={`${a?.attributes?.url}`} alt={idx} />
        </Link>
        ))
      }

  </Carousel>

  )
}

export default MainSlider


