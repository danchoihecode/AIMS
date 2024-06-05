"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CheckoutButtons() {
    const router = useRouter();
    const handlePlaceOrder = () => {
        router.push("/checkout/success");
    }
    return (
        <div className="flex justify-center space-x-2">
            <Button onClick={handlePlaceOrder}>Place Order</Button>
            <Link href="/cart">
                <Button variant="outline">Edit Cart</Button>
            </Link>
        </div>
    );
}
