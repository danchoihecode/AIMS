import { CartItemDTO } from "@/api/DTO/CartItemDTO";

export function Item({ item }: { item: CartItemDTO }) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="flex space-x-2 text-sm">
            <p className="w-5/12 text-slate-500">{item.title}</p>
            <p className="w-1/12 text-slate-500">{item.quantity}</p>
            <p className="w-3/12 text-slate-500 text-right">
                {formatter.format(item.price)}
            </p>
            <p className="w-3/12 text-slate-500 text-right">
                {formatter.format(item.price * item.quantity)}
            </p>
        </div>
    );
}
export function ItemsHeader() {
    return (
        <div className="flex space-x-2 text-sm">
            <p className="w-5/12 font-medium">Product</p>
            <p className="w-1/12 font-medium">Qty</p>
            <p className="w-3/12 font-medium text-right">Price</p>
            <p className="w-3/12 font-medium text-right">Total</p>
        </div>
    );
}
export const SummaryItem = ({label, value} : {label: string, value: number}) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="flex space-x-2 text-sm">
            <p className="w-2/3">{label}</p>
            <p className="w-1/3 text-right">{formatter.format(value)}</p>
        </div>
    );
};
