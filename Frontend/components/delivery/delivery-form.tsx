"use client";

import { province } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
    SelectValue,
    SelectTrigger,
    Select,
    SelectItem,
    SelectContent,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn, isWithinNextWeek } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import DeliveryInfo from "./delivery-info";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import { fetchDelivery } from '@/api/delivery'

interface DeliveryFormProps {
    cartItems: CartItemDTO[];
    taxRate: number;
}

const DeliveryFormSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    province: z.enum(province.map((p) => p.id) as any, {
        message: "Invalid province",
    }),
    district: z.string().min(5),
    street: z.string().min(5),
    phone: z.string().min(10).max(10),
    date: z
        .date()
        .refine(isWithinNextWeek, {
            message: "Date must be in the future",
        })
        .optional(),
    note: z.string().optional(),
});
export default function DeliveryForm({
    cartItems,
    taxRate,
}: DeliveryFormProps) {
    const [isRush, setIsRush] = useState(false);
    const form = useForm<z.infer<typeof DeliveryFormSchema>>({
        resolver: zodResolver(DeliveryFormSchema),
        defaultValues: {
            name: "",
            email: "",
            province: "",
            district: "",
            street: "",
            phone: "",
            date: new Date(),
            note: "",
        },
    });
    const onSubmit = (data: z.infer<typeof DeliveryFormSchema>) => {
        console.log(data);
    };
    const setDelivery = async (province: string, isRush: boolean) => {
        const { normalShippingFee, rushShippingFee, rushDeliveryAvailable } = await fetchDelivery("1", province, isRush);
        if (isRush && rushDeliveryAvailable === false) {
            toast.error("Your order cannot be rush delivery.");
            return;
        }
        setIsRush(isRush);
        setNormalShippingFee(normalShippingFee);
        setRushShippingFee(rushShippingFee);
        if (isRush) {
            setNormalDeliveryItems(
                cartItems.filter((item) => !item.isRushDelivery)
            );
            setRushDeliveryItems(
                cartItems.filter((item) => item.isRushDelivery)
            );
        } else {
            setNormalDeliveryItems(cartItems);
            setRushDeliveryItems([]);
        }
    }
    const onRushDeliveryChange = async (checked: boolean) => {
        setDelivery(provinceWatch, checked);
    };
    const provinceWatch = form.watch('province');
    const [normalDeliveryItems, setNormalDeliveryItems] =
        useState<CartItemDTO[]>(cartItems);
    const [rushDeliveryItems, setRushDeliveryItems] = useState<CartItemDTO[]>(
        []
    );
    const [normalShippingFee, setNormalShippingFee] = useState(0);
    const [rushShippingFee, setRushShippingFee] = useState(0);
    return (
        <>
            <Toaster />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="lg:flex lg:space-x-8 lg:space-y-0 space-y-8"
                >
                    <div className="space-y-8 grow">
                        <div className="grid grid-cols-2 gap-4">
                            <h2 className="text-l font-semibold col-span-2 mb-8">
                                Personal Information
                            </h2>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Phone Number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <h2 className="text-l font-semibold col-span-2 mb-8">
                                Shipping Address
                            </h2>
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Province</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={
                                                async (value) => {
                                                    field.onChange(value);
                                                    await setDelivery(value, false);
                                                }
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {province.map((p) => (
                                                    <SelectItem
                                                        key={p.id}
                                                        value={p.id}
                                                    >
                                                        {p.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>District</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="District"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Street Address"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="rush-delivery"
                                checked={isRush}
                                onCheckedChange={onRushDeliveryChange}
                            />
                            <Label htmlFor="rush-delivery">Rush Delivery</Label>
                        </div>
                        <div className={cn("space-y-4", !isRush && "hidden")}>
                            <h2 className="text-l font-semibold col-span-2 mb-8">
                                Rush Shipping Infomation
                            </h2>
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Shipping Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        !isWithinNextWeek(date)
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>
                                            Shipping Instruction
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Shipping Instruction"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <DeliveryInfo
                        normalDeliveryItems={normalDeliveryItems}
                        rushDeliveryItems={rushDeliveryItems}
                        normalShippingFee={normalShippingFee}
                        rushShippingFee={rushShippingFee}
                        taxRate={taxRate}
                    />
                </form>
            </Form>
        </>
    );
}
