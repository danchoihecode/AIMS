'use client'
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import CartItems from "@/components/cart/cart-items";
import CartTotal from "@/components/cart/cart-total";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

interface CartDTO {
    items: CartItemDTO[];
    taxRate: number;
}

export default function Cart() {
    const items = [
        {
            id: "1",
            title: "Product 1",
            price: 10000,
            quantity: 1,
            imageUrl: "/sample.jpg",
        },
        {
            id: "2",
            title: "Product 2",
            price: 20000,
            quantity: 2,
            imageUrl: "/sample.jpg",
        },
        {
            id: "3",
            title: "Product 3",
            price: 30000,
            quantity: 3,
            imageUrl: "/sample.jpg",
        },
    ];
    const taxRate = 0.1;
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const [cartItems, setCartItems] = useState(items);
    const [total, setTotal] = useState(cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0));
    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0));
    }, [cartItems]);
    return (
        <div className="lg:space-x-16 lg:flex items-start">
            <div className="space-y-8 grow">
                <h2 className="font-semibold text-xl">Your cart</h2>
                <Separator orientation="horizontal" />
                <CartItems items={cartItems} setCartItems={setCartItems}/>
            </div>
            <CartTotal subtotal={total} tax={total * taxRate} />
        </div>
    );
}
