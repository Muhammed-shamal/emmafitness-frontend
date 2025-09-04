import axios from "axios";

export const baseUrl = 'http://localhost:5000';
export const productUrl = 'http://localhost:5000/productImages';
export const categoryUrl = 'http://localhost:5000/categoryImage';
export const brandUrl = 'http://localhost:5000/brandImage';
export const bannerUrl = 'http://localhost:5000/bannerImage';
export const storeUrl = 'http://localhost:5000/storeImage';

//new url with https sub of levender;
// export const baseUrl = "https://apiemmafitness.delavendervipspa.shop";
// export const productUrl = "https://apiemmafitness.delavendervipspa.shop/productImages";
// export const categoryUrl = "https://apiemmafitness.delavendervipspa.shop/categoryImage";
// export const brandUrl = "https://apiemmafitness.delavendervipspa.shop/brandImage";
// export const bannerUrl = 'https://apiemmafitness.delavendervipspa.shop/bannerImage';
// export const storeUrl = 'https://apiemmafitness.delavendervipspa.shop/storeImage';


const baseUrlCurrency = "https://api.freecurrencyapi.com";
export const Currency_instance = axios.create({ baseURL: baseUrlCurrency });

export const Currency_APIKEY =
  "fca_live_5zjCrTA47YcSjMNHT7DkrxYIRmXSRIHJnSFTkbXt";