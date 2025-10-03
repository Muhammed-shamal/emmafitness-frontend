'use client'
import { EditOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, InputNumber, Modal } from "antd";
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
  const [editMode, setEditMode] = useState(false)
  const [tempQuantity, setTempQuantity] = useState(0)

  // Find the cart item for this product
  const cartItem = cartItems.find(item => item.product?._id === productId);
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

  const handleQuantityUpdate = async (newQuantity) => {
    if (!user?.token) {
      setPopup(true);
      return;
    }

    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
      setEditMode(false);
      return;
    }

    try {
      if (cartItem) {
        // Update existing item quantity
        dispatch(updateCartItemQuantity({
          productId,
          quantity: newQuantity
        }));
      } else {
        // Add new item with specified quantity
        dispatch(addToCart({
          product: { _id: productId },
          quantity: newQuantity
        }));
      }

      await PostAPI({
        URI: "customers/cart/add",
        API_TOKEN: user.token,
        isTop: true,
        Data: {
          productId: productId,
          userId: user?.userId,
          quantity: newQuantity
        }
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
      dispatch(showToast({ type: "error", message: error.message || "Failed to update quantity" }));
    }
  };

  const handleEditClick = () => {
    setTempQuantity(quantity || 1);
    setEditMode(true);
  };

  const handleQuantitySubmit = () => {
    handleQuantityUpdate(tempQuantity);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuantitySubmit();
    }
  };

  return (
    <>
      <Modal open={popup} onCancel={() => setPopup(false)} footer={false}><UserSession Close={() => route.push('/user')} /></Modal>
      {quantity === 0 ? (
        <div className="flex flex-col gap-2">
          <Button
            className='text-white bg-blue-500 flex-1 h-10 rounded-none gap-2 text-center flex items-center justify-center'
            onClick={handleAddToCart}
            icon={<ShoppingCartOutlined />}
          >
            Add to cart
          </Button>
          <Button
            className="h-8 text-xs"
            icon={<EditOutlined />}
            onClick={handleEditClick}
          >
            Enter Quantity
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {editMode ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <InputNumber
                min={1}
                max={1000}
                value={tempQuantity}
                onChange={setTempQuantity}
                onKeyPress={handleKeyPress}
                className="h-10 w-20"
                autoFocus
              />
              <Button
                className="h-10 bg-green-500 text-white"
                onClick={handleQuantitySubmit}
              >
                OK
              </Button>
              <Button
                className="h-10"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-center">
              <Button
                className="h-10 rounded-none"
                icon={<MinusOutlined />}
                onClick={handleRemoveFromCart}
              />
              <div 
                className="flex justify-center items-center w-12 cursor-pointer hover:bg-gray-100"
                onClick={handleEditClick}
                title="Click to edit quantity"
              >
                {quantity}
              </div>
              <Button
                className="h-10 rounded-none"
                icon={<PlusOutlined />}
                onClick={handleAddToCart}
              />
            </div>
          )}
          {!editMode && (
            <Button
              className="h-8 text-xs"
              icon={<EditOutlined />}
              onClick={handleEditClick}
            >
              Edit Quantity
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default CartButton;