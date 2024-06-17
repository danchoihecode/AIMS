"use client"
import CartItem from "./cart-item";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";

interface CartItemsProps {
    items: CartItemDTO[];
    setCartItems: any;
}
export default function CartItems({items, setCartItems} : CartItemsProps) {
    return (
        <div>
            {items.map((item, index) => (
                <CartItem item={item} setCartItems={setCartItems} key={index} />
            ))}
        </div>
    );
}