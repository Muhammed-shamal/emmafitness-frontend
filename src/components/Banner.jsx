'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

const images = [
  { id: 1, redirect: '/products', image: "/gallery/banner1.jpg" },
  { id: 2, redirect: '/trending/products', image: "/gallery/banner2.jpg" },
  { id: 3, redirect: '/featured/products', image: "/gallery/banner3.jpg" }

]

export default function Banner() {
  const fallbackImage = "/gallery/banner2.jpg";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Set up auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden mt-2 mb-3">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Link href={image.redirect}>
              <Image
                src={image.image || fallbackImage}
                alt={`Fitness Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-center object-cover brightness-75"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

