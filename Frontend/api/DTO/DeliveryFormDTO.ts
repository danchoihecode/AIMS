import { CartItemDTO } from "./CartItemDTO";

export interface DeliveryFormDTO {
    name: string;
    email: string;
    phone: string;
    province: string;
    address: string;
    date: Date;
    note: string;
}
export interface DeliveryInputDTO {
    cartItems: CartItemDTO[];
    normalShippingFee: number;
    rushShippingFee: number;
    taxRate: number;
}
export interface DeliveryInputDTO_ {
    normalShippingFee: number;
    rushShippingFee: number;
    rushDeliveryAvailable: boolean;
}