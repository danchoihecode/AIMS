import DeliveryForm from "@/components/checkout/delivery-form";
import DeliveryItems from "@/components/checkout/delivery-items";
import { Separator } from "@/components/ui/separator";

export default function Checkout() {
    const allItems = [
        {
            id: "1",
            title: "Killer of the flower moon",
            price: 200000,
            quantity: 1,
            imageUrl: "/sample.jpg",
            isRushDelivery: true,
        },
        {
            id: "2",
            title: "Oppenheimer",
            price: 20000,
            quantity: 2,
            imageUrl: "/sample.jpg",
            isRushDelivery: false,
        },
        {
            id: "3",
            title: "The last duel",
            price: 30000,
            quantity: 3,
            imageUrl: "/sample.jpg",
            isRushDelivery: false,
        },
        {
            id: "4",
            title: "Barbie",
            price: 30000,
            quantity: 3,
            imageUrl: "/sample.jpg",
            isRushDelivery: true,
        },
    ];
    const normalShippingFee = 20000;
    const rushShippingFee = 50000;
    const taxRate = 0.1;
    return (
            <DeliveryForm cartItems={allItems} shippingFee={{normalShippingFee, rushShippingFee}} taxRate={taxRate} />
    );
}
