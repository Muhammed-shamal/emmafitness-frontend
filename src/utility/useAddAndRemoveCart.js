import { useDispatch, useSelector } from "react-redux"
import { bulkReplaceCart } from "./redux/cartSlice"
import PostAPI from "./api/postApi"
import deleteApi from "./api/deleteApi"
import updateApi from "./api/updateAPI"
import fetchApi from "./api/fetchApi"

const useAddAndRemoveCart = () => {


  const cartDispatch = useDispatch()
  const allCart = useSelector(state => state?.cart)
  const user = useSelector(state => state.user)


  const updateDatabase = async ({ token, userId, cartItem }) => {

    // if user exist add it into db 
    if (token) {
      try {
        // fetch current server cart
        const serverCart = await fetchApi({ URI: `carts?filters[user]=${userId}&populate=product`, API_TOKEN: token })


        // find the diference for both cart
        // Find items to be removed (in server cart but not in local cart)
        const itemsToRemove = serverCart?.data?.filter(({ attributes: serverItem }) => {
          return !cartItem.some(localItem => {
          if(localItem.productId === serverItem.product.data.id) return serverItem.product.data.id 
          });
        });


        // Find items to be added (in local cart but not in server cart)
        const itemsToAdd = cartItem.filter(localItem => !serverCart?.data?.some(({ attributes: serverItem }) => {
          if(serverItem.product.data.id === localItem.productId) return localItem.productId
        }));


        // Update quantities for items that exist in both local and server carts
        const itemsToUpdate = serverCart?.data?.map(({ attributes: serverItem, id }) => {
          const matchingLocalItem = cartItem.find(localItem =>
            serverItem.product.data.id === localItem.productId
          );
        
          if (matchingLocalItem) {
            // If there's a match, return an object with both serverItem id and localItem data
            return { id, ...matchingLocalItem };
          }
          return null; // Return null for non-matching items
        }).filter(item => item !== null);
         

        

        if (itemsToRemove?.length > 0) {
          for (const it of itemsToRemove) {
            await deleteApi({ token, URI: `carts/${it?.id}` });
          }
        }else if(itemsToAdd?.length > 0){
          for (const it of itemsToAdd){
            await PostAPI({URI:"carts", Data:{product: it?.productId, quantity: parseInt(it?.quantity), user: userId}, token})
          }
        }else if(itemsToUpdate.length > 0){
          for (const it of itemsToUpdate){
            await updateApi({URI:`carts/${it?.id}`, Data:{ quantity: parseInt(it?.quantity)}, token})
          }
        }


      } catch (err) {
        console.log(err)
      }

    }


    if (!token) localStorage.setItem('cart', JSON.stringify(cartItem))

    cartDispatch(bulkReplaceCart(cartItem))
  }


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
          quantity: parseInt(cartItem.quantity||0) - 1,
        };
      }
      return cartItem;
    }).filter((cartItem) => parseInt(cartItem.quantity||0) >= 1)

    updateDatabase({ token: user?.token, userId: user?.userId, cartItem: updatedCart })

  }

  return { addCartHandle, removeCartHandle }

}


export default useAddAndRemoveCart