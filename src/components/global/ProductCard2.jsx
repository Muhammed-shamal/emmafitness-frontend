import Image from "next/legacy/image"
import Price from "./Price"
import Link from "next/link"
import moment from "moment"
import OffLabel from './label/OffLabel'
import WishListButton from "./WishListButton"

import { Tag } from "antd"

function ProductCard2({ Id, Title = "", SalePrice = 0, RegularPrice = 0, ImageUrl, Brand, createdAt, Slug = "#", CustomLabel = false, isBestSeller = false, isTrending = false, isNewArrival = false, isFeatured = false, }) {

    const isNew = moment().diff(createdAt, 'days') < 30;

    return (
        <div className="relative flex flex-col rounded-xl shadow-sm border border-gray-200 bg-white transition hover:shadow-md overflow-hidden">
            <Link href={`/product/${encodeURIComponent(Slug)}`} className="relative block group">
                {/* Tags - Top Right */}
                <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end text-xs font-semibold">
                    <WishListButton ProductId={Id} />

                    {isNewArrival && <Tag color="red" className="!rounded">New</Tag>}
                    {isTrending && <Tag color="purple" className="!rounded">Trending</Tag>}
                    {isBestSeller && <Tag color="green" className="!rounded">Best Seller</Tag>}
                    {CustomLabel && <Tag color="yellow" className="text-black !rounded">{CustomLabel}</Tag>}
                </div>


                {/* Product Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
                    <Image
                        src={ImageUrl }
                        width={350}
                        height={750}
                        alt={Title}
                         onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/product-placehold.png";
                        }}
                        fill
                        className="object-contain mix-blend-darken group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Off Label + Featured - Bottom Left */}
                <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2">
                    <OffLabel SalePrice={SalePrice} RegularPrice={RegularPrice} />
                    {isFeatured && <Tag color="gold" className="!rounded">Featured</Tag>}
                </div>

            </Link>

            {/* Product Info */}
            <div className="p-3 flex flex-col gap-1">
                <span className="text-[12px] text-gray-500 truncate">{Brand || 'No Brand'}</span>

                <Link href={`/product/${encodeURIComponent(Slug)}?a=2`}>
                    <h3 className="text-sm font-bold line-clamp-2 hover:text-primary transition">
                        {Title}
                    </h3>
                </Link>

                <Price salePrice={SalePrice} regularPrice={RegularPrice} />
            </div>
        </div>
    );
}

export default ProductCard2