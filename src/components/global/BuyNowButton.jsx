'use client'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../utility/redux/cartSlice';

function BuyNow({ productId, productData }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBuyNow = () => {
    try {
      // Add minimal product data if available, or just ID if not
      const product = productData || { _id: productId };
      
      dispatch(addToCart({
        product,
        quantity: 1
      }));
      
      message.success('Added to cart');
      router.push('/cart');
    } catch (error) {
      message.error('Failed to add to cart');
      console.error('BuyNow error:', error);
    }
  };

  return (
    <Button 
      className='text-blue-400 border border-blue-500 flex-1 h-10 rounded-none gap-2 text-center flex items-center justify-center hover:!border-blue-500 hover:!text-blue-400'
      onClick={handleBuyNow}
      icon={<ShoppingCartOutlined />}
    >
      Buy Now
    </Button>
  );
}

export default BuyNow;