import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface CartTotalProps {
    subtotal: number;
    tax: number;
}
export default function CartTotal({ subtotal, tax }: CartTotalProps) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Card className="space-y-8 w-96 item-center">
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
                    <p>{formatter.format(subtotal + tax)}</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Link href="/cart/order" className="w-full">
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
