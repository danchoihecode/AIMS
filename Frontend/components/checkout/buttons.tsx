"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getPaymentURL } from "@/api/Payment";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutButtons() {
    const router = useRouter();
    const handlePlaceOrder = async () => {
        const {data, error} = await getPaymentURL();
        if (error) {
            toast.error("Some error occurred while placing the order");
            return;
        }
        router.push(data);
    }
    return (
        <div className="flex justify-center space-x-2">
            <Toaster />
            <Button onClick={handlePlaceOrder}>Place Order</Button>
            <Link href="/cart">
                <Button variant="outline">Edit Cart</Button>
            </Link>
        </div>
    );
}
