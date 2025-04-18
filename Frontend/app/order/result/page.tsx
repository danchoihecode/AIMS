"use client";

import { getEmptyCart } from "@/api/Cart";
import { savePayment } from "@/api/Payment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderResult() {
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        document.title = "Order Result Processing - E-commerce";
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        params["paymentMethod"] = "VNPay";
        console.log(JSON.stringify(params));
        savePayment(params).then(() => {
            const result = searchParams.get("vnp_TransactionStatus");
            if (!result) {
                router.push("/cart");
            }
            if (result === "00") {
                localStorage.removeItem("cartId");
                localStorage.removeItem("orderId");
                getEmptyCart().then(() => {
                    router.push("/order/success");
                });
            } else {
                router.push("/order/failed-order");
            }
        });
    }, []);
}
