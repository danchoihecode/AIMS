import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { getCartItems } from "@/api/DTO/apifunc";
import DeliveryForm from "@/components/delivery/delivery-form";

interface CheckoutDTO {
    allItems: CartItemDTO[];
    taxRate: number;
}

export default async function Checkout() {
    const allItems = await getCartItems();
    console.log(allItems);
    const taxRate = 0.1;
    return (
        <DeliveryForm
            cartItems={allItems}
            taxRate={taxRate}
        />
    );
}
