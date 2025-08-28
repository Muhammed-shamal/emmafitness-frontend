import Banner from '../components/Banner'
import CategorySlider from '../components/categorySlider'
import ProductSlider from '../components/productSlider'
import TrendingSection from '../components/TrendingSection'
import OurBrands from '../components/home/OurBrands'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewProducts from '../components/home/NewProducts'
import Title from '../components/global/Title'
// import SubBanner from '../components/subBanner'
import OffersBanner from '../components/OfferBanner'
import SubBanner2 from '../components/subBanner2'
import SmallBanner from '../components/smallBanner'
import MovingBanner from '../components/movingBanner'
// import FilteredCategories from '../components/filteredCategories'
import SmallCards from '../components/smallCards';
import FAQ from '../components/faq'
import Reviews from '../components/googleReviews'
import HelpStayStrong from '../components/helpStayStrong'
import StorePage from '../components/stores'
import 'react-loading-skeleton/dist/skeleton.css'
import { Col, Row } from 'antd'
import { baseUrl } from '../utility/api/constant'

export const metadata = {
  title: 'Top Fitness Brands at Competitive Prices: Shop Now at Emma Fitness in Dubai & Sharjah',
  description: 'Emma Fitness provides premium fitness equipment for homes and gyms in Dubai & Sharjah. Shop top brands, get expert advice, and enjoy exceptional service.',
}


// 👇 Server-side data fetching
async function fetchSafeApi(endpoint) {
  try {
    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`API fetch failed: ${endpoint}`, err.message);
    return []; // return empty array as fallback
  }
}

export default async function Page() {
  // 👇 fetch server-side before render
  const [featuredProducts, newArrivals, banner, trendingProducts] = await Promise.all([
    fetchSafeApi('public/products/featured'),
    fetchSafeApi('public/products/new'),
    fetchSafeApi('public/banner'),
    fetchSafeApi('public/products/trending'),
    // fetchSafeApi('public/products/cheapest')
  ])

  return (
    <main className='container space-y-2 md:space-y-4'>
      {banner && <Banner title={banner.title} description={banner.description} image={banner.image} />}
      <div className='hidden sm:block'>
        <CategorySlider />
      </div>
      
      {trendingProducts.length > 0 && (<>
        <Title titlePart1={'Top Trending Products'} titlePart2={'For You'} viewAllUrl='/trending/products' />
        <section>
          <TrendingSection products={trendingProducts} />
        </section>
      </>)}


      <section><OurBrands /></section>

      {featuredProducts.length > 0 && (
        <>
          <Title titlePart1={'Featured Products'} titlePart2={'For You'} viewAllUrl='/featured/products' />
          <section>
            <FeaturedProducts products={featuredProducts} />
          </section>
        </>
      )}

      <OffersBanner />
      <ProductSlider />

      {newArrivals.length > 0 && (<>
        <Title titlePart1={'New'} titlePart2={'Products'} />
        <section>
          <NewProducts products={newArrivals} />
        </section>
      </>)}

      {/* <SubBanner /> */}
      <SmallBanner />
      {/* <SubBanner2 /> */}
      {/* <MovingBanner /> */}

      {/* {cheapest.length > 0 && <div style={{ padding: '40px 20px' }}>
        <Title titlePart1={'Small'} titlePart2={'Budget'} />
        <Row gutter={[24, 24]}>
          {cheapest.map((product, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <SmallCards product={product} />
            </Col>
          ))}
        </Row>
      </div>} */}

      {/* <HelpStayStrong /> currently comend because static */}

      <StorePage />
      <Reviews />

      <div className='p-5'>
        <h2 className='text-center font-sans text-2xl'>
          Emma Fitness Store
        </h2>
        <p>
          With over a decade of experience fueling the UAE’s fitness movement, Emma Fitness has grown beyond being just a retailer — we are your trusted partner in achieving your fitness goals.
        </p>
        <p>
          From compact home gyms to expansive commercial fitness centers, we’ve helped thousands of customers across Dubai, Abu Dhabi, Sharjah, Al Ain, and the entire UAE create workout spaces that inspire and perform. What began as a dedicated online fitness store has now become one of the UAE’s most reliable fitness equipment suppliers — backed by expertise, exceptional service, and a passion for helping you move better.
        </p>
        <p>
          At Emma Fitness, we don’t just sell equipment — we empower your fitness journey.
        </p>
        <p>📍 Located in Sharjah | Delivering Across the UAE</p>

        <div style={{ maxWidth: 600, margin: '50px auto', lineHeight: '1.6' }}>
          <h1>Frequently Asked Questions</h1>
          <FAQ />
        </div>
      </div>


      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5872586466508!2d55.4440232!3d25.284466299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f58681ae533f%3A0x791a34995fa3d39e!2sEmma%20Fitness%20Gym%20Equipments%20Commercial%20and%20Home!5e0!3m2!1sen!2sin!4v1754233183285!5m2!1sen!2sin"
        width="100%" height="600" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy='no-referrer-when-downgrade'></iframe>
    </main>
  )
}
