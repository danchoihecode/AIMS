import CartItems from "@/components/cart/cart-items";
import CartTotal from "@/components/cart/cart-total";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
    const items = [
        {
            id: "1",
            title: "Product 1",
            price: 10000,
            quantity: 1,
            imageUrl: "/sample.jpg",
        },
        {
            id: "2",
            title: "Product 2",
            price: 20000,
            quantity: 2,
            imageUrl: "/sample.jpg",
        },
        {
            id: "3",
            title: "Product 3",
            price: 30000,
            quantity: 3,
            imageUrl: "/sample.jpg",
        },
    ];
    return (
        <div className="lg:space-x-16 lg:flex items-start">
            <div className="space-y-8 grow">
                <h2 className="font-semibold text-xl">Your cart</h2>
                <Separator orientation="horizontal" />
                <CartItems items={items} />
            </div>
            <CartTotal subtotal={10000} tax={1000} />
        </div>
    );
}
