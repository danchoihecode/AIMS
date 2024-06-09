import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { getCartItems, getTaxRate } from "@/api/DTO/apifunc";
import DeliveryForm from "@/components/delivery/delivery-form";

interface CheckoutDTO {
    allItems: CartItemDTO[];
    taxRate: number;
}

export default async function Checkout() {
    const allItems = await getCartItems();
    const taxRate = await getTaxRate();
    console.log(allItems, taxRate);
    return <DeliveryForm cartItems={allItems} taxRate={taxRate} />;
}