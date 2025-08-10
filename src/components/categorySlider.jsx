'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fetchApi from '../utility/api/fetchApi';
import { categoryUrl } from '../utility/api/constant';
import Image from 'next/image';
import Link from 'next/link';

export default function CategorySlider() {
  const [loading, setLoading] = useState(false);
  const [bannerCategories, setBannerCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

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

  return (
    <section className="px-4 mt-6 relative">
      {/* Horizontal Slider */}
      <div className="relative">
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {bannerCategories.map((cat) => (
            <Link href={`/productByCategory/${encodeURIComponent(cat.id)}`}>
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center min-w-[120px]"
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex flex-col items-center w-full p-2 rounded-xl transition-all duration-300">
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={`${categoryUrl}/${cat.image}`}
                      alt={cat.name}
                      className="object-contain"
                      width={120}
                      height={100}
                    />
                    {hoveredCategory?.id === cat.id && (
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-10 rounded-full"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.1 }}
                        transition={{ type: 'spring' }}
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap text-gray-800">
                    {cat.name}
                  </span>
                </div>

                {/* Animated dropdown indicator */}
                {cat.children?.length > 0 && (
                  <motion.div
                    animate={{
                      y: hoveredCategory?.id === cat.id ? 5 : 0,
                      opacity: hoveredCategory?.id === cat.id ? 1 : 0.5
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mt-1"
                  >
                    {/* <svg
                      width="20"
                      height="10"
                      viewBox="0 0 20 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L10 9L19 1"
                        stroke="#4B5563"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg> */}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Gradient fade effect on sides */}
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Subcategories with animation */}

      <AnimatePresence>
        {hoveredCategory?.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {hoveredCategory.children.map((sub, index) => (
                <Link href={`/productByCategory/${encodeURIComponent(sub.id)}`}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="p-4 text-center transition-all"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <img
                        src={`${categoryUrl}/${sub.image}`}
                        alt={sub.name}
                        className="w-full h-full object-contain"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black bg-opacity-5 rounded-full"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1.1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-700">{sub.name}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
