import CartItem from "@/components/cart/cart-item";
import CartTotal from "@/components/cart/cart-total";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
    return (
        <div className="lg:space-x-16 lg:flex">
            <div className="space-y-8 grow">
                <h2 className="font-semibold text-xl">Your cart</h2>
                <Separator orientation="horizontal" />
                <div>
                    <CartItem item={{
                        title: "Product 1",
                        price: 10000,
                        quantity: 1,
                        imageUrl: "/sample.jpg",
                    }} />
                </div>
            </div>
            <CartTotal subtotal={10000} tax={1000} />
        </div>
    );
}
