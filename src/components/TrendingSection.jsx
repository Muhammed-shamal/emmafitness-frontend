import ProductCard from './cards/productCard'

const dummyProducts = [
  {
    brand: 'AXOX Fitness',
    title: 'Track 3 Treadmill with Smart Display',
    price: 4495,
    oldPrice: 5185,
    image: '/products/axox-treadmill.jpg',
  },
  {
    brand: 'NordicTrack',
    title: 'GX LE Upright Bike',
    price: 4450,
    oldPrice: 4895,
    image: '/products/nordic-bike.jpg',
  },
  {
    brand: 'Rogue Fitness',
    title: 'V3.0 Echo Bike',
    price: 7284,
    oldPrice: 8590,
    image: '/products/rogue-bike.jpg',
  },
  {
    brand: 'Sole Fitness',
    title: 'F80-ENT Treadmill',
    price: 6495,
    oldPrice: 8495,
    image: '/products/sole-treadmill.jpg',
  },
]

export default function TrendingSection() {
  return (
    <section className="my-8 px-4 md:px-12">
      {/* Mini Banner */}
      <div className="w-full h-[100px] bg-gradient-to-r from-yellow-100 to-orange-200 flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-wider">
          TRENDING THIS <span className="text-orange-500">SUMMER</span>
        </h2>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {dummyProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  )
}
