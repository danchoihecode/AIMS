import axios from "axios";
import { CartItemDTO } from "./DTO/CartItemDTO";
import { DeliveryInfoDTO, ShippingFeeDTO } from "./DTO/DeliveryFormDTO";
import { axiosWithErrorHandling } from "./axiosConfig";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/delivery`;
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
export const getDeliveryFees = async (
    provinceId: string,
    isRushDelivery: boolean
): Promise<ShippingFeeDTO> => {
    try {
        const cartId = localStorage.getItem("cartId");
        const response = await axios.get(`${API_URL}/shipping-fee`, {
            params: {
                cartId,
                province: provinceId,
                isRushDelivery,
            },
        });
        return response.data;
    } catch (error) {
        return {
            normalShippingFee: 0,
            rushShippingFee: 0,
            rushDeliveryAvailable: false,
        };
    }
};
export const submitDelivery = async (
    deliveryInfo: DeliveryInfoDTO,
    normalShippingFee: number,
    rushShippingFee: number
) => {
    const cartId = localStorage.getItem("cartId");
    return axiosWithErrorHandling(axiosInstance, {
        method: "POST",
        data: {
            deliveryInfo,
            shippingFee: { normalShippingFee, rushShippingFee },
            cartId,
        },
    });
};
