import { Button } from "@/components/ui/button";
import { ArrowRight, PackageX } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
    title: "Order Failed",
    description: "Order failed page",
};
export default function OrderSuccess() {
    return (
        <div className="text-center space-y-4">
            <h1 className="text-xl font-bold">Oops! There was an issue</h1>
            <PackageX strokeWidth={1} size={96} className="m-auto"/>
            

            <p className="text-slate-500">
            Oops! There was a problem processing your order. Please review the details and try again.
            </p>
            <Link href="/cart" className="block m-auto">
                <Button>Reorder <ArrowRight className="ml-2"/></Button>
            </Link>
        </div>
    );
}
