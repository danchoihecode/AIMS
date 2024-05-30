'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";

interface CartItemProps {
    item: CartItemDTO;
    setItemList?: any;
}
const isValidQty = (qty: string) => {
    if (/^[0-9]*$/.test(qty) === false) {
        return false;
    }
    return parseInt(qty) > 0;
}
export default function CartItem({item, setItemList}: CartItemProps) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const [qty, setQty] = useState(item.quantity);
    return (
        <div className="flex space-x-8 items-center p-8">
            <Toaster />
            <div className="w-24 h-24 bg-slate-100 shrink-0 flex justify-center items-center relative">
                <Image src={item.imageUrl} alt="poster" layout="fill" objectFit="contain"/>
            </div>
            <div className="grow">
                <p>{item.title}</p>
                <p className="text-sm text-slate-500">Price</p>
            </div>
            <p className="shrink-0">{formatter.format(item.price)}</p>
            <Input className="w-16" value={qty} onChange={(e) => {
                const value = e.target.value;
                if (!isValidQty(value)) {
                    toast.error("Invalid quantity");    
                    return;
                }
                setQty(parseInt(value, 10));
            }}/>
            <Button variant="secondary" size="icon" className="shrink-0" onClick={() => {
                setItemList((prev: any) => {
                    return prev.filter((i: any) => i.id !== item.id);
                });
            }}>
                <Image
                    width={16}
                    height={16}
                    src="/icon/close.png"
                    alt="close"
                ></Image>
            </Button>
        </div>
    );
}
