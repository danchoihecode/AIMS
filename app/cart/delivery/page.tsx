import DeliveryForm from "@/components/checkout/delivery-form";
import DeliveryItems from "@/components/checkout/delivery-items";
import { Separator } from "@/components/ui/separator";

export default function Checkout() {
    const items = [
        {
            id: "1",
            title: "Killer of the flower moon",
            price: 200000,
            quantity: 1,
            imageUrl: "/sample.jpg",
        },
        {
            id: "2",
            title: "Oppenheimer",
            price: 20000,
            quantity: 2,
            imageUrl: "/sample.jpg",
        },
        {
            id: "3",
            title: "The last duel",
            price: 30000,
            quantity: 3,
            imageUrl: "/sample.jpg",
        }
    ];
    return (
        <div className="lg:flex lg:space-x-4">
            <DeliveryForm />
            <Separator orientation="vertical" />
            <div className="w-full lg:w-96 space-y-8">
                <h2 className="text-lg font-bold">Your Order</h2>
                <Separator orientation="horizontal" />
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-500">Normal Shipping</h3>
                    <DeliveryItems items={items} />
                </div>
                <Separator orientation="horizontal" />
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-500">Rush Shipping</h3>
                    <DeliveryItems items={items} />
                </div>
            </div>
        </div>
    );
}
