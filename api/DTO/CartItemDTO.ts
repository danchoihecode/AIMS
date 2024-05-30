export interface CartItemDTO {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
    isRushDelivery?: boolean;
}