'use client';

import { Alert, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import fetchApi from '../../../utility/api/fetchApi';
import ProductCard from '../../../components/global/ProductCard';
import { productUrl } from '../../../utility/api/constant';
import Link from 'next/link';

function Page({ params }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from server when component mounts
    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetchApi({ URI: `public/products/${params.category}` });
                console.log('response by categor', response)
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ maxWidth: 600, margin: '50px auto', textAlign: 'center' }}>
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 24,
                maxWidth: 1200,
                margin: '0 auto',
            }}
        >

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                {products.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="mb-6">
                            <svg
                                className="w-20 h-20 text-gray-300 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 10h.01M15 10h.01"
                                />
                            </svg>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No products found
                        </h3>

                        <p className="text-gray-500 mb-6 max-w-md">
                            We couldn&rsquo;t find any products in this category.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => window.history.back()}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                Go Back
                            </button>

                            <Link
                                href="/products"
                                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-center"
                            >
                                Browse Products
                            </Link>
                        </div>
                    </div>
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            Id={product._id}
                            Brand={product?.brand.name}
                            Title={product?.name}
                            Category={product?.category?.name}
                            SalePrice={product?.salePrice}
                            RegularPrice={product?.regularPrice}
                            ImageUrl={`${productUrl}/${product?.images?.[0]}`}
                            createdAt={product?.createdAt}
                            Slug={product?.slug}
                            CustomLabel={product.customLabel}
                            isNewArrival={product?.isNewArrival}
                            isTrending={product?.isTrending}
                            isFeatured={product?.isFeatured}
                            isBestSeller={product?.isBestSeller}
                            reviews={product?.reviews}
                        />
                    ))
                )}
            </div>
        </div>
    );
}


export default Page