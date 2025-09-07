import Image from "next/legacy/image"
import Price from "./Price"
import Link from "next/link"
import OffLabel from './label/OffLabel'
import WishListButton from "./WishListButton"
import { Tag } from "antd"

function ProductCard2({ Id, Title = "", SalePrice = 0, RegularPrice = 0, ImageUrl, Brand, createdAt, Slug = "#", CustomLabel = false, isBestSeller = false, isTrending = false, isNewArrival = false, isFeatured = false, reviews }) {

    const averageRating = reviews?.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const roundedRating = Math.round(averageRating * 2) / 2; // for half-stars

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill('★').map((s, i) => (
                    <span key={`full-${i}`} className="text-yellow-400 text-sm">★</span>
                ))}
                {halfStar && <span className="text-yellow-400 text-sm">☆</span>}
                {Array(emptyStars).fill('☆').map((s, i) => (
                    <span key={`empty-${i}`} className="text-gray-300 text-sm">★</span>
                ))}
            </>
        );
    };

    return (
        <div className="relative flex flex-col rounded-xl shadow-sm border border-gray-200 bg-white transition-all duration-300 hover:shadow-md overflow-hidden group">
            {/* Tags - Top Right */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
                <WishListButton ProductId={Id} className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors" />

                <div className="flex flex-col gap-1.5 items-end">
                    {isNewArrival && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                            New
                        </span>
                    )}
                    {isTrending && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                            Trending
                        </span>
                    )}
                    {isBestSeller && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                            Best Seller
                        </span>
                    )}
                    {CustomLabel && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold border border-yellow-200 shadow-sm">
                            {CustomLabel}
                        </span>
                    )}
                </div>
            </div>

            <Link href={`/product/${encodeURIComponent(Slug)}`} className="relative block group">

                {/* Product Image */}
                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <Image
                        src={ImageUrl}
                        width={300}
                        height={300}
                        alt={Title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/product-placehold.png";
                        }}
                        className="object-contain mix-blend-darken group-hover:scale-105 transition-transform duration-300 p-3"
                        priority={false}
                    />
                </div>

                {/* Off Label + Featured - Bottom Left */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                    <OffLabel SalePrice={SalePrice} RegularPrice={RegularPrice} />
                    {isFeatured && (
                        <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                            Featured
                        </span>
                    )}
                </div>

            </Link>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">
                <span className="text-xs text-gray-500 font-medium truncate">{Brand || 'No Brand'}</span>

                <Link href={`/product/${encodeURIComponent(Slug)}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 hover:text-primary transition-colors min-h-[40px]">
                        {Title}
                    </h3>
                </Link>

                {/* Product Rating */}
                {reviews?.length > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                        {renderStars(roundedRating)}
                        <span className="text-gray-500 text-xs">({reviews.length})</span>
                    </div>
                )}

                <div className="mt-1">
                    <Price salePrice={SalePrice} regularPrice={RegularPrice} />
                </div>
            </div>
        </div>
    );
}

export default ProductCard2