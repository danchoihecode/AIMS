import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderSuccess() {
    return (
        <div className="text-center space-y-4">
            <h1 className="text-xl font-bold">Oops! There was an issue</h1>
            <Image src="/icon/failed.png" width={200} height={200} alt="success" className="m-auto"/>
            

            <p className="text-slate-500">
            Oops! There was a problem processing your order. Please review the details and try again.
            </p>
            <Link href="/cart" className="block m-auto">
                <Button>Reorder <ArrowRight className="ml-2"/></Button>
            </Link>
        </div>
    );
}
