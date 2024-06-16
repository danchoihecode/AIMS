import { DeliveryInfoDTO } from "./DeliveryFormDTO";

export interface OrderDTO {
    id: number;
    cart: {
        id: number;
    }
    normalShippingFees: number;
    rushShippingFees: number;
    deliveryInfo: DeliveryInfoDTO;
    state: string;
}