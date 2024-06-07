import axios from "axios";
import { CartItemDTO } from "./DTO/CartItemDTO";
import { DeliveryInputDTO_ } from "./DTO/DeliveryFormDTO";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/delivery`;
export const fetchDelivery = async (cartId: string, provinceId: string, isRushDelivery: boolean) : Promise<DeliveryInputDTO_> => {
    try {
        console.log({
            cartId,
            province: provinceId,
            isRushDelivery
        })
        const response = await axios.get(`${API_URL}/shipping-fee`, {
            params: {
                cartId,
                province: provinceId,
                isRushDelivery
            }
        });
        return response.data;
    } catch (error) {
        return {
            normalShippingFee: 0,
            rushShippingFee: 0,
            rushDeliveryAvailable: false
        }
    }
}