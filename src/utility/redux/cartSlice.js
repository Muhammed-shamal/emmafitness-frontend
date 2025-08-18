'use client'
import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCart: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            state.items = action.payload;
        },
        bulkReplaceCart: (state, action) => {
            state.items = [...state.items, ...action.payload];
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart, bulkReplaceCart,setCart } = cartSlice.actions

export default cartSlice.reducer