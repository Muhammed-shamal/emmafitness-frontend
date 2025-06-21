'use client'
import { useEffect, useState } from 'react'
import { categoryUrl } from '../utility/api/constant';
import fetchApi from '../utility/api/fetchApi';
// import { bannerCategories } from '../constant'

export default function CategorySlider() {
  const [loading, setLoading] = useState(false);
  const [bannerCategories, setBannerCategories] = useState([]);
  const [selected, setSelected] = useState(bannerCategories[0])

  useEffect(() => {
    setLoading(true);
    fetchApi({ URI: 'public/banner-categories' })
      .then(res => {
        const data = res?.data || [];
        console.log("data is",data)
        setBannerCategories(data);
        if (data.length > 0) {
          setSelected(data[0]); // Set default selected category after fetch
        }
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);


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
        {selected?.children?.map((sub, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg text-center bg-white shadow hover:shadow-md transition"
          >
            <img
              src={`${categoryUrl}/${sub.image}`} // or just sub.image if it's full URL
              alt={sub.name}
              className="w-16 h-16 object-contain mx-auto mb-2"
            />
            <div className="text-sm font-medium">{sub.name}</div>
          </div>
        ))}

      </div>

    </section>
  )
}
