import Image from 'next/image'

function SocialIcon({width=15, height=8}) {
  return (
    <div className='flex flex-row gap-4 items-center '>
    <a className='text-secondary' href='#' target='_blank'>
        <Image src="/icons/fb.svg" width={width} height={height} alt='social icons' />
    </a>
    <a className='text-secondary' href='#' target='_blank'>
        <Image src="/icons/insta.svg" width={width} height={height} alt='social icons' />
    </a>
    <a className='text-secondary' href='#' target='_blank'>
        <Image src="/icons/tiktok.svg" width={width} height={height} alt='social icons' />
    </a>

</div>
  )
}

export default SocialIcon