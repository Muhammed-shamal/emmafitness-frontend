import React from 'react';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import { bannerUrl } from '../utility/api/constant';

const Section = ({ data }) => {
   return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Main Promotion Card */}
          <Card
            className="md:w-2/3 group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500"
            bodyStyle={{ padding: 0 }}
            cover={
              <div className="h-80 md:h-96 w-full relative overflow-hidden">
                <img
                  src={`${bannerUrl}/${data.image}`}
                  alt={data.title || "Main Banner"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            }
          >
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white max-w-md">
              {/* Badge */}
              <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                Premium Collection
              </span>
              
              {/* Title */}
              <p className="text-sm md:text-base font-medium mb-2 opacity-90">{data.title || "New Gym Collection"}</p>

              {/* Description */}
              {data.description && (
                <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                  {data.description}
                </h3>
              )}

              {/* Shop Button */}
              <Button
                type="primary"
                color='red'
                size="large"
                className="mt-4 h-12 px-6 rounded-full flex items-center"
              >
                <Link href="/products" className="text-white flex items-center">
                  Shop Now
                  <ArrowRightOutlined className="ml-2" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Side Promotions */}
          <div className="md:w-1/3 flex flex-col gap-6 md:gap-8">
            {(() => {
              // Shuffle subBanners and pick 2
              const shuffledBanners = [...data?.subBanners].sort(() => 0.5 - Math.random());
              const bannersToShow = shuffledBanners.slice(0, 2);

              return bannersToShow.map((value, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-500 flex-1"
                  bodyStyle={{ padding: 0 }}
                  cover={
                    <div className="h-56 w-full relative overflow-hidden">
                      <img
                        src={`${bannerUrl}/${value.image}`}
                        alt={value.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  }
                >
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                    <Button 
                      type="default" 
                      size="middle"
                      href='/featured/products'
                      className="bg-white text-gray-900 border-0 hover:bg-gray-100 rounded-full"
                    >
                      Explore
                    </Button>
                  </div>
                </Card>
              ));
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;