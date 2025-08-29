'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Space,
  Typography,
  Divider,
  Badge,
  message,
  Spin,
  Alert,
  Image,
  Tag
} from 'antd';

import {
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  CheckOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  HeartOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import fetchApi from '../../../utility/api/fetchApi';
import { setLoading, removeFromCart, setCart, setError, updateCartItemQuantity } from '../../../utility/redux/cartSlice';
import updateApi from '../../../utility/api/updateAPI';
import { useRouter } from 'next/navigation';
import { showToast } from '../../../utility/redux/toastSlice';
import { productUrl } from '../../../utility/api/constant';
const { Title, Text } = Typography;

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, loading, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  useEffect(() => {
    if (user?.userId && user?.token) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetchApi({ 
        URI: `customers/cart/${user?.userId}`, 
        API_TOKEN: user.token 
      });
      dispatch(setCart(response.data?.items || []));
    } catch (err) {
      console.log("error is", err);
      dispatch(setError(err.response?.data?.message || 'Failed to fetch cart'));
      message.error(err.response?.data?.message || 'Failed to fetch cart data');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      message.warning('Quantity must be at least 1');
      return;
    }

    try {
      setUpdatingItems(prev => new Set(prev).add(productId));
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));

      if (user?.userId) {
        await updateApi({
          URI: "customers/cart/update",
          token: user.token,
          Data: {
            userId: user.userId,
            productId,
            quantity: newQuantity
          }
        });
      }
    } catch (err) {
      message.error('Failed to update quantity');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      dispatch(removeFromCart(productId));

      if (user?.userId) {
        await updateApi({
          URI: "customers/cart/remove",
          token: user.token,
          Data: {
            userId: user.userId,
            productId
          }
        });
      }
      message.success('Item removed from cart');
    } catch (err) {
      message.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      message.warning('Your cart is empty');
      return;
    }
    router.push('/checkout');
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      return total + (item.product.salePrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return items.reduce((total, item) => {
      return total + ((item.product.regularPrice - item.product.salePrice) * item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const getProductImage = (product) => {
    return product.images && product.images.length > 0 
      ? `${productUrl}/${product.images[0]}`
      : '/api/placeholder/300/300';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert
          message="Error Loading Cart"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={fetchCart}>
              Try Again
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary"
          >
            Continue Shopping
          </Button>
          
          <div className="flex items-center">
            <ShoppingCartOutlined className="text-2xl text-primary mr-2" />
            <Title level={2} className="!mb-0 !text-gray-800">
              Your Cart
            </Title>
            <Badge
              count={items.length}
              showZero
              className="ml-3"
              style={{ backgroundColor: '#10B981' }}
            />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <ShoppingCartOutlined className="w-full h-full" />
            </div>
            <Title level={3} className="!text-gray-700 !mb-4">
              Your cart is empty
            </Title>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/products')}
              className="px-8"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm border-0">
                <div className="space-y-6">
                  {items.map((item) => {
                    const product = item.product;
                    const isUpdating = updatingItems.has(product._id);
                    
                    return (
                      <div key={product._id} className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 last:border-b-0">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={getProductImage(product)}
                            alt={product.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover"
                            fallback="/api/placeholder/300/300"
                            preview={false}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {product.brand?.name}
                              </p>
                              {product.specs?.color && (
                                <Tag color="blue" className="text-xs">
                                  Color: {product.specs.color}
                                </Tag>
                              )}
                              {product.specs?.size && (
                                <Tag color="green" className="text-xs ml-2">
                                  Size: {product.specs.size}
                                </Tag>
                              )}
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                {product.regularPrice > product.salePrice && (
                                  <Text delete className="text-gray-400 text-sm">
                                    AED {product.regularPrice}
                                  </Text>
                                )}
                                <Text strong className="text-lg text-primary">
                                  AED {product.salePrice}
                                </Text>
                              </div>
                              <Text className="text-gray-600 text-sm">
                                each
                              </Text>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                icon={<MinusOutlined />}
                                size="small"
                                onClick={() => handleQuantityChange(product._id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || isUpdating}
                                loading={isUpdating}
                              />
                              
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              
                              <Button
                                icon={<PlusOutlined />}
                                size="small"
                                onClick={() => handleQuantityChange(product._id, item.quantity + 1)}
                                disabled={isUpdating}
                                loading={isUpdating}
                              />
                            </div>

                            {/* Subtotal and Actions */}
                            <div className="flex items-center space-x-4">
                              <Text strong className="text-lg">
                                AED {(product.salePrice * item.quantity).toFixed(2)}
                              </Text>
                              
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleRemoveItem(product._id)}
                                className="text-red-500 hover:text-red-700"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm border-0 sticky top-24">
                <Title level={4} className="!mb-6">
                  Order Summary
                </Title>

                <div className="space-y-4">
                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Text>Subtotal</Text>
                      <Text>AED {calculateSubtotal().toFixed(2)}</Text>
                    </div>
                    
                    {calculateDiscount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <Text>Discount</Text>
                        <Text>-AED {calculateDiscount().toFixed(2)}</Text>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <Text>Shipping</Text>
                      <Text className="text-green-600">Free</Text>
                    </div>
                    
                    <Divider className="my-4" />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <Text>Total</Text>
                      <Text className="text-primary">
                        AED {calculateTotal().toFixed(2)}
                      </Text>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<CheckOutlined />}
                    onClick={handleCheckout}
                    className="h-12 text-lg font-semibold"
                  >
                    Proceed to Checkout
                  </Button>

                  {/* Additional Actions */}
                  <div className="flex space-x-2">
                    <Button
                      icon={<HeartOutlined />}
                      block
                      className="flex-1"
                    >
                      Save for Later
                    </Button>
                    <Button
                      icon={<ShareAltOutlined />}
                      block
                      className="flex-1"
                    >
                      Share Cart
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="text-center pt-4 border-t border-gray-100 mt-4">
                    <Text type="secondary" className="text-xs">
                      🔒 Secure checkout · SSL encrypted
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;