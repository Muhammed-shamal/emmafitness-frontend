import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    type: null, // 'success' | 'error' | 'loading'
    message: '',
  },
  reducers: {
    showToast: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearToast: (state) => {
      state.type = null;
      state.message = '';
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
