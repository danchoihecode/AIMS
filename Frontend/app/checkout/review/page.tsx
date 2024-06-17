"use client";
import { getCartItems, getTaxRate } from "@/api/Cart";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { OrderDTO } from "@/api/DTO/OrderDTO";
import { getOrder } from "@/api/Order";
import CheckoutButtons from "@/components/checkout/buttons";
import CheckoutDeliveryInfo from "@/components/checkout/checkout-delivery-info";
import {
    Item,
    ItemsHeader,
    SummaryItem,
} from "@/components/checkout/delivery-item";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CheckoutPage() {
    const [order, setOrder] = useState<OrderDTO | undefined>(undefined);
    const router = useRouter();
    const taxRate = useRef(0);
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    useEffect(() => {
        document.title = "Checkout - E-commerce";
        getOrder().then((response) => {
            if (response.error) router.push("/cart");
            setOrder(response.data);
        });
        getCartItems().then((response) => {
            if (response.error || !response.data.length) router.push("/cart");
            setCartItems(response.data);
        });
        getTaxRate().then((data) => {
            taxRate.current = data;
        });
    }, []);
    const normalDeliveryItems = cartItems.filter(
        (item) => !item.isRushDelivery || !order?.deliveryInfo.isRushOrder
    );
    const rushDeliveryItems = cartItems.filter(
        (item) => item.isRushDelivery && order?.deliveryInfo.isRushOrder
    );
    const subTotal = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const tax = subTotal * taxRate.current;
    const total =
        subTotal +
        tax +
        (order?.normalShippingFees || 0) +
        (order?.rushShippingFees || 0);
    return (
        <div className=" max-w-[48rem] space-y-8 m-auto">
            <h1 className="text-xl font-bold text-center">Your Order</h1>
            <CheckoutDeliveryInfo deliveryInfo={order?.deliveryInfo} />{" "}
            <Separator orientation="horizontal" />
            <div className="space-y-4">
                <h2 className="font-semibold text-center mb-8 text-slate-500">
                    Normal Shipping
                </h2>
                <ItemsHeader />
                {normalDeliveryItems.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
                <SummaryItem
                    label="Shipping Fee"
                    value={order ? order.normalShippingFees : 0}
                />
            </div>
            <Separator orientation="horizontal" />
            <div className="space-y-4">
                <h2 className="font-semibold text-center mb-8 text-slate-500">
                    Rush Shipping
                </h2>
                <ItemsHeader />
                {rushDeliveryItems.map((item, index) => (
                    <Item item={item} key={index} />
                ))}
                <SummaryItem
                    label="Shipping Fee"
                    value={order ? order.rushShippingFees : 0}
                />
            </div>
            <Separator orientation="horizontal" />
            <SummaryItem label="SubTotal" value={subTotal} />
            <SummaryItem label="Tax" value={tax} />
            <SummaryItem
                label="Shipping Fee"
                value={
                    order
                        ? order.normalShippingFees + order.rushShippingFees
                        : 0
                }
            />
            <Separator orientation="horizontal" />
            <SummaryItem label="Total" value={total} />
                <CheckoutButtons/>
        </div>
    );
}
