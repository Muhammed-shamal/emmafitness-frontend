import Image from "next/image"
import Link from "next/link"

function SmallBanners({BannerImage=[]}) {
  return (
    <div className="flex flex-col md:flex-row  gap-2 md:gap-4">
        {
            BannerImage?.map((banner, i)=>(

               <Link key={i} href={banner?.attributes?.caption || "#"} className="w-full"><Image  src={`${banner?.attributes?.url}`} width={500} height={500} alt="Banners"/></Link> 
            ))
        }
    </div>
  )
}

export default SmallBanners