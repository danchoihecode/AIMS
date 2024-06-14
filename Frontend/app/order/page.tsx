"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function OrderPage() {
    const [orderId, setOrderId] = useState<string>("");
    const handleCheckOrder = () => {
        toast.error("Order not found: " + orderId);
    };
    return (
        <div className="space-y-4 text-center">
            <Toaster />
            <ShoppingBag size={96} strokeWidth={1} className="m-auto" />
            <div className="space-y-2">
                <h1 className="text-xl font-bold">Track Your Order</h1>
                <p className="text-slate-500">
                    Please enter your Order ID below to check the status of your
                    order.
                </p>
            </div>

            <Input
                placeholder="Enter your Order's ID here"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                className="max-w-96 m-auto text-center"
            />
            <Button onClick={handleCheckOrder}>Track Order</Button>
        </div>
    );
}
