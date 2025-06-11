'use client'
import { useState } from 'react'
import { bannerCategories } from '../constant'

export default function CategorySlider() {
  const [selected, setSelected] = useState(bannerCategories[0])

  return (
    <section className="px-4 mt-6">
      {/* Horizontal Slider */}
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {bannerCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat)}
            className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl border 
              ${selected.id === cat.id ? 'bg-secondary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <img src={cat.icon} alt={cat.name} className="w-10 h-10 mb-1" />
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Subcategories */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {selected.subCategories.map((sub) => (
          <div
            key={sub}
            className="border p-4 rounded-lg text-center bg-white shadow hover:shadow-md transition"
          >
            {sub}
          </div>
        ))}
      </div>
    </section>
  )
}
