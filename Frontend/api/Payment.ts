import axios from "axios";
import { axiosWithErrorHandling } from "./axiosConfig";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/payment`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getPaymentURL = async () => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance, {
        url: '/pay',
        params: {
            orderId: localStorage.getItem("orderId"),
            paymentMethod: "VNPay",
        },
    });
    return {
        data: error ? null : data,
        error,
    };
}
export const savePayment = async (paymentInfo: any) => {
    const orderId = localStorage.getItem("orderId");
    const { error } = await axiosWithErrorHandling(axiosInstance, {
        method: "POST",
        url: `/result/${orderId}`,
        data: paymentInfo,
    });
    console.log(error);
    return {
        data: null,
        error,
    };
}