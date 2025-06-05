'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Banner() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden mt-2 mb-3">
      {/* Background Image */}
      <Image
        src="/fitness-banner.webp"
        alt="Fitness Banner"
        layout="fill"
        objectFit="cover"
        priority
        className="brightness-75"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="text-white space-y-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Elevate Your Fitness Journey
          </h1>
          <p className="text-lg md:text-xl">
            Shop premium gym equipment, expert-picked just for you. Fast delivery in Dubai & Sharjah.
          </p>
          <Link href="/products">
            <button className="bg-secondary hover:bg-white hover:text-secondary transition-all px-6 py-3 text-white font-semibold rounded-full">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
