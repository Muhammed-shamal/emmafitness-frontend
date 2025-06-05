import Image from 'next/image'

export default function ProductCard({ brand, title, price, oldPrice, image }) {
  return (
    <div className="bg-[#fdfcf9] border rounded-md overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-[250px] w-full">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-md font-semibold text-gray-700">{brand}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold text-lg">SAR {price}</span>
          <span className="line-through text-gray-400 text-sm">SAR {oldPrice}</span>
        </div>
      </div>
    </div>
  )
}
