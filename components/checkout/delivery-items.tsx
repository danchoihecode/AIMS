import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import DeliveryItem from "./delivery-item";

interface DeliveryItemsProps {
    items: CartItemDTO[];
    shippingFee: number;
}
export default function DeliveryItems({ items, shippingFee }: DeliveryItemsProps) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <>
            <div className="flex space-x-2 text-sm">
                <p className="w-1/2 font-semibold">Product</p>
                <p className="w-1/6 font-semibold">Qty</p>
                <p className="w-1/3 font-semibold">Price</p>
            </div>
            {items.map((item) => (
                <DeliveryItem item={item} />
            ))}
            <div className="flex space-x-2 text-sm">
                <p className="w-2/3 text-slate-500">Shipping fee</p>
                <p className="w-1/3 text-slate-500 text-right">{formatter.format(shippingFee)}</p>
            </div>
        </>
    );
}
