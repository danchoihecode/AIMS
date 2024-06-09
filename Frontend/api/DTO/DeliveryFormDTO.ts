import { CartItemDTO } from "./CartItemDTO";

export interface DeliveryInfoDTO {
    name: string;
    email: string;
    phone: string;
    province: string;
    address: string;
    deliveryTime?: Date;
    instructions?: string;
    isRushOrder: boolean;
}
export interface DeliveryInputDTO {
    cartItems: CartItemDTO[];
    normalShippingFee: number;
    rushShippingFee: number;
    taxRate: number;
}
export interface ShippingFeeDTO {
    normalShippingFee: number;
    rushShippingFee: number;
    rushDeliveryAvailable: boolean;
}