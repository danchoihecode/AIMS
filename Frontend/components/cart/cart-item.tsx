"use client";
import { deleteCartItem } from "@/api/Cart";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import ChangeQuantity from "./change-quantity";
import Link from "next/link";

interface CartItemProps {
    item: CartItemDTO;
    setCartItems: any;
}
export default function CartItem({ item, setCartItems }: CartItemProps) {
    const [cartItem, setCartItem] = useState<CartItemDTO>(item);
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        setCartItem(item);
    } , [item]);
    useEffect(() => {
        setCartItems((prev: CartItemDTO[]) => {
            return prev.map((i: CartItemDTO) => {
                if (i.productId === cartItem.productId) {
                    return cartItem;
                }
                return i;
            });
        });
    }, [cartItem]);
    const handleDelete = async () => {
        const { error } = await deleteCartItem(cartItem.productId);
        if (error) {
            toast.error("An error occurred while removing the item");
            return;
        }
        toast.success("Item removed from cart");
        setCartItems((prev: CartItemDTO[]) => {
            return prev.filter(
                (i: CartItemDTO) => i.productId !== cartItem.productId
            );
        });
    };
    return (
        <div className="flex space-x-8 items-center p-8">
            <Toaster />
            <div className="w-24 h-24 bg-slate-100 shrink-0 flex justify-center items-center relative">
                <Image
                    src={cartItem.imageUrl}
                    alt="poster"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="grow">
                <Link href={`/${cartItem.productId}`} className="font-medium">
                {cartItem.title}
                </Link>
                <p className="text-sm text-slate-500">
                    {cartItem.category} - {cartItem.year}
                </p>
            </div>
            <p className="shrink-0">{formatter.format(cartItem.price)}</p>
            <ChangeQuantity item={cartItem} setItem={setCartItem} />

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