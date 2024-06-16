<<<<<<< HEAD
export const fetchDelivery = async (cartId: string, provinceId: string, isRushDelivery: boolean) => {
    if (isRushDelivery) return {
        isRushDelivery: provinceId == "01",
        normalShippingFee: 20000,
        rushShippingFee: 30000
    }
    return {
        normalShippingFee: 20000,
        rushShippingFee: 0
    }
    // const response = await fetch(`/api/delivery/${id}`);
    // return response.json();
=======
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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
}