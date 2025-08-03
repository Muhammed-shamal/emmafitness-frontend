import { useDispatch, useSelector } from "react-redux"
import { bulkReplaceCart } from "./redux/cartSlice"
import PostAPI from "./api/postApi"
import updateApi from "./api/updateAPI"
import fetchApi from "./api/fetchApi"
import { showToast } from "./redux/toastSlice"

const useAddAndRemoveCart = () => {
  const cartDispatch = useDispatch()
  const allCart = useSelector(state => state.cart.items)
  const user = useSelector(state => state.user)

  const updateDatabase = async ({ token, userId, cartItem }) => {
    if (token) {
      try {
        // ✅ Fetch server cart
        const serverCart = await fetchApi({ URI: `customers/cart/getBy/${userId}`, API_TOKEN: token });
        console.log('server cart', serverCart)
        const serverItems = serverCart?.data?.items || [];

        // ✅ Normalize local cart for comparison
        const localMap = new Map(cartItem.map(item => [item.productId.toString(), item.quantity]));

        // ✅ Items to remove (in server but not in local)
        const itemsToRemove = serverItems.filter(serverItem => !localMap.has(serverItem.productId._id.toString()));

        // ✅ Items to add (in local but not in server)
        const itemsToAdd = cartItem.filter(localItem => {
          return !serverItems.some(serverItem => serverItem.productId._id.toString() === localItem.productId.toString());
        });

        // ✅ Items to update (same item, but quantity mismatch)
        const itemsToUpdate = serverItems.filter(serverItem => {
          const localQty = localMap.get(serverItem.productId._id.toString());
          return localQty !== undefined && localQty !== serverItem.quantity;
        });

        // Perform actions
        for (const item of itemsToRemove) {
          await updateApi({ URI: "customers/cart/remove", Data: { userId, productId: item.productId._id }, token });
          cartDispatch(showToast({ type: 'success', message: 'product removed from cart successfully' }));
        }

        for (const item of itemsToAdd) {
          let response = await PostAPI({
            URI: "customers/cart/add",
            Data: { userId, productId: item.productId, quantity: item.quantity },
            isTop: true,
            API_TOKEN: token
          });
          console.log("response for add", response)
          cartDispatch(showToast({ type: 'success', message: 'product add to cart successfully' }));
        }

        for (const item of itemsToUpdate) {
          const newQty = localMap.get(item.productId._id.toString());
          let response = await updateApi({
            URI: "customers/cart/update",
            Data: { userId, productId: item.productId._id, quantity: newQty },
            isTop: true,
            token
          });
          console.log("response update", response)
          cartDispatch(showToast({ type: 'success', message: 'your cart has been updated' }));
        }
      } catch (err) {
        cartDispatch(showToast({ type: 'error', message: err?.response?.data?.message || 'Error syncing cart' }));
        console.error("Error syncing cart:", err);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItem));
    }

    cartDispatch(bulkReplaceCart(cartItem));
  };



  const addCartHandle = ({ ProductId }) => {

    let currentCart = Array.isArray(allCart) ? [...allCart] : [];
    const productIndex = allCart?.findIndex((cartItem) => cartItem?.productId == ProductId);
    if (productIndex >= 0) {
      currentCart[productIndex] = { ...currentCart[productIndex] }; // Clone the object
      currentCart[productIndex].quantity++;
    } else {

      currentCart?.push({
        productId: ProductId,
        quantity: 1,
        user: user?.userId
      })
    }

    updateDatabase({ token: user?.token, userId: user?.userId, cartItem: currentCart })

  }



  const removeCartHandle = ({ ProductId }) => {
    // If the product is already in the cart, create a new array with updated quantity
    const updatedCart = allCart?.map((cartItem, index) => {
      if (cartItem.productId == ProductId) {
        return {
          ...cartItem,
          quantity: parseInt(cartItem.quantity || 0) - 1,
        };
      }
      return cartItem;
    }).filter((cartItem) => parseInt(cartItem.quantity || 0) >= 1)

    updateDatabase({ token: user?.token, userId: user?.userId, cartItem: updatedCart })

  }

  return { addCartHandle, removeCartHandle }

}

export default useAddAndRemoveCart