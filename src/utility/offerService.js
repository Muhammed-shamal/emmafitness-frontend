
import fetchApi from "./api/fetchApi";

export const getActiveSpecialOffers = async () => {
    try {
        const response = await fetchApi({ URI: "public/banner/offers/active" });
        return response;
    } catch (error) {
        console.error('Error fetching special offers:', error);
        throw error;
    }
};