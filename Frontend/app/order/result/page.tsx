'use client'

import { redirect, useSearchParams } from "next/navigation"

export default function OrderResult() {
    const searchParams = useSearchParams();
    const result = searchParams.get("result");
    if (result === "success") {
        redirect("/order/success");
    }
    if (result === "failed") {
        redirect("/order/failed");
    }
    redirect("/cart");
}