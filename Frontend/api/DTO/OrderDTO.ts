import { DeliveryInfoDTO } from "./DeliveryFormDTO";
export interface OrderDTO {
    id: string;
    name: string;
    amount: number;
    state: string;
}
export interface ClientOrderDTO {
    id: number;
    cart: {
        id: number;
    }
    normalShippingFees: number;
    rushShippingFees: number;
    deliveryInfo: DeliveryInfoDTO;
    state: string;
}