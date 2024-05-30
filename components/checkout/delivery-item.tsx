import { CartItemDTO } from "@/api/DTO/CartItemDTO";

export default function DeliveryItem({ item }: { item: CartItemDTO }) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }); 
    return (
        <div className="flex space-x-2 text-sm">
            <p className="w-1/2 text-slate-500">{item.title}</p>
            <p className="w-1/6 text-slate-500 text-right">{item.quantity}</p>
            <p className="w-1/3 text-slate-500 text-right">{formatter.format(item.price * item.quantity)}</p>
        </div>
    );
}
