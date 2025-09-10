import React  from 'react';
import { useDispatch } from 'react-redux';
import { setDirectPurchase } from '../../utility/redux/directPurchaseSlice';
import { useRouter } from 'next/navigation';

export const BuyNow2 = ({ product }) => {
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBuyNow = () => {
    dispatch(setDirectPurchase({
      product: product,
      quantity: 1 // or get from quantity selector
    }));
    
    router.push('/checkout');
  };

  return (
    <>
      <button
        onClick={handleBuyNow}
        disabled={product?.stockQty < 1}
        className={`flex items-center justify-center gap-1 px-4 py-2 rounded text-sm font-medium transition-all duration-200 
    ${product?.stockQty < 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md'
          }
    sm:px-6 sm:py-3 sm:gap-2 sm:text-base
  `}
      >
        Buy Now
      </button>
    </>
  );
};