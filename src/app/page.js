import Banner from '../components/Banner'
import CategorySlider from '../components/categorySlider'
import ProductSlider from '../components/productSlider'
import TrendingSection from '../components/TrendingSection'
import OurBrands from '../components/home/OurBrands'
import FeaturedProducts from '../components/home/FeaturedProducts'
import NewProducts from '../components/home/NewProducts'
import Title from '../components/global/Title'
import SubBanner from '../components/subBanner'
import MovingBanner from '../components/movingBanner'
import FilteredCategories from '../components/filteredCategories'
import FAQ from '../components/faq'
import Reviews from '../components/googleReviews'
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
  title: 'Top Fitness Brands at Competitive Prices: Shop Now at Emma Fitness in Dubai & Sharjah',
  description: 'Emma Fitness provides premium fitness equipment for homes and gyms in Dubai & Sharjah. Shop top brands, get expert advice, and enjoy exceptional service.',
}

// 👇 Server-side data fetching
async function fetchSafeApi(endpoint) {
  try {
    const res = await fetch(`http://localhost:1000/api/${endpoint}`, {
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
  ])

  return (
    <main className='container space-y-2 md:space-y-4'>
      {banner && <Banner title={banner.title} description={banner.description} image={banner.image} />}
      <CategorySlider />
      {trendingProducts.length > 0 && (<>
        <Title titlePart1={'Top Trending Products'} titlePart2={'For You'} viewAllUrl='/trending/products' />
        <section>
          <TrendingSection products={trendingProducts} />
        </section>
      </>)}

      {/* <Title titlePart1={'Shop by brands'} titlePart2={'For You'} viewAllUrl='/products' /> */}
      <section><OurBrands /></section>

      {featuredProducts.length > 0 && (
        <>
          <Title titlePart1={'Featured Products'} titlePart2={'For You'} viewAllUrl='/featured/products' />
          <section>
            <FeaturedProducts products={featuredProducts} />
          </section>
        </>
      )}

      <ProductSlider />

      {newArrivals.length > 0 && (<>
        <Title titlePart1={'New'} titlePart2={'Products'} />
        <section>
          <NewProducts products={newArrivals} />
        </section>
      </>)}

      <SubBanner />

      <FilteredCategories />
      <MovingBanner />
      <Reviews />

      <div className='p-5'>
        <h2 className='text-center font-sans text-2xl'>
          We Are Active Fitness Store
        </h2>
        <p>
          With over a decade of experience powering the UAE’s fitness movement, Active Fitness Store has become more than just a retailer — we’re a trusted partner in how the nation trains.
        </p>
        <p>
          From compact home setups to full-scale commercial gyms, we’ve helped thousands across Dubai, Abu Dhabi, Sharjah, Al Ain, and beyond build workout spaces that perform. What started as a focused online fitness store has evolved into one of the UAE’s most respected fitness equipment brands — driven by expertise, service, and a deep understanding of what it means to move better.
        </p>
        <div style={{ maxWidth: 600, margin: '50px auto', lineHeight: '1.6' }}>
          <h1>Frequently Asked Questions</h1>
          <FAQ />
        </div>
      </div>
    </main>
  )
}
