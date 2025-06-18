'use client'

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { clearToast } from '../utility/redux/toastSlice';

export default function ToastListener() {
  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state.toast);

  useEffect(() => {
    if (message) {
      if (type === 'success') toast.success(message);
      else if (type === 'error') toast.error(message);
      else if (type === 'loading') toast.loading(message);

      setTimeout(() => dispatch(clearToast()), 1000); // clear after showing
    }
  }, [type, message]);

  return null;
}
