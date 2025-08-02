'use client'
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../utility/redux/wishListSlice";
import PostAPI from "../../utility/api/postApi";
import updateApi from "../../utility/api/updateAPI";
import UserSession from "../user/userSessions";
import { useState } from "react";
import { useRouter } from "next/navigation";

function WishListButton({ ProductId, label = false }) {
  const wishlistDispatch = useDispatch()
  const user = useSelector(state => state.user)
  const existingWish = useSelector(state => state.wishList.items)
  const exist = existingWish?.find(item => item.product._id == ProductId)
  const route = useRouter()

  const [popup, setPopup] = useState(false)
  console.log("existingWish", existingWish);
  console.log("exist", exist);

  const wishListHandler = async () => {
    try {
      if (user?.token) {
        let result;

        if (exist) {
          result = await updateApi({ URI: `customers/wishlist/remove`, token: user.token });
        } else {
          result = await PostAPI({
            URI: "customers/wishlist/add",
            API_TOKEN: user.token,
            isTop: true,
            Data: {
              productId: ProductId,
              userId: user?.userId
            }
          });
        }

        const updatedItems = result?.data?.items || [];

        wishlistDispatch(addToWishList({ items: updatedItems })); // updated reducer

      } else {
        setPopup(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal open={popup} onCancel={() => setPopup(false)} footer={false}><UserSession Close={() => route.push('/user')} /></Modal>
      <Button onClick={wishListHandler}
        className={`text-secondary`}
        icon={exist ? <HeartFilled /> : <HeartOutlined />}
      >{label && "Add to wishlist"}</Button>
    </>
  )
}

export default WishListButton