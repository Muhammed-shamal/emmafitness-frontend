'use client'
import { Select } from "antd"
import { useState } from "react";

function TitleWithSort({ Title = "Products", setProducts }) {
  const [sortingOption, setSortingOption] = useState('popularity');

  const handleSortingChange = (e) => {
    setSortingOption(e)
    setProducts(products => {

      switch (e) {
        case 'popularity':
          return products.slice().sort((a, b) => a.name.localeCompare(b.name));
        case 'new':
          return products.slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
        case 'price-low':
          return products.slice().sort((a, b) => a.salePrice - b.salePrice);
        case 'price-high':
          return products.slice().sort((a, b) => b.salePrice - a.salePrice);
        default:
          return products.slice(); // Handle unknown sorting options

      }
    })
  }
  return (
    <div className="py-2 border-y border-gray-200 flex flex-row justify-between text-sm items-center mb-2">
      <h2 className="font-bold">{Title}</h2>
      <Select
        className="w-40"
        options={[
          { value: 'popularity', label: 'Popularity' },
          { value: 'new', label: 'Newest' },
          { value: 'price-low', label: 'Price: Lowest to highest' },
          { value: 'price-high', label: 'Price: Highest to lowest' },
        ]}
        value={sortingOption}
        onChange={handleSortingChange}
        placeholder="Sort by"
      />
    </div>
  )
}

export default TitleWithSort