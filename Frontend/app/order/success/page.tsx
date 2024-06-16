import { Button } from "@/components/ui/button";
import { ArrowRight, PackageCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderSuccess() {
    return (
        <div className="text-center space-y-4">
            <h1 className="text-xl font-bold">Thank you for shopping</h1>
            <PackageCheck strokeWidth={1} size={96} className="m-auto"/>

            <p className="text-slate-500">
                Your order has been successfully placed and is now being
                processed
            </p>
            <Link href="/" className="block m-auto">
                <Button>Go to home page <ArrowRight className="ml-2"/></Button>
            </Link>
        </div>
    );
}
