import Image from "next/legacy/image"
import Price from "./Price"
import Link from "next/link"
import moment from "moment"
import OffLabel from './label/OffLabel'
import WishListButton from "./WishListButton"

import { Tag } from "antd"

function ProductCard({ Id, Title = "", SalePrice = 0, RegularPrice = 0, ImageUrl, createdAt, Slug = "#", CustomLabel = false, isBestSeller = false, isTrending = false, isNewArrival = false, isFeatured = false, Brand }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden">

            {/* Top Right Tags + Wishlist */}
            <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
                <WishListButton ProductId={Id} className="text-gray-500 hover:text-red-500 transition-colors" />
                
                <div className="flex flex-col items-end gap-1">
                    {isNewArrival && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            New
                        </span>
                    )}
                    {isTrending && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Trending
                        </span>
                    )}
                    {isBestSeller && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Best Seller
                        </span>
                    )}
                    {CustomLabel && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold border border-yellow-200">
                            {CustomLabel}
                        </span>
                    )}
                </div>
            </div>

            {/* Product Image */}
            <Link href={`/product/${encodeURIComponent(Slug)}`} className="block relative">
                <div className="aspect-square w-full bg-gray-50 flex items-center justify-center overflow-hidden rounded-lg mb-3">
                    <Image
                        src={ImageUrl}
                        width={300}
                        height={300}
                        alt={Title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/product-placehold.png";
                        }}
                        className="object-contain mix-blend-darken transition-transform duration-300 group-hover:scale-105 w-full h-full"
                    />
                </div>

                {/* Bottom Left Tags */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                    <OffLabel SalePrice={SalePrice} RegularPrice={RegularPrice} />
                    {isFeatured && (
                        <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Featured
                        </span>
                    )}
                </div>
            </Link>

            {/* Product Details */}
            <div className="flex flex-col gap-2 mt-auto">
                {/* Brand */}
                {Brand && (
                    <span className="text-xs text-gray-500 font-medium truncate">{Brand}</span>
                )}

                {/* Product Title */}
                <Link href={`/product/${encodeURIComponent(Slug)}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 hover:text-primary transition-colors duration-200 min-h-[40px]">
                        {Title}
                    </h3>
                </Link>

                {/* Price */}
                <div className="mt-1">
                    <Price salePrice={SalePrice} regularPrice={RegularPrice} />
                </div>
            </div>
        </div>
    );
}

export default ProductCard