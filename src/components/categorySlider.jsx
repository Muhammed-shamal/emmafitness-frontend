'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fetchApi from '../utility/api/fetchApi';
import { categoryUrl } from '../utility/api/constant';
import Image from 'next/image';
import Link from 'next/link';

export default function CategorySlider() {

  const [loading, setLoading] = useState(true);
  const [bannerCategories, setBannerCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isHoveringSubcategory, setIsHoveringSubcategory] = useState(false);
  const subcategoryRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchApi({ URI: 'public/banner-categories' })
      .then(res => {
        const data = res?.data || [];
        setBannerCategories(data);
        if (data.length > 0) {
          setSelected(data[0]); // Set default selected category after fetch
        }
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // Auto-scroll to selected category
  useEffect(() => {
    if (selected) {
      const element = document.getElementById(`category-${selected.id}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selected]);

  // Close subcategories when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subcategoryRef.current && !subcategoryRef.current.contains(event.target)) {
        setActiveCategory(null);
        setHoveredCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryHover = (cat) => {
    if (!isHoveringSubcategory) {
      setHoveredCategory(cat);
    }
  };

  const handleCategoryClick = (cat) => {
    if (activeCategory?.id === cat.id) {
      setActiveCategory(null);
    } else {
      setActiveCategory(cat);
      setHoveredCategory(cat);
    }
  };

  const handleSubcategoryEnter = () => {
    setIsHoveringSubcategory(true);
  };

  const handleSubcategoryLeave = () => {
    setIsHoveringSubcategory(false);
    // Only clear hovered category if not actively clicked
    if (!activeCategory) {
      setHoveredCategory(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Shop by Category</h1>
          <p className="text-gray-600 mt-2">Browse our wide range of products</p>
        </div>

        <section className="px-4 relative">
          {/* Main Categories - Horizontal Scroller */}
          <div className="relative">
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
              {bannerCategories.map((cat) => (
                <div key={cat.id} className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center min-w-[120px] p-4 rounded-2xl cursor-pointer transition-all duration-300"
                    onMouseEnter={() => handleCategoryHover(cat)}
                    onMouseLeave={() => !isHoveringSubcategory && setHoveredCategory(null)}
                    onClick={() => handleCategoryClick(cat)}
                    animate={{
                      backgroundColor: (activeCategory?.id === cat.id || hoveredCategory?.id === cat.id) 
                        ? '#f0f9ff' 
                        : '#ffffff',
                      border: (activeCategory?.id === cat.id || hoveredCategory?.id === cat.id) 
                        ? '1px solid #e0f2fe' 
                        : '1px solid #f3f4f6'
                    }}
                  >
                    <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden">
                        <Image
                          src={`${categoryUrl}/${cat.image}`}
                          alt={cat.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 56px) 100vw, 56px"
                        />
                      </div>
                      
                      {(hoveredCategory?.id === cat.id || activeCategory?.id === cat.id) && (
                        <motion.div
                          className="absolute inset-0 bg-blue-100 bg-opacity-30 rounded-full"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        />
                      )}
                    </div>
                    
                    <span className="text-sm font-medium text-center text-gray-800">
                      {cat.name}
                    </span>
                    
                    {cat.children && cat.children.length > 0 && (
                      <motion.div 
                        className={`w-5 h-5 mt-2 flex items-center justify-center rounded-full transition-colors
                          ${(activeCategory?.id === cat.id || hoveredCategory?.id === cat.id) 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-500'}`}
                        animate={{ rotate: (activeCategory?.id === cat.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Gradient fade effect on sides for scroll indication */}
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>

          {/* Subcategories with enhanced animation */}
          <AnimatePresence>
            {(hoveredCategory?.children || activeCategory?.children) && (
              <motion.div
                ref={subcategoryRef}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto',
                  marginTop: '1.5rem',
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0, 
                  marginTop: 0,
                  transition: { duration: 0.2 }
                }}
                className="bg-blue-50 rounded-2xl p-5 overflow-hidden border border-blue-100"
                onMouseEnter={handleSubcategoryEnter}
                onMouseLeave={handleSubcategoryLeave}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {(hoveredCategory || activeCategory)?.name}
                    {(hoveredCategory?.children?.length > 0 || activeCategory?.children?.length > 0) && ' Subcategories'}
                  </h3>
                  <button 
                    onClick={() => {
                      setActiveCategory(null);
                      setHoveredCategory(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-blue-100"
                    aria-label="Close subcategories"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {(hoveredCategory?.children || activeCategory?.children).map((sub, index) => (
                    <Link href={`/productByCategory/${encodeURIComponent(sub.id)}`} key={sub.id}>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: index * 0.05, duration: 0.2 }
                        }}
                        whileHover={{ 
                          scale: 1.03,
                        }}
                        className="bg-white p-4 rounded-xl text-center transition-all border border-gray-100 cursor-pointer"
                      >
                        <div className="relative w-14 h-14 mx-auto mb-3">
                          <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                              src={`${categoryUrl}/${sub.image}`}
                              alt={sub.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 56px) 100vw, 56px"
                            />
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-blue-50 bg-opacity-20 rounded-full"
                            whileHover={{ 
                              scale: 1.1,
                              transition: { type: 'spring', stiffness: 400 }
                            }}
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {sub.name}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="mt-12 text-center text-gray-600">
          <p>Hover or click on a category to see its subcategories</p>
          <p className="text-sm mt-2">The subcategory panel will stay open when interacting with it</p>
        </div>
      </div>
    </div>
  );
}
