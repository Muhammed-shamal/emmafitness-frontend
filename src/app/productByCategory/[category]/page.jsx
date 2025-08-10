'use client';

import { Alert, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import fetchApi from '../../../utility/api/fetchApi';
import ProductCard from '../../../components/global/ProductCard';
import { productUrl } from '../../../utility/api/constant';

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
                    <p>No products found in this category.</p>
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
                        />
                    ))
                )}
            </div>
        </div>
    );
}


export default Page