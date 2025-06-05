'use client'
import { createSlice } from "@reduxjs/toolkit"




export const cartSlice = createSlice({
    name: "cart",
    initialState:  [],
    reducers: {
        addToCart: (state, action) => {
            const productIndex = state?.findIndex((cartItem) => cartItem?.productId === action.payload);

            if (productIndex >= 0) {
                state[productIndex].quantity++;
            } else {
                state.push({
                    productId: action.payload,
                    quantity: 1,
                });
            }
        },
        removeFromCart: (state, action) => {
            const productIndex = state.findIndex((cartItem) => cartItem.productId === action.payload);
            if (state[productIndex].quantity >= 2) {
                state[productIndex].quantity--
            } else {
                state.splice(productIndex, 1);
            }

        },
        bulkReplaceCart: (state, action) =>{
            return action.payload
        }
    }
})

export const { addToCart, removeFromCart, bulkReplaceCart } = cartSlice.actions

export default cartSlice.reducer

