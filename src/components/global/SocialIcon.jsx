import Image from 'next/image'

function SocialIcon({width=15, height=8}) {
  return (
    <div className='flex flex-row gap-4 items-center '>
    <a className='text-secondary' href='https://www.facebook.com/profile.php?id=61575439193333' target='_blank'>
        <Image src="/icons/fb.svg" width={width} height={height} alt='social icons' />
    </a>
    <a className='text-secondary' href='https://www.instagram.com/emmafitness.ae/' target='_blank'>
        <Image src="/icons/insta.svg" width={width} height={height} alt='social icons' />
    </a>
    <a className='text-secondary' href='https://www.tiktok.com/@emmafitness33998?_t=ZS-8zPdM8kPPlf&_r=1' target='_blank'>
        <Image src="/icons/tiktok.svg" width={width} height={height} alt='social icons' />
    </a>

</div>
  )
}

export default SocialIcon