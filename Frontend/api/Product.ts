import axios from "axios";
import { axiosWithErrorHandling } from "./axiosConfig";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
    baseURL: `${API_ENDPOINT}/products`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
export const getProducts = async () => {
    const config = {
        method: "GET",
    };
    return axiosWithErrorHandling(axiosInstance, config);
}
export const getProductDetails = async (productId: string) => {
    const config = {
        method: "GET",
        url: `${productId}`,
    };
    return axiosWithErrorHandling(axiosInstance, config);
}
