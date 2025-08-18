
import fetchApi from "./api/fetchApi";

export const getActiveSpecialOffers = async () => {
    try {
        const response = await fetchApi({ URI: "public/banner/offers/active" });
        console.log("resposne from active offers",response)
        return response;
    } catch (error) {
        console.error('Error fetching special offers:', error);
        throw error;
    }
};