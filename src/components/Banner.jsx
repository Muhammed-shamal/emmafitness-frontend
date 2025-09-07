'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

const images = [
  {
    id: 1,
    redirect: '/products',
    desktopImage: '/gallery/banner1.jpg',
    mobileImage: '/gallery/smallBanner1.png',
  },
  {
    id: 2,
    redirect: '/brand',
    desktopImage: '/gallery/banner2.jpg',
    mobileImage: '/gallery/smallBanner3.png',
  },
  {
    id: 3,
    redirect: '/featured/products',
    desktopImage: '/gallery/banner3.jpg',
    mobileImage: '/gallery/smallBanner2.png',
  },
];


export default function Banner() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkIfMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

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


  const fallbackImage = isMobile ? "/gallery/smallBanner3.png" : "/gallery/banner2.jpg";
  return (
    <section className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden mt-2 mb-3">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Link href={image.redirect} className="block w-full h-full">
              <Image
                src={isMobile ? image.mobileImage : image.desktopImage}
                alt={`Fitness Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover"
                onError={(e) => {
                  // Fallback in case image fails to load
                  e.target.src = isMobile ? "/gallery/smallBanner3.png" : "/gallery/banner2.jpg";
                }}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide} 
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all z-20"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all z-20"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

