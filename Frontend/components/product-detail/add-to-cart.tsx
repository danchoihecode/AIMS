"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addItemToCart } from "@/api/Cart";
import { Product } from "@/api/DTO/CartItemDTO";

export default function AddToCart({
    product,
    styling,
}: {
    product: Product;
    styling?: string;
}) {
    const [quantity, setQuantity] = useState<number>(1);
    const handleAddToCart = async () => {
        const { error } = await addItemToCart(product.id, quantity);
        if (error) {
            console.log(error);
            toast.error("An error occurred while adding to cart");
            return;
        }
        toast.success("Added to cart");
    };
    const handleChangeQty = async (qty: string) => {
        if (/^[0-9]*$/.test(qty) === false) {
            toast.error("Quantity must be a number");
            return;
        }
        const parsedQty = parseInt(qty);
        if (isNaN(parsedQty) || parsedQty < 0 || parsedQty > 100) {
            toast.error("You can only order between 1 and 100 items");
            return;
        }
        if (parsedQty > product.qtyInStock) {
            toast.error("The quantity is out of stock");
            return;
        }
        setQuantity(parsedQty);
    };
    return (
        <>
            <Toaster />
            <div className={styling ? styling : "flex space-x-4"}>
                <div className="flex space-x-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() =>
                            setQuantity((qty) => Math.max(0, qty - 1))
                        }
                    >
                        <Minus size={16} />
                    </Button>
                    <Input
                        className="w-12"
                        value={quantity}
                        onChange={(e) => handleChangeQty(e.target.value)}
                    />
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => setQuantity((qty) => Math.max(qty + 1))}
                    >
                        <Plus size={16} />
                    </Button>
                </div>
                <Button onClick={handleAddToCart}>
                    <ShoppingBag size={16} className="mr-4" />
                    Add to cart
                </Button>
            </div>
        </>
    );
}
