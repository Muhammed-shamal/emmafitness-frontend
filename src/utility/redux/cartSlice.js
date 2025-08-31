'use client'
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCart: (state, action) => {
            state.items = action.payload;
            state.error = null;
        },
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find(item => item.product._id === product._id);

            if (existingItem) {
                existingItem.quantity += quantity || 1;
            } else {
                state.items.push({
                    product,
                    quantity: quantity || 1
                });
            }
        },

        updateCartItemQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.product._id === productId);

            if (item) {
                item.quantity = quantity;
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
            state.error = null;
        },
        bulkReplaceCart: (state, action) => {
            console.log('action payload',action.payload);
            state.items = [...state.items, ...action.payload];
        },
    },
});

export const {
    setLoading,
    setError,
    setCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    bulkReplaceCart
} = cartSlice.actions;

export default cartSlice.reducer;