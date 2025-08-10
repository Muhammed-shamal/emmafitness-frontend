'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { message } from 'antd';
import {getActiveSpecialOffers} from '../offerService'

const OffersContext = createContext({
  offers: [],
  loading: false,
  refreshOffers: () => {}
});

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const data = await getActiveSpecialOffers();
      setOffers(data);
    } catch (error) {
      message.error('Failed to load special offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <OffersContext.Provider value={{ offers, loading, refreshOffers: fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => useContext(OffersContext);