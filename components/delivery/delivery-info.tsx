import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import DeliveryItems from "./delivery-items";
import Link from "next/link";

interface DeliveryInfoProps {
    normalDeliveryItems: CartItemDTO[];
    rushDeliveryItems: CartItemDTO[];
    normalShippingFee: number;
    rushShippingFee: number;
    taxRate: number;
}
const calculateAllItems = (items: CartItemDTO[]) => {
    return items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
};
export default function DeliveryInfo({
    normalDeliveryItems,
    rushDeliveryItems,
    normalShippingFee,
    rushShippingFee,
    taxRate,
}: DeliveryInfoProps) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const subTotal =
        calculateAllItems(normalDeliveryItems) +
        calculateAllItems(rushDeliveryItems);
    const tax = subTotal * taxRate;
    const shippingFee = normalShippingFee + rushShippingFee;
    const total = subTotal + tax + shippingFee;
    return (
        <>
            {/* <Separator orientation="vertical" /> */}
            <div className="w-full lg:w-96 space-y-8">
                <h2 className="text-lg font-bold">Your Order</h2>
                <Separator orientation="horizontal" />
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-500">
                        Normal Shipping
                    </h3>
                    <DeliveryItems
                        items={normalDeliveryItems}
                        shippingFee={normalShippingFee}
                    />
                </div>
                <Separator orientation="horizontal" />
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-500">
                        Rush Shipping
                    </h3>
                    <DeliveryItems
                        items={rushDeliveryItems}
                        shippingFee={rushShippingFee}
                    />
                </div>
                <Separator orientation="horizontal" />
                <div className="space-y-4">
                    <div className="flex space-x-2 text-sm">
                        <p className="w-2/3 text-slate-500">SubTotal</p>
                        <p className="w-1/3 text-slate-500 text-right">
                            {formatter.format(subTotal)}
                        </p>
                    </div>
                    <div className="flex space-x-2 text-sm">
                        <p className="w-2/3 text-slate-500">Tax</p>
                        <p className="w-1/3 text-slate-500 text-right">
                            {formatter.format(tax)}
                        </p>
                    </div>
                    <div className="flex space-x-2 text-sm">
                        <p className="w-2/3 text-slate-500">Shipping fee</p>
                        <p className="w-1/3 text-slate-500 text-right">
                            {formatter.format(shippingFee)}
                        </p>
                    </div>
                </div>
                <Separator orientation="horizontal" />
                <div className="space-y-4">
                    <div className="flex space-x-2 text-sm">
                        <p className="w-2/3 text-slate-500">Total</p>
                        <p className="w-1/3 text-slate-500 text-right">
                            {formatter.format(total)}
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <Button type="submit" className="w-full">
                        Proceed to Payment
                    </Button>
                    <Link href="/cart" className="block">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                        >
                            Back to Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
