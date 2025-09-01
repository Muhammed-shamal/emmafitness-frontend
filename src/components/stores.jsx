'use client';

import { Row, Col, Card, Typography, Button, Tag, Divider } from 'antd';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Navigation,
  ExternalLink,
  Store
} from 'lucide-react';
import { useEffect, useState } from 'react';
import fetchApi from '../utility/api/fetchApi';
import { storeUrl } from '../utility/api/constant';

const { Title, Text } = Typography;

export default function StorePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi({ URI: "public/stores" });
        setData(response);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  const getDirectionsUrl = (address) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <Store className="w-8 h-8 text-primary" />
        </div>
        <Title level={1} className="!text-3xl sm:!text-4xl lg:!text-5xl !mb-4 text-gray-900">
          Find Your Nearest Store
        </Title>
        <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our physical locations across the UAE. Visit us for personalized service and expert advice.
        </Text>
      </div>

      {/* Stores Grid */}
      <div >
        <Row gutter={[32, 32]} >
          {loading ? (
            // Enhanced loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </Col>
            ))
          ) : data && data.length > 0 ? (
            // Store cards
            data.map((store) => (
              <Col xs={24} sm={12} md={8} lg={6} key={store._id}>
                <Card
                  className="store-card h-full border-0 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  bodyStyle={{ padding: 0 }}
                  cover={
                    <div className="relative">
                      <img
                        alt={store.title}
                        src={`${storeUrl}/${store.image}`}
                        className="h-48 w-full object-cover rounded-t-2xl"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/300/200';
                        }}
                      />
                      {store.isFeatured && (
                        <Tag color="gold" className="absolute top-3 left-3">
                          Featured
                        </Tag>
                      )}
                    </div>
                  }
                >
                  <div className="p-6">
                    {/* Store Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-1">
                      {store.title}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start mb-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                      <Text className="text-gray-600 text-sm line-clamp-2">
                        {store.address}
                      </Text>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center mb-3">
                      <Phone className="w-4 h-4 text-gray-500 mr-2" />
                      <a
                        href={`tel:+971${store.phone}`}
                        className="text-gray-700 hover:text-primary transition-colors text-sm"
                      >
                        +971 {store.phone}
                      </a>
                    </div>

                    {/* Hours (if available) */}
                    {store.openingHours && (
                      <div className="flex items-start mb-4">
                        <Clock className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <Text className="text-gray-600 text-xs">
                          {store.openingHours}
                        </Text>
                      </div>
                    )}

                    {/* Rating (if available) */}
                    {store.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {store.rating}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm ml-1">
                          ({store.reviewCount || '0'} reviews)
                        </span>
                      </div>
                    )}

                    <Divider className="my-4" />

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2">
                      <Button
                        type="primary"
                        icon={<Navigation className="w-4 h-4" />}
                        href={getDirectionsUrl(store.address)}
                        target="_blank"
                        className="w-full"
                        size="large"
                      >
                        Get Directions
                      </Button>

                      <Button
                        icon={<Phone className="w-4 h-4" />}
                        href={`tel:+971${store.phone}`}
                        className="w-full"
                        size="large"
                      >
                        Call Store
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            // Enhanced empty state
            <Col span={24}>
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Store className="w-12 h-12 text-gray-400" />
                </div>
                <Title level={3} className="!text-2xl !mb-4 text-gray-700">
                  No Stores Available
                </Title>
                <Text className="text-gray-500 text-lg mb-8 block">
                  We don&rsquo;t have any physical stores listed at the moment.
                </Text>
                <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <Button size="large" icon={<ExternalLink className="w-4 h-4" />}>
                    Contact Support
                  </Button>
                  <Button size="large">
                    Check Online Services
                  </Button>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>

      {/* Additional Info Section */}
      {data && data.length > 0 && (
        <div className="mt-16 p-6 bg-white rounded-2xl shadow-sm">
          <div className="text-center">
            <Title level={3} className="!text-2xl !mb-4">
              Why Visit Our Stores?
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h4 className="font-semibold mb-2">Expert Advice</h4>
                <p className="text-gray-600 text-sm">Get personalized recommendations from our trained staff</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <h4 className="font-semibold mb-2">Try Before You Buy</h4>
                <p className="text-gray-600 text-sm">Experience our products firsthand before making a decision</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h4 className="font-semibold mb-2">Same-Day Pickup</h4>
                <p className="text-gray-600 text-sm">Take your purchases home immediately after shopping</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .store-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
