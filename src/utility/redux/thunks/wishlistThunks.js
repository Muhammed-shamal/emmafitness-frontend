import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import {
  addToWishList,
  removeWishList,
  setWishList,
  setLoading
} from '../wishListSlice';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId, { dispatch }) => {
    dispatch(setLoading(true));
    const { data } = await axios.get(`/wishlist/${userId}`);
    dispatch(setWishList(data?.items || []));
    dispatch(setLoading(false));
  }
);

export const addWishlistItem = createAsyncThunk(
  'wishlist/addItem',
  async ({ userId, productId }, { dispatch }) => {
    const { data } = await axios.post('/wishlist', { userId, productId });
    dispatch(addToWishList(data.data)); // data.data.items from your controller
  }
);

export const removeWishlistItem = createAsyncThunk(
  'wishlist/removeItem',
  async ({ userId, productId }, { dispatch }) => {
    const { data } = await updateApi({ URI: `customers/wishlist/remove`, token: user.token });
    dispatch(setWishList(data.data.items));
  }
);
