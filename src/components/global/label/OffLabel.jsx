import React from 'react'

function OffLabel({ SalePrice = 0, RegularPrice = 0 }) {
  const offerPersontage = (SalePrice - RegularPrice) / RegularPrice * 100

  return (
    <>
    {
    (offerPersontage != 0 && SalePrice < RegularPrice && SalePrice != undefined) &&
        <label className="bg-secondary text-yellow-300  text-center px-2 py-1 text-xs font-bold rounded-sm">{parseInt(Math.abs(offerPersontage)).toString()}% OFF</label>
      }
    </>
  )
}

export default OffLabel