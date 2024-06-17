"use client";
import { getCartItemsByCartId, getTaxRate } from "@/api/Cart";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { TransactionDTO } from "@/api/DTO/InvoiceDTO";
import { OrderDTO } from "@/api/DTO/OrderDTO";
import { getInvoiceByOrderId } from "@/api/Invoice";
import { refundPayment } from "@/api/Payment";
import CheckoutDeliveryInfo from "@/components/checkout/checkout-delivery-info";
import {
    Item,
    ItemsHeader,
    SummaryItem,
} from "@/components/checkout/delivery-item";
import TransactionInfo from "@/components/invoice/transaction-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ORDER_STATE_PENDING } from "@/lib/constant";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function OrderPage() {
    useEffect(() => {
        document.title = "Order - E-commerce";
    }, []);
    const [orderId, setOrderId] = useState<string>("");
    const [order, setOrder] = useState<OrderDTO | undefined>(undefined);
    const taxRate = useRef(0);
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    const [transaction, setTransaction] = useState<TransactionDTO | undefined>(
        undefined
    );
    const handleCheckOrder = async () => {
        const orderResponse = await getInvoiceByOrderId(orderId);
        if (orderResponse.error) {
            toast.error("The order was not found");
            return;
        }
        const cartItemsResponse = await getCartItemsByCartId(
            orderResponse.data.order.cart.id
        );
        if (cartItemsResponse.error) {
            toast.error("Cart not found: " + orderResponse.data.order.cart.id);
            return;
        }
        setCartItems(cartItemsResponse.data);
        setTransaction(orderResponse.data.paymentTransaction);
        setOrder(orderResponse.data.order);
    };

    const handleCancelOrder = async () => {
        const { error } = await refundPayment(orderId);
        if (error) {
            toast.error("An error occurred while cancelling the order");
            return;
        }
        toast.success("Order cancelled successfully");
        setOrder(undefined);
        setCartItems([]);
        setTransaction(undefined);
    };
    useEffect(() => {
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
        <>
            <Toaster />
            {order ? (
                <div className=" max-w-[48rem] space-y-8 m-auto">
                    <div className="flex space-x-4 justify-center items-center">
                        <h1 className="text-xl font-bold">
                            Your Order #{order.id}{" "}
                        </h1>
                        <Badge className="ml-4">{order.state}</Badge>
                    </div>
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
                                ? order.normalShippingFees +
                                  order.rushShippingFees
                                : 0
                        }
                    />
                    <Separator orientation="horizontal" />
                    <SummaryItem label="Total" value={total} />
                    <Separator orientation="horizontal" />
                    <TransactionInfo
                        transaction={transaction as TransactionDTO}
                    />
                    {order?.state === ORDER_STATE_PENDING && (
                        <Button
                            variant="destructive"
                            className="w-1/2 m-auto"
                            onClick={handleCancelOrder}
                        >
                            Cancel Order
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-4 text-center">
                    <ShoppingBag size={96} strokeWidth={1} className="m-auto" />
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">Track Your Order</h1>
                        <p className="text-slate-500">
                            Please enter your Order ID below to check the status
                            of your order.
                        </p>
                    </div>

                    <Input
                        placeholder="Enter your Order's ID here"
                        value={orderId}
                        onChange={(e) =>
                            setOrderId(e.target.value.toUpperCase())
                        }
                        className="max-w-96 m-auto text-center"
                    />
                    <Button onClick={handleCheckOrder}>Track Order</Button>
                </div>
            )}
        </>
    );
}
