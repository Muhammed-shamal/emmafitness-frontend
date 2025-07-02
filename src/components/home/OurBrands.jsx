'use client'

import { useEffect, useRef, useState } from "react";
import ScrollButton from '../global/ScrollButton'
import Image from "next/legacy/image";
import fetchApi from "../../utility/api/fetchApi";
import Link from "next/link";
import { brandUrl } from "../../utility/api/constant";

function OurBrands() {
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX);
  };

  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (e) => {
    if (isMouseDown && ref.current) {
      ref.current.scrollTo({
        left: startX > e.pageX
          ? (ref.current.scrollLeft + e.pageX) * 0.9
          : (ref.current.scrollLeft - e.pageX) - 20,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchApi({
        URI: 'public/brands?populate=*&sort=updatedAt&pagination[limit]=100'
      }).catch(e => console.log(e));

      const formatted = result?.data?.map(brand => ({
        url: brandUrl + '/' + brand?.logo,
        alt: brand?.name,
        slug: "/brand/" + brand?.slug,
      })) || [];

      setData(formatted);
    };

    fetchData();
  }, []);

  // === 🧠 Return Early if No Brands ===
  if (!data || data.length === 0) return null;

  // === 🎯 One Brand as Banner ===
  if (data.length === 1) {
    const brand = data[0];
    return (
      <div className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-100 py-10 px-4 rounded shadow-md">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-4">
          <Image
            src={brand.url}
            alt={brand.alt}
            width={250}
            height={100}
            className="object-contain mix-blend-multiply"
          />
          <p className="text-sm text-gray-600 max-w-lg">{brand.description || "Premium fitness equipment from our trusted brand partner."}</p>
          <Link href={brand.slug}>
            <button className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
              Explore {brand.alt}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // === 🧩 Default Scrollable Brands Slider ===
  return (
    <div className="relative">
      <ScrollButton Ref={ref} />
      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="max-w-[90vw] overflow-x-scroll flex gap-2 md:gap-4 ease-in-out hide-scrollbar"
      >
        {data.map((item, idx) => (
          <Link
            key={idx}
            href={item.slug}
            className="h-14 w-16 md:h-20 md:w-36 object-cover p-2 flex items-center justify-center border-gray-200 border bg-gray-100 flex-shrink-0"
          >
            <Image
              className="mix-blend-multiply"
              src={item.url || "/#"}
              alt={item.alt}
              width={200}
              height={120}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OurBrands