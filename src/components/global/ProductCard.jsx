import Image from "next/legacy/image"
import Price from "./Price"
import Link from "next/link"
import OffLabel from './label/OffLabel'
import WishListButton from "./WishListButton"

function ProductCard({ Id, Title = "", SalePrice = 0, RegularPrice = 0, ImageUrl, createdAt, Slug = "#", CustomLabel = false, isBestSeller = false, isTrending = false, isNewArrival = false, isFeatured = false, Brand, reviews }) {

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

                {/* Product Rating */}
                {reviews?.length > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                        {renderStars(roundedRating)}
                        <span className="text-gray-500 text-xs">({reviews.length})</span>
                    </div>
                )}

                {/* Price */}
                <div className="mt-1">
                    <Price salePrice={SalePrice} regularPrice={RegularPrice} />
                </div>
            </div>
        </div>
    );
}

export default ProductCard