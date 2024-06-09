import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface CartTotalProps {
    taxRate: number;
    cartItems: CartItemDTO[];
}

export default function CartTotal({ cartItems, taxRate }: CartTotalProps) {
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <Card className="space-y-8 w-96 item-center shrink-0">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <p className="text-slate-500">Subtotal</p>
                    <p>{formatter.format(subtotal)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-slate-500">Tax</p>
                    <p>{formatter.format(tax)}</p>
                </div>
                <Separator orientation="horizontal" />
                <div className="flex justify-between">
                    <p className="text-slate-500">Total</p>
                    <p>{formatter.format(total)}</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Link href="/checkout" className="w-full">
                    <Button className="w-full">Checkout</Button>
                </Link>
                <Link href="/" className="w-full">
                    <Button variant="link" className="w-full">
                        Continue Shopping
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
