import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import wishListReducer from './wishListSlice'
import userReducer from './userSlice'
import orderDraftReducer from './orderDraftSlice'
import toastReducer from './toastSlice'


export default configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        user: userReducer,
        orderDraft: orderDraftReducer,
        toast:toastReducer
    }
})