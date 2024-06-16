import { Response, axiosWithErrorHandling } from "./axiosConfig";
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/order`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getOrder = async () : Promise<Response>=> {
    const orderId = localStorage.getItem("orderId");
    if (!orderId) {
        return {
            data: null,
            error: new Error("Order not found"),
        };
    }
    const { data, error } = await axiosWithErrorHandling(axiosInstance,{
        method: "GET",
        params : {
            orderId
        }
    });
    return {
        data: error ? null : data,
        error,
    };
}
