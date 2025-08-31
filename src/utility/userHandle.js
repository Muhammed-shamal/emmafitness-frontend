'use client'

import { useDispatch } from "react-redux"
import { loggedIn } from './redux/userSlice'
import { bulkReplaceCart } from "./redux/cartSlice"
import fetchApi from "./api/fetchApi"
import { addBulkWishlist } from "./redux/wishListSlice"
import PostAPI from "./api/postApi"

const useSignOut = () => {
    const dispatch = useDispatch()
    const signOut = async (token) => {
        try {
            const user = await PostAPI({
                URI: 'auth/customer/logout',
                API_TOKEN: token,
            });
            console.log('logout res', user);
            localStorage.clear();
            sessionStorage.clear();
            dispatch(loggedIn({}))
            window.location.reload();
        } catch (error) {
            console.log("failed to logout", error)
        }
    }
    return signOut
}

const useSignIn = () => {

    const dispatch = useDispatch()

    const signIn = async ({ token, userId, userName, phone, email }) => {
        sessionStorage.setItem('token', token)
        dispatch(loggedIn({ userId, userName, token, phone, email }))

        //  if have, move it into db and remove from local storage
        const localCart = JSON.parse(localStorage.getItem('cart'))
        const serverCart = await fetchApi({ URI: 'customers/me?populate=carts.product,wishlist.product', API_TOKEN: token }).catch(e => console.log(e))
        if (serverCart?.carts?.length > 0) {
            dispatch(bulkReplaceCart(serverCart?.carts?.map(it => ({ productId: it?.product?.id, quantity: it?.quantity }))))
        }
        else if (localCart != undefined || localCart !== "") {
            dispatch(bulkReplaceCart(localCart))
        }
        localStorage.clear('cart')
        dispatch(addBulkWishlist(serverCart?.wishlists?.map((item) => (
            {
                id: item?.id,
                ProductId: item?.product?.id
            }
        ))))

    }
    return signIn
}

export { useSignOut, useSignIn }