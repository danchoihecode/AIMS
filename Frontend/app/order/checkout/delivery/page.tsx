import { CartItemDTO } from "@/api/DTO/CartItemDTO";
<<<<<<< HEAD
import { getCartItems } from "@/api/DTO/apifunc";
=======
import { getCartItems, getTaxRate } from "@/api/DTO/apifunc";
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
import DeliveryForm from "@/components/delivery/delivery-form";

interface CheckoutDTO {
    allItems: CartItemDTO[];
    taxRate: number;
}

export default async function Checkout() {
    const allItems = await getCartItems();
<<<<<<< HEAD
    console.log(allItems);
    const taxRate = 0.1;
=======
    const taxRate = await getTaxRate();
    console.log(allItems, taxRate);
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
    return (
        <DeliveryForm
            cartItems={allItems}
            taxRate={taxRate}
        />
    );
}
