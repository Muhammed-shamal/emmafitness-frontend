'use client'
import Image from "next/legacy/image"
import Link from "next/link"
import { useEffect, useState } from "react"

function FeatureBanner({BigScreen=[], Mobile=[]}) {
  
  const [banner, setBanner]= useState(<></>)
  useEffect(()=>{

    const isMobile = window.innerWidth <=768 ? true : false
    setBanner(
      isMobile && Mobile ?
      <Link href={Mobile?.attributes?.caption || "#"}><Image src={`${Mobile?.attributes?.url||"/"}`} width={1440} height={200} alt="Banners"/></Link>
      : BigScreen && <Link href={BigScreen?.attributes?.caption || "#"}><Image src={`${BigScreen?.attributes?.url||"/"}`} width={1440} height={350} alt="Banners"/></Link>
    )
  },[BigScreen, Mobile])

  return (
   banner
  )
}
 
export default FeatureBanner