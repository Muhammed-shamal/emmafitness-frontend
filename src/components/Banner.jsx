'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

const images = [
  {
    id: 1,
    redirect: '/products',
    desktopImage: '/gallery/banner1.jpg',
    mobileImage: '/gallery/mobile-banner1.jpg',
  },
  {
    id: 2,
    redirect: '/brand',
    desktopImage: '/gallery/banner2.jpg',
    mobileImage: '/gallery/banner2.jpg',
  },
  {
    id: 3,
    redirect: '/featured/products',
    desktopImage: '/gallery/banner3.jpg',
    mobileImage: '/gallery/banner3.jpg',
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    
    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(checkIfMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, images.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, images.length]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const fallbackImage = isMobile ? "/gallery/banner3.jpg" : "/gallery/banner2.jpg";

  return (
    <section className="relative w-full h-[250px] xs:h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden mt-2 mb-3 bg-gray-100">
      {/* Carousel Container */}
      <div 
        className="relative w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              index === currentSlide 
                ? 'translate-x-0 opacity-100 z-10' 
                : index < currentSlide 
                  ? '-translate-x-full opacity-0 z-0'
                  : 'translate-x-full opacity-0 z-0'
            }`}
          >
            <Link 
              href={image.redirect} 
              className="block w-full h-full active:scale-95 transition-transform"
              aria-label={`Navigate to ${image.redirect}`}
            >
              <Image
                src={isMobile ? image.mobileImage : image.desktopImage}
                alt={`Fitness Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
                className="object-cover select-none"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
                draggable={false}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on very small screens, visible on tablets and up */}
      <button 
        onClick={prevSlide} 
        className="hidden sm:flex absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all z-20 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide} 
        className="hidden sm:flex absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full transition-all z-20 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced Indicator Dots */}
      <div className="absolute bottom-3 xs:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 backdrop-blur-sm bg-black/30 rounded-full px-3 py-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-6 md:w-8' 
                : 'bg-white/60 hover:bg-white/80 w-2 md:w-3'
            } h-2 md:h-3 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter - Like modern e-commerce apps */}
      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20 backdrop-blur-sm">
        {currentSlide + 1} / {images.length}
      </div>

      {/* Progress Bar for Auto-advance */}
      <div className="absolute top-0 left-0 w-full h-1 z-20">
        <div 
          className="h-full bg-white/80 transition-all duration-5000 ease-linear"
          style={{ 
            width: isTransitioning ? '100%' : '0%',
            transition: isTransitioning ? 'width 5s linear' : 'none'
          }}
        />
      </div>
    </section>
  );
}