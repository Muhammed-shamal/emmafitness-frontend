'use client';

import { useEffect } from 'react';

const WarningToast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${
      type === 'error' 
        ? 'bg-red-50 border-red-500 text-red-700' 
        : 'bg-green-50 border-green-500 text-green-700'
    }`}>
      <div className="flex items-center">
        <span className="mr-2">{type === 'error' ? '⚠️' : '✅'}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default WarningToast;