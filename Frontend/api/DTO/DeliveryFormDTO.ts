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
<<<<<<< HEAD
=======
}
export interface DeliveryInputDTO_ {
    normalShippingFee: number;
    rushShippingFee: number;
    rushDeliveryAvailable: boolean;
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
}