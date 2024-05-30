"use client"
import { useState } from "react";
import CartItem from "./cart-item";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";

interface CartItemsProps {
    items: CartItemDTO[];
}
export default function CartItems({items} : CartItemsProps) {
    const [itemList, setItemList] = useState(items);
    return (
        <div>
            {itemList.map((item) => (
                <CartItem item={item} setItemList={setItemList} />
            ))}
        </div>
    );
}