"use client";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { getCartItems, getTaxRate } from "@/api/Cart";
import CartItems from "@/components/cart/cart-items";
import CartTotal from "@/components/cart/cart-total";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import MyBreadcrumb from "@/components/common/breadcrumb";
import Heading from "@/components/common/heading";

export default function Cart() {
    const taxRate = useRef(0);
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    useEffect(() => {
        document.title = "Cart - E-commerce";
        getCartItems().then((response) => {
            if (response) setCartItems(response.data);
        });
        getTaxRate().then((data) => {
            taxRate.current = data;
        });
    }, []);
    return (
        <>
            <Heading />
            <MyBreadcrumb />
            <div className="lg:space-x-16 lg:flex items-start p-16">
                <div className="space-y-8 grow">
                    <h2 className="font-semibold text-xl">Your cart</h2>
                    <Separator orientation="horizontal" />
                    <CartItems items={cartItems} setCartItems={setCartItems} />
                </div>
                <CartTotal taxRate={taxRate.current} cartItems={cartItems} />
            </div>
        </>
    );
}
