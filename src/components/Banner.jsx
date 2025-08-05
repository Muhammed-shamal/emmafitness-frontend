'use client'
import Image from 'next/image'
import Link from 'next/link'
import { bannerUrl } from '../utility/api/constant'

export default function Banner({ image, title, description }) {
  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden mt-2 mb-3">
      {/* Background Image */}
      <Image
        src={`${bannerUrl}/${image}`}
        alt="Fitness Banner"
        width={1920}
        height={800}
        priority
        className="object-center object-cover brightness-75 transition-all duration-300 hover:brightness-100"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="text-white space-y-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl">
            {description}
          </p>
          <Link href="/products">
            <button className="bg-secondary hover:bg-white hover:text-secondary transition-all px-6 py-3 mt-5 text-white font-semibold rounded-full">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
