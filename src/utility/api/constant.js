import axios from "axios";

export const baseUrl = "https://emmafitness-server.onrender.com";
export const productUrl = "https://emmafitness-server.onrender.com/productImages";
export const categoryUrl = "https://emmafitness-server.onrender.com/categoryImage";
export const brandUrl = "https://emmafitness-server.onrender.com/brandImage";
export const bannerUrl = 'https://emmafitness-server.onrender.com/bannerImage';
export const storeUrl = 'https://emmafitness-server.onrender.com/storeImage';

// export const baseUrl = 'http://localhost:1000';
// export const productUrl = 'http://localhost:1000/productImages';
// export const categoryUrl = 'http://localhost:1000/categoryImage';
// export const brandUrl = 'http://localhost:1000/brandImage';
// export const bannerUrl = 'http://localhost:1000/bannerImage';
// export const storeUrl = 'http://localhost:1000/storeImage';


const baseUrlCurrency = "https://api.freecurrencyapi.com";
export const Currency_instance = axios.create({ baseURL: baseUrlCurrency });

export const Currency_APIKEY =
  "fca_live_5zjCrTA47YcSjMNHT7DkrxYIRmXSRIHJnSFTkbXt";