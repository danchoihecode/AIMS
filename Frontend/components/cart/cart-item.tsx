"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast, { Toaster } from "react-hot-toast";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { checkInventory } from "@/api/DTO/apifunc";
import { MinusIcon, PlusIcon, X } from "lucide-react";

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
    const response = await checkInventory(itemId, parsedQty);
    if (!response.available) {
        toast.error("The quantity is out of stock");
    }
    return response.available;
};
export default function CartItem({ item, setCartItems }: CartItemProps) {
    console.log(item.quantity);
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleChangeQty = async (qty: string | number) => {
        const isValid = await isValidQty(item.id, qty.toString());
        if (!isValid) return;
        setCartItems((prev: any) => {
            return prev.map((i: any) => {
                if (i.id === item.id) {
                    return {
                        ...i,
                        quantity: qty,
                    };
                }
                return i;
            });
        });
    }
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
                    <MinusIcon size={16}/>
                </Button>
                <Input
                    className="w-16"
                    value={item.quantity}
                    onChange={async (e) => {
                        const value = e.target.value;
                        handleChangeQty(value)
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
                    <PlusIcon size={16}/>
                </Button>
            </div>

            <Button
                variant="secondary"
                size="icon"
                className="shrink-0"
                onClick={() => {
                    setCartItems((prev: any) => {
                        return prev.filter((i: any) => i.id !== item.id);
                    });
                }}
            >
                <X size={16}/>
            </Button>
        </div>
    );
}
