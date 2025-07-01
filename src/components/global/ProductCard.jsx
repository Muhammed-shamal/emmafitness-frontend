import Image from "next/legacy/image"
import Price from "./Price"
import Link from "next/link"
import moment from "moment"
import OffLabel from './label/OffLabel'
import WishListButton from "./WishListButton"

import { Tag } from "antd"

function ProductCard({ Id, Title = "", Category, SalePrice = 0, RegularPrice = 0, ImageUrl, createdAt, Slug = "#", CustomLabel = false, Featured = false, Brand }) {
    return (
        <div className=" border border-gray-200 p-2 md:p-3 lg:p-4  bg-gray-100 flex flex-col justify-between gap-2">
            <Link href={`/product/${encodeURIComponent(Slug)}`} className="relative">
                <div className="absolute top-0 right-0 flex justify-between w-full gap-1 text-xs z-20 font-bold">
                    <WishListButton ProductId={Id} />
                    <div className="flex flex-col items-end gap-2">

                        {
                            (moment().diff(createdAt, 'days') < 30) &&
                            <Tag className="rounded-none" color="red-inverse">

                                New
                            </Tag>

                        }
                        {CustomLabel &&
                            <Tag color="yellow-inverse" className="text-black">

                                {CustomLabel}
                            </Tag>
                        }
                    </div>

                </div>
                <Image className="object-contain h-40 w-80 mix-blend-darken" src={ImageUrl ? ImageUrl : "/product-placehold.png"} width={350} height={550} alt={Title} />
                <div className="absolute left-0 bottom-0 flex justify-between  w-full">
                    <OffLabel SalePrice={SalePrice} RegularPrice={RegularPrice} />
                    {
                        Featured &&
                        <Tag color="gold">Featured</Tag>
                    }
                </div>
            </Link>
            <span className="text-xs text-gray-500">{Brand}</span>
            <Link href={`/product/${encodeURIComponent(Slug)}?a=2`}>
                <h3 className="text-sm font-bold line-clamp-2"> {Title}</h3>
            </Link>

            <Price salePrice={SalePrice} regularPrice={RegularPrice} />

        </div>
    )
}

export default ProductCard