import { axiosWithErrorHandling } from "./axiosConfig";
import axios from "axios";
import { Response } from "./axiosConfig";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/invoice`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getInvoiceByOrderId = async (orderId: string) : Promise<Response>=> {
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