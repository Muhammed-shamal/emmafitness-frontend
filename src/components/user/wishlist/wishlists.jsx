'use client'

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Spin, Empty } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchApi from "../../../utility/api/fetchApi";
import Price from "../../global/Price";
import Link from "next/link";
import { removeWishList, setWishList } from "../../../utility/redux/wishListSlice";
import { showToast } from '../../../utility/redux/toastSlice';
import useAddAndRemoveCart from "../../../utility/useAddAndRemoveCart";
import { productUrl } from "../../../utility/api/constant";
import updateApi from "../../../utility/api/updateAPI";

function WishLists() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const wishlist = useSelector(state => state.wishList);
  const { addCartHandle } = useAddAndRemoveCart();

  const handleButton = async ({ id, cart = false }) => {
    try {
      if (cart) addCartHandle({ ProductId: id });
      let response = await updateApi({
        URI: `customers/wishlist/remove`,
        token: user.token,
        isTop: true,
        Data: {
          productId: id,
          userId: user?.userId
        }
      });

      if (response.message) {
        dispatch(removeWishList(id));
        dispatch(showToast({ type: 'success', message: response.message }));
      }
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.message || 'Failed to update wishlist' }));
    }
  };

  const renderWishlistItem = (item) => {
    console.log("item", item)
    const product = item?.product;
    if (!product) return null;

    return (
      <Card key={product._id}>
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Image
              src={`${productUrl}/${product?.images?.[0]}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/product-placehold.png";
              }}
              alt={product?.name || "Product Image"}
              width={150}
              height={150}
            />
          </div>

          <div className="md:border-l border-gray-200 md:pl-4 flex flex-col justify-between w-full">
            <Link href={`/product/${product?.slug || ""}`}>
              <h3 className="font-semibold line-clamp-2 hover:text-secondary">
                {product?.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product?.description}
            </p>

            <div className="text-sm text-gray-700">
              {product?.specs?.details && <div>Details: {product.specs.details}</div>}
              {product?.specs?.size && <div>Size: {product.specs.size}</div>}
              {product?.specs?.color && <div>Color: {product.specs.color}</div>}
              {product?.machineWeight && <div>Weight: {product.machineWeight}kg</div>}
              <div>Status: <span className="text-green-600">{product?.status}</span></div>
            </div>

            <Price
              regularPrice={product?.regularPrice}
              salePrice={product?.salePrice}
            />

            <div className="flex flex-row gap-4 justify-end mt-2">
              <div
                onClick={() =>
                  product.status !== 'Out of Stock' && product.stockQty > 0
                    ? handleButton({ id: product._id, cart: true })
                    : null
                }
                className={`${product.status === 'Out of Stock' || product.stockQty === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:text-secondary hover:cursor-pointer'
                  }`}
              >
                <ShoppingCartOutlined /> Add to cart
              </div>
              <div
                onClick={() => handleButton({ id: product._id })}
                className="border-l border-gray-200 pl-3 hover:text-secondary hover:cursor-pointer"
              >
                <DeleteOutlined /> Remove
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
      {wishlist.loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : wishlist.items?.length === 0 ? (
        <Empty description="No items in your wishlist" />
      ) : (
        wishlist.items.map(item => renderWishlistItem(item))
      )}
    </div>
  );
}

export default WishLists;
