'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Spin, Row, Typography, Tag, message, Pagination } from 'antd';
import PremiumProductCard from '../../components/global/PremiumProductCard';
import { getActiveSpecialOffers } from '../../utility/offerService';
import fetchApi from '../../utility/api/fetchApi';

const { Title, Text } = Typography;

const ProductsByOfferPage = () => {
    const searchParams = useSearchParams();
    const offerId = searchParams.get('offer');

    const [offers, setOffers] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [pagination, setPagination] = useState({
    //     pageCount: 0,
    //     pageNo: 1,
    //     pageSize: 30
    // }); need to correct future;
    const [loadingOffers, setLoadingOffers] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [currentOffer, setCurrentOffer] = useState(null);
    const [maxAmount, setMaxAmount] = useState(undefined);

    // Fetch offers
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await getActiveSpecialOffers();
                setOffers(data);
            } catch (error) {
                console.error('Failed to load special offers:', error);
                message.error('Failed to load special offers');
            } finally {
                setLoadingOffers(false);
            }
        };
        fetchOffers();
    }, []);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const result = await fetchApi({
                    URI: `public/products/getAll`
                });

                
                // setPagination(prev => ({
                //     ...prev,
                //     pageCount: result?.meta?.pagination?.pageCount,
                //     total: result?.meta?.pagination?.total
                // }));

                const transformedProducts = result?.map(prdct => ({
                    _id: prdct._id,
                    name: prdct.name,
                    category: {
                        _id: prdct.category?._id,
                        name: prdct.category?.name || "Uncategorized"
                    },
                    brand: {
                        _id: prdct.brand?._id,
                        name: prdct.brand?.name || "No Brand"
                    },
                    description: prdct.description,
                    stockQty: prdct.stockQty,
                    status: prdct.status,
                    images: prdct.images || [],
                    salePrice: prdct.salePrice,
                    regularPrice: prdct.regularPrice,
                    customLabel: prdct.customLabel,
                    slug: prdct.slug,
                    views: prdct.views,
                    soldCount: prdct.soldCount,
                    specs: {
                        size: prdct.specs?.size || "N/A",
                        weightStack: prdct.specs?.weightStack || 0,
                        machineWeight: prdct.specs?.machineWeight || 0,
                        color: prdct.specs?.color || "N/A",
                        details: prdct.specs?.details || ""
                    },
                    isTrending: prdct.isTrending || false,
                    isFeatured: prdct.isFeatured || false,
                    isNewArrival: prdct.isNewArrival || false,
                    isBestSeller: prdct.isBestSeller || false,
                    reviews: prdct.reviews || [],
                    createdAt: prdct.createdAt
                }));

                setProducts(transformedProducts);

                if (!maxAmount) {
                    const calculatedMaxAmount = transformedProducts.reduce((acc, product) => {
                        return Math.max(acc, product.salePrice, product.regularPrice);
                    }, 0);
                    setMaxAmount(calculatedMaxAmount);
                }

            } catch (err) {
                console.error('Error fetching products:', err);
                message.error('Failed to load products');
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);


    // Filter products based on offer
    useEffect(() => {
        if (offerId && offers.length > 0 && products.length > 0) {
            const selectedOffer = offers.find(o => o._id === offerId);

            setCurrentOffer(selectedOffer);

            if (selectedOffer) {
                let filtered = [];

                switch (selectedOffer.offerType) {
                    case 'single':
                        // Single product offer
                        if (selectedOffer.product) {
                            filtered = products.filter(p => p._id === selectedOffer.product);
                            
                        }
                        break;

                    case 'category':
                        // Category offer
                        if (selectedOffer.category) {
                            filtered = products.filter(p => p.category?._id === selectedOffer.category);
                        }
                        break;

                    case 'multiple':
                        // Multiple products offer
                        if (selectedOffer.products && selectedOffer.products.length > 0) {
                            const offerProductIds = selectedOffer.products.map(p => p._id);
                            filtered = products.filter(p => offerProductIds.includes(p._id));
                        }
                        break;

                    case 'bundle':
                        // Bundle offer (you might need special handling)
                        if (selectedOffer.products && selectedOffer.products.length > 0) {
                            const offerProductIds = selectedOffer.products.map(p => p._id);
                            filtered = products.filter(p => offerProductIds.includes(p._id));
                        }
                        break;

                    default:
                        filtered = products;
                        break;
                }

                setFilteredProducts(filtered);
            }
        } else {
            setFilteredProducts(products);
            setCurrentOffer(null);
        }
    }, [offerId, offers, products]);

    // Calculate discount for display
    const calculateDiscount = (product) => {
        if (!currentOffer || product.regularPrice <= 0) return null;

        let discountPrice = product.salePrice;

        if (currentOffer.discountType === 'percentage') {
            discountPrice = product.regularPrice * (1 - currentOffer.discountValue / 100);
        } else if (currentOffer.discountType === 'fixed') {
            discountPrice = product.regularPrice - currentOffer.discountValue;
        }

        return {
            originalPrice: product.regularPrice,
            discountedPrice: discountPrice,
            savings: product.regularPrice - discountPrice,
            discountPercent: Math.round((1 - discountPrice / product.regularPrice) * 100)
        };
    };


    // const handlePageChange = (page, pageSize) => {
    //     setPagination(prev => ({
    //         ...prev,
    //         pageNo: page,
    //         pageSize
    //     }));
    // };


    return (
        <div style={{ padding: 24, minHeight: '80vh' }}>
            {/* Offer Header */}
            {currentOffer && (
                <div style={{
                    marginBottom: 32,
                    padding: 24,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 1px 8px rgba(0,0,0,0.1)'
                }}>
                    <Title level={2} style={{ color: '#e53935', marginBottom: 8 }}>
                        Special Offer: {currentOffer.title}
                    </Title>

                    <Text style={{ fontSize: 16, display: 'block', marginBottom: 16 }}>
                        {currentOffer.description}
                    </Text>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <Tag color="red" style={{ fontSize: 14, padding: '4px 8px' }}>
                            {currentOffer.discountType === 'percentage'
                                ? `${currentOffer.discountValue}% OFF`
                                : `$${currentOffer.discountValue} OFF`
                            }
                        </Tag>
                        <Tag color="blue" style={{ fontSize: 14, padding: '4px 8px' }}>
                            Valid until: {new Date(currentOffer.endDate).toLocaleDateString()}
                        </Tag>
                        <Tag color="green" style={{ fontSize: 14, padding: '4px 8px' }}>
                            {filteredProducts.length} product(s) available
                        </Tag>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            {loadingOffers || loadingProducts ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    {filteredProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <Title level={4}>No products found</Title>
                            <Text>There are no products available for this offer.</Text>
                        </div>
                    ) : (
                        <>
                            <Row gutter={[16, 24]}>
                                {filteredProducts.map((product) => (
                                    <PremiumProductCard
                                        key={product._id}
                                        product={product}
                                        offer={currentOffer}
                                        discountInfo={calculateDiscount(product)}
                                    />
                                ))}
                            </Row>
                            {/* {pagination.pageCount > 1 && (
                                <div style={{ marginTop: 32, textAlign: 'center' }}>
                                    <Pagination
                                        current={pagination.pageNo}
                                        pageSize={pagination.pageSize}
                                        total={pagination.total}
                                        showSizeChanger
                                        pageSizeOptions={['10', '20', '50']}
                                        onChange={handlePageChange}
                                        onShowSizeChange={handlePageChange}
                                    />
                                </div>
                            )} */}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsByOfferPage;