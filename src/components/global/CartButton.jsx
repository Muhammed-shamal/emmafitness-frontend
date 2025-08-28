'use client'
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, addToCart, removeFromCart, } from "../../utility/redux/cartSlice";

function CartButton({ productId }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Find the cart item for this product
  const cartItem = cartItems.find(item => item.product._id === productId);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
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
  };

  const handleRemoveFromCart = () => {
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
  };

  return (
    quantity === 0 ? (
      <Button
        className='text-white bg-blue-500 flex-1 hover:text-white h-10 rounded-none gap-2 text-center flex items-center justify-center'
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
    )
  );
}

export default CartButton;