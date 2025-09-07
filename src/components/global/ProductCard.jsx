import Image from "next/legacy/image"
import Price from "./Price"
import Link from "next/link"
import moment from "moment"
import OffLabel from './label/OffLabel'
import WishListButton from "./WishListButton"

import { Tag } from "antd"

function ProductCard({ Id, Title = "", SalePrice = 0, RegularPrice = 0, ImageUrl, createdAt, Slug = "#", CustomLabel = false, isBestSeller = false, isTrending = false, isNewArrival = false, isFeatured = false, Brand }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 flex flex-col gap-2 shadow-sm hover:shadow-md transition-all relative group">

            {/* Top Right Tags + Wishlist */}
            <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1 text-[10px] sm:text-xs font-bold">
                <WishListButton ProductId={Id} />
                {isNewArrival && <Tag color="red" className="!rounded text-[10px] sm:text-xs">New</Tag>}
                {isTrending && <Tag color="purple" className="!rounded text-[10px] sm:text-xs">Trending</Tag>}
                {isBestSeller && <Tag color="green" className="!rounded text-[10px] sm:text-xs">Best Seller</Tag>}
                {CustomLabel && (
                    <Tag color="yellow-inverse" className="text-black rounded text-[10px] sm:text-xs">{CustomLabel}</Tag>
                )}
            </div>

            <Link href={`/product/${encodeURIComponent(Slug)}`}>
                {/* Image Section */}
                <div className="aspect-[4/3] sm:aspect-[1/1] w-full bg-gray-50 flex items-center justify-center overflow-hidden rounded">
                    <Image
                        src={ImageUrl}
                        width={350}
                        height={350}
                        alt={Title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/product-placehold.png";
                        }}
                        className="object-contain mix-blend-darken transition-transform group-hover:scale-105 duration-300"
                    />
                </div>

                {/* Bottom Left Tags */}
                <div className="absolute bottom-1 left-2 z-10 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
                    <OffLabel SalePrice={SalePrice} RegularPrice={RegularPrice} />
                    {isFeatured && <Tag color="gold" className="!rounded text-[10px] sm:text-xs">Featured</Tag>}
                </div>
            </Link>

            {/* Brand */}
            <span className="text-[10px] sm:text-xs text-gray-500 truncate">{Brand}</span>

            {/* Product Title */}
            <Link href={`/product/${encodeURIComponent(Slug)}?a=2`}>
                <h3 className="text-[12px] sm:text-sm font-bold line-clamp-2 hover:text-primary transition">{Title}</h3>
            </Link>

            {/* Price */}
            <Price salePrice={SalePrice} regularPrice={RegularPrice} />
        </div>
    )
}

export default ProductCard