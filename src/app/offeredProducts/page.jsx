'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Col, Row, Spin, Typography, Tag, Button, Pagination } from 'antd';
import fetchApi from '../../utility/api/fetchApi';
import { useOffers } from '../../utility/context/OfferContext';
import Image from 'next/image';
import { productUrl } from '../../utility/api/constant';
import PremiumProductCard from '../../components/global/PremiumProductCard';

const { Title, Text } = Typography;

const ProductsByOfferPage = () => {
    const searchParams = useSearchParams();
    const offerId = searchParams.get('offer');
    const { offers } = useOffers();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pagination, setPagination] = useState({ pageCount: 0, pageNo: 1, pageSize: 30 })
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentOffer, setCurrentOffer] = useState(null);
    const [maxAmount, setMaxAmount] = useState(undefined)

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true)
                const result = await fetchApi({ URI: `public/products?populate=customLabel&populate=category.name,brand.Name&sort=createdAt:Desc&pagination[page]=${pagination?.pageNo}&pagination[pageSize]=${pagination?.pageSize}` })
                console.log('result in products page', result)
                setPagination(prv => ({ ...prv, pageCount: result?.meta?.pagination?.pageCount, element: <Pagination onChange={handlePagination} responsive={true} pageSize={result?.meta?.pagination?.pageSize} showSizeChanger={false} total={result?.meta?.pagination?.total} /> }))

                setProducts(result?.data?.map(prdct => ({
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
                })));

                if (!maxAmount) {
                    const maxAmount = result?.data?.reduce((acc, prdct) => {
                        const salePrice = prdct?.attributes?.Sale_Price || 0;
                        const regularPrice = prdct?.attributes?.Regular_Price || 0;
                        return Math.max(acc, salePrice, regularPrice);
                    }, 0);
                    setMaxAmount(maxAmount);
                }


            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)

            }
        }
        fetch()
    }, [reload, searchParams])

    useEffect(() => {

        if (offerId && offers.length > 0) {
            const selectedOffer = offers.find(o => o._id === offerId);
            console.log("seelctd offeer", selectedOffer)
            setCurrentOffer(selectedOffer);

            if (selectedOffer) {
                let filtered = [];

                if (selectedOffer.offerType === 'single') {
                    filtered = products.filter(p => p._id === selectedOffer.product?._id);
                }
                else if (selectedOffer.offerType === 'category') {
                    filtered = products.filter(p => p.category?._id === selectedOffer.category?._id);
                }
                else if (selectedOffer.offerType === 'multiple') {
                    const offerProductIds = selectedOffer.products?.map(p => p._id);
                    filtered = products.filter(p => offerProductIds?.includes(p._id));
                }

                setFilteredProducts(filtered);
            }
        } else {
            setFilteredProducts(products);
            setCurrentOffer(null);
        }
    }, [offerId, offers, products]);

    const calculateDiscountedPrice = (price, offer) => {
        if (offer.discountType === 'percentage') {
            return (price * (1 - offer.discountValue / 100)).toFixed(2);
        }
        if (offer.discountType === 'fixed') {
            return (price - offer.discountValue).toFixed(2);
        }
        return price.toFixed(2);
    };

    const handlePagination = (pageNo) => {
        setPagination(prv => ({ ...prv, pageNo }))
        setReload(rl => !rl)
        window.scrollTo({ top: 0, behavior: "smooth" });

    }

    console.log("filteredProducts", filteredProducts)
    return (
        <div style={{ padding: 24 }}>
            {currentOffer && (
                <div style={{ marginBottom: 24 }}>
                    <Title level={3}>Special Offer: {currentOffer.title}</Title>
                    <Text>{currentOffer.description}</Text>
                    <div style={{ marginTop: 8 }}>
                        <Tag color="red">Valid until: {new Date(currentOffer.endDate).toLocaleDateString()}</Tag>
                    </div>
                </div>
            )}

            {loading ? (
                <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
            ) : (
                <Row gutter={[16, 16]}>
                    {(offerId ? filteredProducts : products).map((product) => (
                        <PremiumProductCard product={product}
                            onAddToCart={() => console.log('Add to cart', product._id)} />
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ProductsByOfferPage;