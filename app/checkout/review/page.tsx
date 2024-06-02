import CheckoutButtons from "@/components/checkout/buttons";
import CheckoutDeliveryInfo from "@/components/checkout/checkout-delivery-info";
import {
    Item,
    ItemsHeader,
    SummaryItem,
} from "@/components/checkout/delivery-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CheckoutPage() {
    const deliveryInfo = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        phone: "0123456789",
        address: "123 Main Street",
        province: "Hà Nội",
        date: "2021-10-10",
        note: "Please deliver before 5pm",
    };
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
    const taxRate = 0.1;
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className=" max-w-[48rem] space-y-8 m-auto">
            <h1 className="text-xl font-bold text-center">Your Order</h1>
            <CheckoutDeliveryInfo deliveryInfo={deliveryInfo} />
            <Separator orientation="horizontal" />
            <div className="space-y-4">
                <h2 className="font-semibold text-center mb-8 text-slate-500">
                    Normal Shipping
                </h2>
                <ItemsHeader />
                {allItems.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
                <SummaryItem label="Shipping Fee" value={100000} />
            </div>
            <Separator orientation="horizontal" />
            <div className="space-y-4">
                <h2 className="font-semibold text-center mb-8 text-slate-500">
                    Rush Shipping
                </h2>
                <ItemsHeader />
                {allItems.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
                <SummaryItem label="Shipping Fee" value={100000} />
            </div>
            <Separator orientation="horizontal" />
            <SummaryItem label="SubTotal" value={100000} />
            <SummaryItem label="Tax" value={100000} />
            <SummaryItem label="Shipping Fee" value={10000} />
            <Separator orientation="horizontal" />
            <SummaryItem label="Total" value={10000} />
            <div>
                <CheckoutButtons />
            </div>
        </div>
    );
}
