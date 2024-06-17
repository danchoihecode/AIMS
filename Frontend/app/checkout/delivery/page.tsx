'use client'
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { getCartItems, getTaxRate } from "@/api/Cart";
import DeliveryForm from "@/components/delivery/delivery-form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
    const router = useRouter();
    const taxRate = useRef(0);
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    useEffect(() => {
        document.title = "Checkout - E-commerce";
        getCartItems().then((response) => {
            if (response.error || !response.data.length) router.push("/cart");
            setCartItems(response.data);
        });
        getTaxRate().then((data) => {
            taxRate.current = data;
        });
    }, []);
    return <DeliveryForm cartItems={cartItems} taxRate={taxRate.current} />;
}