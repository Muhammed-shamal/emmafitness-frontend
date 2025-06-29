'use client'

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Spin, Empty } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchApi from "../../../utility/api/fetchApi";
import Price from "../../global/Price";
import Link from "next/link";
import deleteAPI from "../../../utility/api/deleteApi";
import { removeWishList } from "../../../utility/redux/wishListSlice";
import { showToast } from '../../../utility/redux/toastSlice';
import useAddAndRemoveCart from "../../../utility/useAddAndRemoveCart";

function WishLists() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const currentWishlist = useSelector(state => state.wishList);
  const { addCartHandle } = useAddAndRemoveCart();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchApi({
          URI: `customers/wishlist/getBy/${user?.userId}`,
          API_TOKEN: user?.token
        });
        setData(result?.data || []);
      } catch (error) {
        dispatch(showToast({ type: 'error', message: error.message || 'Failed to fetch wishlist' }));
      }
      setLoading(false);
    };

    if (user?.userId && user?.token) {
      fetchData();
    }
  }, [user?.userId, user?.token, currentWishlist, dispatch]);

  const handleButton = async ({ id, cart = false }) => {
    try {
      if (cart) addCartHandle({ ProductId: id });
    //   await deleteAPI({ URI: `customers/wishlist/${id}`, token: user?.token });
    
      dispatch(removeWishList(id));
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.message || 'Failed to update wishlist' }));
    }
  };

  const renderWishlistItem = (item) => {
    const product = item?.attributes?.product?.data?.attributes;
    if (!product) return null;

    return (
      <Card key={item.id}>
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Image
              src={product?.Feature_Photo?.data?.attributes?.url || "/default.png"}
              alt={product?.Name || "Product Image"}
              width={150}
              height={150}
            />
          </div>

          <div className="md:border-l border-gray-200 md:pl-4 flex flex-col justify-between w-full">
            <Link href={`/product/${product?.Slug || ""}`}>
              <h3 className="font-semibold line-clamp-2 hover:text-secondary">
                {product?.Name}
              </h3>
            </Link>
            <p className="text-xs text-gray-600 line-clamp-2">
              {product?.Short_Description}
            </p>
            <Price
              regularPrice={product?.Regular_Price}
              salePrice={product?.Sale_Price}
            />
            <div className="flex flex-row gap-4 justify-end mt-2">
              <div
                onClick={() => handleButton({ id: item.id, cart: true })}
                className="hover:text-secondary hover:cursor-pointer"
              >
                <ShoppingCartOutlined /> Add to cart
              </div>
              <div
                onClick={() => handleButton({ id: item.id })}
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
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : data?.length === 0 ? (
        <Empty description="No items in your wishlist" />
      ) : (
        data.map(item => renderWishlistItem(item))
      )}
    </div>
  );
}

export default WishLists;
