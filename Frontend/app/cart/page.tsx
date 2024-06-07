'use client'
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { getCartItems, getTaxRate } from "@/api/DTO/apifunc";
import CartItems from "@/components/cart/cart-items";
import CartTotal from "@/components/cart/cart-total";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";

export default function Cart() {
    const taxRate = useRef(0);
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    const [total, setTotal] = useState(cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0));
    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0));
    }, [cartItems]);
    useEffect(() => {
        getCartItems().then((data) => {
            if (data) setCartItems(data);
        });
        getTaxRate().then((data) => {
            taxRate.current = data;
        });
    }, []);
    return (
        <div className="lg:space-x-16 lg:flex items-start">
            <div className="space-y-8 grow">
                <h2 className="font-semibold text-xl">Your cart</h2>
                <Separator orientation="horizontal" />
                <CartItems items={cartItems} setCartItems={setCartItems}/>
            </div>
            <CartTotal subtotal={total} tax={total * taxRate.current} />
        </div>
    );
}
