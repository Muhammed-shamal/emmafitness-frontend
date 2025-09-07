'use client'
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, addToCart, removeFromCart, } from "../../utility/redux/cartSlice";
import { useState } from "react";
import UserSession from "../user/userSessions";
import { showToast } from "../../utility/redux/toastSlice";
import { useRouter } from "next/navigation";
import PostAPI from "../../utility/api/postApi";
import updateApi from "../../utility/api/updateAPI";

function CartButton({ productId }) {
  const dispatch = useDispatch();
  const route = useRouter()

  const user = useSelector(state => state.user);
  const cartItems = useSelector(state => state.cart.items);

  const [popup, setPopup] = useState(false)

  // Find the cart item for this product
  const cartItem = cartItems.find(item => item.product._id === productId);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = async () => {
    if (!user?.token) {
      setPopup(true);
      return; // Prevent proceeding
    }

    try {
      if (cartItem) {
        // If item exists, increment quantity
        dispatch(updateCartItemQuantity({
          productId,
          quantity: quantity + 1
        }));
      } else {
        // If new item, add to cart
        dispatch(addToCart({
          product: { _id: productId }, // Minimal product data
          quantity: 1
        }));
      }

      await PostAPI({
        URI: "customers/cart/add",
        API_TOKEN: user.token,
        isTop: true,
        Data: {
          productId: productId,
          userId: user?.userId
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      dispatch(showToast({ type: "error", message: error.message || "Failed to add to cart" }));
    }
  };

  const handleRemoveFromCart = async () => {
    if (!user?.token) {
      setPopup(true);
      return; // Prevent proceeding
    }

    try {
      if (quantity > 1) {
        // Decrement quantity if more than 1
        dispatch(updateCartItemQuantity({
          productId,
          quantity: quantity - 1
        }));
      } else {
        // Remove completely if quantity is 1
        dispatch(removeFromCart(productId));
      }

      await updateApi({
        URI: "customers/cart/update",
        token: user.token,
        isTop: true,
        Data: {
          productId: productId,
          userId: user?.userId
        }
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      dispatch(showToast({ type: "error", message: error.message || "Failed to remove from cart" }));
    }
  };

  return (
    <>
      <Modal open={popup} onCancel={() => setPopup(false)} footer={false}><UserSession Close={() => route.push('/user')} /></Modal>
      {quantity === 0 ? (
        <Button
          className='text-white bg-blue-500 flex-1 h-10 rounded-none gap-2 text-center flex items-center justify-center'
          onClick={handleAddToCart}
          icon={<ShoppingCartOutlined />}
        >
          Add to cart
        </Button>
      ) : (
        <div className="flex flex-row justify-center">
          <Button
            className="h-10 rounded-none"
            icon={<MinusOutlined />}
            onClick={handleRemoveFromCart}
          />
          <div className="flex justify-center items-center w-8">
            {quantity}
          </div>
          <Button
            className="h-10 rounded-none"
            icon={<PlusOutlined />}
            onClick={handleAddToCart}
          />
        </div>
      )}
    </>
  );
}

export default CartButton;