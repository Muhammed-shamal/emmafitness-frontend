'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fetchApi from '../utility/api/fetchApi';
import { categoryUrl } from '../utility/api/constant';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from 'antd';

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
    <div className="min-h-screen bg-gradient-to-br py-12 px-4">
      <div className="mx-auto max-w-7xl rounded-3xl p-8 shadow-md border border-white/20">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent mb-3"
          >
            Explore Our Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Discover our wide range of products organized by category for easy browsing
          </motion.p>
        </div>

        <section className="px-4 relative">
          {/* Main Categories - Horizontal Scroller */}
          <div className="relative ">
            <div className="flex overflow-x-auto [--tw-space-x-reverse:0] space-x-[40px] pb-6 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {
                loading ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-32 p-5">
                    <Skeleton.Avatar active shape="circle" size={64} />
                    <Skeleton.Input style={{ marginTop: 12 }} active size="small" />
                  </div>
                )) :
                  bannerCategories.map((cat) => {
                    const isActive = activeCategory?.id === cat.id;
                    const isHovered = hoveredCategory?.id === cat.id;
                    const isActiveOrHovered = isActive || isHovered;

                    const content = (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center w-32 p-5 rounded-2xl cursor-pointer transition-all duration-300 relative shadow-sm group`}
                        onMouseEnter={() => handleCategoryHover(cat)}
                        onMouseLeave={() => !isHoveringSubcategory && setHoveredCategory(null)}
                        onClick={() => {
                          if (cat.children?.length > 0) {
                            handleCategoryClick(cat);
                          }
                        }}
                        animate={{
                          backgroundColor: isActiveOrHovered
                            ? 'rgba(59, 130, 246, 0.08)'
                            : 'rgba(255, 255, 255, 0.95)',
                          border: isActiveOrHovered
                            ? '1px solid rgba(59, 130, 246, 0.3)'
                            : '1px solid rgba(229, 231, 235, 0.8)',
                          boxShadow: isActiveOrHovered
                            ? '0 12px 30px -8px rgba(59, 130, 246, 0.2)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {/* Image Container */}
                        <div className="relative w-30 h-30 mb-4 flex items-center justify-center">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                            <Image
                              src={`${categoryUrl}/${cat.image}`}
                              alt={cat.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 64px) 100vw, 64px"
                            />
                          </div>

                          {/* Active Hover Overlay */}
                          {isActiveOrHovered && (
                            <motion.div
                              className="absolute inset-0 rounded-full z-0"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                            />
                          )}
                        </div>

                        {/* Category Name */}
                        <span className="text-sm font-semibold text-center text-gray-800 mb-1 block truncate max-w-full">
                          {cat.name}
                        </span>

                        {/* Children Arrow */}
                        {cat.children?.length > 0 && (
                          <motion.div
                            className={`w-6 h-6 flex items-center justify-center rounded-full absolute -bottom-3 border transition-colors 
            ${isActiveOrHovered
                                ? 'bg-blue-500 text-white border-blue-400 shadow-md'
                                : 'bg-gray-100 text-gray-500 border-gray-300'}`}
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    );

                    return (
                      <div key={cat.id} className="flex-shrink-0">
                        {cat.children?.length > 0 ? (
                          content
                        ) : (
                          <Link href={`/productByCategory/${encodeURIComponent(cat.id)}`}>
                            {content}
                          </Link>
                        )}
                      </div>
                    );
                  })}
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
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 overflow-hidden border border-blue-100/50 shadow-lg"
                onMouseEnter={handleSubcategoryEnter}
                onMouseLeave={handleSubcategoryLeave}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold text-gray-800 text-xl flex items-center">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Explore {(hoveredCategory || activeCategory)?.name}
                    </span>
                    {(hoveredCategory?.children?.length > 0 || activeCategory?.children?.length > 0) &&
                      <span className="ml-2 text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                        {hoveredCategory?.children?.length || activeCategory?.children?.length} subcategories
                      </span>
                    }
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
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2), 0 5px 10px -5px rgba(59, 130, 246, 0.1)"
                        }}
                        className="bg-white p-4 rounded-xl text-center transition-all border border-white cursor-pointer group hover:border-blue-100 shadow-sm hover:shadow-md"
                      >
                        <div className="relative w-16 h-16 mx-auto mb-3">
                          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md group-hover:border-blue-100 transition-colors">
                            <Image
                              src={`${categoryUrl}/${sub.image}`}
                              alt={sub.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 64px) 100vw, 64px"
                            />
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-blue-50 bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all"
                            whileHover={{
                              scale: 1.1,
                              transition: { type: 'spring', stiffness: 400 }
                            }}
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                          {sub.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          View products
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-600 text-sm"
        >
          <p className="mb-1">Hover or click on a category to explore its subcategories</p>
          <p className="text-xs">The panel will stay open while you interact with it</p>
        </motion.div>
      </div>
    </div>
  );
}
