import { createSlice } from '@reduxjs/toolkit';

const directPurchaseSlice = createSlice({
  name: 'directPurchase',
  initialState: {
    product: null,
    quantity: 1,
    isDirectPurchase: false
  },
  reducers: {
    setDirectPurchase: (state, action) => {
      state.product = action.payload.product;
      state.quantity = action.payload.quantity || 1;
      state.isDirectPurchase = true;
    },
    clearDirectPurchase: (state) => {
      state.product = null;
      state.quantity = 1;
      state.isDirectPurchase = false;
    }
  }
});

export const { setDirectPurchase, clearDirectPurchase } = directPurchaseSlice.actions;
export default directPurchaseSlice.reducer;