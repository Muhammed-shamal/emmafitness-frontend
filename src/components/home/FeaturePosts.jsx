'use client'
import Image from 'next/image'

function FeaturePosts({photos=[]}) {
  return (
    <div className='flex flex-row gap-2 md:gap-4'>
        {
         photos?.map(({attributes}, idx)=>(
                <div className='w-full' key={idx}>
                    <Image
                    className='w-full'
                    key={idx} 
                    src={attributes?.url ? attributes?.url : "/product-placehold.png"} 
                    alt={attributes?.name} 
                    width={300} 
                    height={300}/>
                </div>
            ))
        }
    </div>
  )
}

export default FeaturePosts