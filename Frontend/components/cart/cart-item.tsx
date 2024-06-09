"use client";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import {
    deleteCartItem,
    updateCartItemQty
} from "@/api/DTO/apifunc";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useSWR from "swr";

interface CartItemProps {
    item: CartItemDTO;
    setCartItems: any;
}
const isValidQty = async (itemId: string, qty: string) => {
    if (/^[0-9]*$/.test(qty) === false) {
        toast.error("Quantity must be a number");
        return false;
    }
    const parsedQty = parseInt(qty);
    if (isNaN(parsedQty) || parsedQty < 0 || parsedQty > 100) {
        toast.error("You can only order between 1 and 100 items");
        return false;
    }
    const response = await updateCartItemQty(itemId, parsedQty);
    if (!response) {
        toast.error("The quantity is out of stock");
    }
    return response;
};
export default function CartItem({ item, setCartItems }: CartItemProps) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleChangeQty = async (qty: string | number) => {
        const isValid = await isValidQty(item.productId, qty.toString());
        if (!isValid) return;
        setCartItems((prev: CartItemDTO[]) => {
            return prev.map((i: CartItemDTO) => {
                if (i.productId === item.productId) {
                    return {
                        ...i,
                        quantity: qty,
                    };
                }
                return i;
            });
        });
    };
    const handleDelete = async () => {
        const {data, error} = await deleteCartItem(item.productId);
        if (error) {
            toast.error("An error occurred while removing the item");
            return;
        }
        toast.success("Item removed from cart");
        setCartItems((prev: CartItemDTO[]) => {
            return prev.filter(
                (i: CartItemDTO) => i.productId !== item.productId
            );
        });
    };
    return (
        <div className="flex space-x-8 items-center p-8">
            <Toaster />
            <div className="w-24 h-24 bg-slate-100 shrink-0 flex justify-center items-center relative">
                <Image
                    src={item.imageUrl}
                    alt="poster"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="grow">
                <p>{item.title}</p>
                <p className="text-sm text-slate-500">
                    {item.category} - {item.year}
                </p>
            </div>
            <p className="shrink-0">{formatter.format(item.price)}</p>
            <div className="space-x-2 flex items-center">
                <Button
                    variant="secondary"
                    size="icon"
                    className="shrink-0"
                    onClick={async () => {
                        handleChangeQty(item.quantity - 1);
                    }}
                >
                    <MinusIcon size={16} />
                </Button>
                <Input
                    className="w-12"
                    value={item.quantity}
                    onChange={async (e) => {
                        const value = e.target.value;
                        handleChangeQty(value);
                    }}
                />
                <Button
                    variant="secondary"
                    size="icon"
                    className="shrink-0"
                    onClick={() => {
                        handleChangeQty(item.quantity + 1);
                    }}
                >
                    <PlusIcon size={16} />
                </Button>
            </div>

            <Button
                variant="secondary"
                size="icon"
                className="shrink-0"
                onClick={handleDelete}
            >
                <X size={16} />
            </Button>
        </div>
    );
}
