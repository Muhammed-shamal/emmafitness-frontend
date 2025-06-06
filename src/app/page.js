
import Title from '../components/global/Title'
// import { NewProducts, FeaturedBanner, FeaturedProducts, MainSlider, SmallBanners, OurBrands } from '../components/home/index'
import fetchApi from '../utility/api/fetchApi'
import Banner from '../components/Banner.jsx'
import TrendingSection from '../components/TrendingSection.jsx'
import axios from 'axios';
import { baseUrl } from '../utility/api/constant';

export const metadata = {
  title: 'Top Fitness Brands at Competitive Prices: Shop Now at Emma Fitness in Dubai & Sharjah',
  description: 'Emma Fitness provides premium fitness equipment for homes and gyms in Dubai & Sharjah. Shop top brands, get expert advice, and enjoy exceptional service.',
};

export default async function Page() {
  // const data = await fetchApi({ URI: "home-slider?populate=*" });

  const data = await fetchApi({ URI: "addresses"});
  // const res = await axios.get(`${baseUrl}/api/addresses`)
    
   console.log('result are ', data);

  return (
    <main className='container space-y-2 md:space-y-4'>
      <Banner />
      <TrendingSection />
      {/* {(data?.data?.attributes?.Main_Slider_1500x450?.data.length > 0 ||
        data?.data?.attributes?.Mobile_Main_Slider_1368x550?.data.length > 0) && (
        <section className='max-h-96 overflow-hidden mt-4'>
          <MainSlider
            BigScreen={data?.data?.attributes?.Main_Slider_1500x450?.data}
            Mobile={data?.data?.attributes?.Mobile_Main_Slider_1368x550?.data}
          />
        </section>
      )} */}

      {/* <Title titlePart1={'Deals'} titlePart2={'For You'} viewAllUrl='/products' /> */}

      {/* {data?.data?.attributes?.small_banners?.data && (
        <section>
          <SmallBanners BannerImage={data?.data?.attributes?.small_banners?.data} />
        </section>
      )} */}

      {/* <section><OurBrands /></section> */}
      {/* <section><FeaturedProducts /></section> */}

      {/* {data?.data?.attributes?.Banner_1440x200?.data && (
        <section>
          <FeaturedBanner
            BigScreen={data?.data?.attributes?.Banner_1440x200?.data}
            Mobile={data?.data?.attributes?.Banner_Mobile_1440x350?.data}
          />
        </section>
      )} */}

      {/* <Title titlePart1={'Prime'} titlePart2={'Brand Deals'} viewAllUrl='/products' /> */}
      {/* {data?.data?.attributes?.small_banners_bottum?.data?.length > 0 && (
        <section>
          <SmallBanners BannerImage={data?.data?.attributes?.small_banners_bottum?.data} />
        </section>
      )} */}

      {/* <Title titlePart1={'New'} titlePart2={'Products'} viewAllUrl='/products' /> */}
      {/* <section><NewProducts /></section> */}
    </main>
  );
}

