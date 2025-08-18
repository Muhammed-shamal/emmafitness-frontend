import axios from "axios";

// export const baseUrl = "https://emmafitness-server.onrender.com";
// export const productUrl = "https://emmafitness-server.onrender.com/productImages";
// export const categoryUrl = "https://emmafitness-server.onrender.com/categoryImage";
// export const brandUrl = "https://emmafitness-server.onrender.com/brandImage";
// export const bannerUrl = 'https://emmafitness-server.onrender.com/bannerImage';
// export const storeUrl = 'https://emmafitness-server.onrender.com/storeImage';

export const baseUrl = 'http://localhost:5000';
export const productUrl = 'http://localhost:5000/productImages';
export const categoryUrl = 'http://localhost:5000/categoryImage';
export const brandUrl = 'http://localhost:5000/brandImage';
export const bannerUrl = 'http://localhost:5000/bannerImage';
export const storeUrl = 'http://localhost:5000/storeImage';

// export const baseUrl = "http://13.229.109.96:5000";
// export const productUrl = "http://13.229.109.96:5000/productImages";
// export const categoryUrl = "http://13.229.109.96:5000/categoryImage";
// export const brandUrl = "http://13.229.109.96:5000/brandImage";
// export const bannerUrl = 'http://13.229.109.96:5000/bannerImage';
// export const storeUrl = 'http://13.229.109.96:5000/storeImage';


//new url with https because of ngrok;
// export const baseUrl = "https://516b967e2789.ngrok-free.app";
// export const productUrl = "https://516b967e2789.ngrok-free.app/productImages";
// export const categoryUrl = "https://516b967e2789.ngrok-free.app/categoryImage";
// export const brandUrl = "https://516b967e2789.ngrok-free.app/brandImage";
// export const bannerUrl = 'https://516b967e2789.ngrok-free.app/bannerImage';
// export const storeUrl = 'https://516b967e2789.ngrok-free.app/storeImage';


const baseUrlCurrency = "https://api.freecurrencyapi.com";
export const Currency_instance = axios.create({ baseURL: baseUrlCurrency });

export const Currency_APIKEY =
  "fca_live_5zjCrTA47YcSjMNHT7DkrxYIRmXSRIHJnSFTkbXt";