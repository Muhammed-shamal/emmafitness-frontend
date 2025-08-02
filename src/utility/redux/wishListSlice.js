'use client'
import { createSlice } from "@reduxjs/toolkit"

export const wishListSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addToWishList: (state, action) => {
            state.items = action.payload.items;
        },
        addBulkWishlist: (state, action) => {
            state.items = action.payload;
        },
        removeWishList: (state, action) => {
            state.items = state.items.filter((item) => item.product._id !== action.payload);
        },
        setWishList: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addToWishList, addBulkWishlist, removeWishList, setWishList, loading } = wishListSlice.actions

export default wishListSlice.reducer

