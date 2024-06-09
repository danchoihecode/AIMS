import axios from "axios";
import { CartItemDTO } from "./DTO/CartItemDTO";
import { DeliveryInfoDTO, DeliveryInputDTO_ } from "./DTO/DeliveryFormDTO";
import { axiosWithErrorHandling } from "./DTO/apifunc";
import { getData } from "@/lib/cookies-data";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/delivery`;
export const fetchDelivery = async (
    provinceId: string,
    isRushDelivery: boolean
): Promise<DeliveryInputDTO_> => {
    try {
        const cartId = await getData("cartId");
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
    rushShippingFee: number,
) => {
    const cartId = await getData("cartId");
    return axiosWithErrorHandling({
        method: "POST",
        url: `${API_URL}`,
        data: { deliveryInfo, normalShippingFee, rushShippingFee, cartId },
    });
};
