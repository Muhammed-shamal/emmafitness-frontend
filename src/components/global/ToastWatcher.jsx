'use client';

import { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from '../../utility/redux/toastSlice';

function ToastWatcher() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);

  useEffect(() => {
    if (toast?.type && toast?.message) {
      notification[toast.type]({
        message: toast.type === 'error' ? 'Error' : 'Notification',
        description: toast.message,
        placement: 'topRight',
        duration: 4,
      });

      dispatch(clearToast());
    }
  }, [toast, dispatch]);

  return null; // invisible component
}

export default ToastWatcher;