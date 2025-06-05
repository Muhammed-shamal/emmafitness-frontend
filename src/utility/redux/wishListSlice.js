'use client'
import { createSlice } from "@reduxjs/toolkit"

export const wishListSlice = createSlice({
    name: "wishlist",
    initialState:  [],
    reducers: {
        addToWishList:  (state, action)=> {
            const productIndex = state.findIndex((wishItem) => wishItem?.ProductId == action?.payload?.ProductId);
            if (productIndex === -1) {
                state.push(action.payload);

            } else {
                state.splice(productIndex, 1)
            }
        },
        addBulkWishlist:  (state, action)=> {
           return action.payload
        },
        removeWishList: (state, action)=>{
            return state.filter((item) => item.id !== action.payload);

        }
       
    }
})

export const {addToWishList, addBulkWishlist, removeWishList} = wishListSlice.actions

export default wishListSlice.reducer

