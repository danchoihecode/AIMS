"use client";

import { Product } from "@/api/DTO/CartItemDTO";
import { getProducts } from "@/api/Product";
import MyBreadcrumb from "@/components/common/breadcrumb";
import Heading from "@/components/common/heading";
import CategoryFilter from "@/components/home/filter";
import SeachBar from "@/components/home/seach-bar";
import AddToCart from "@/components/product-detail/add-to-cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export interface Filter {
    category: string[] | undefined;
    search: string | undefined;
    page: number | undefined;
}
export default function Home() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [sorting, setSorting] = useState<string>("");

    useEffect(() => {
        document.title = "Home - E-commerce";
        getProducts().then((response) => {
            if (response.error) {
                toast.error("An error occurred while fetching products");
                return;
            }
            setCartItems(response.data);
        });
    }, []);
    const params = useSearchParams();

    const [filter, setFilter] = useState<Filter>({
        category: params.get("filter")?.split(" "),
        search: params.get("search") ?? undefined,
        page: undefined,
    });
    const filteredItems = cartItems
        .filter((item: Product) => {
            return (
                (filter.category === undefined ||
                    filter.category.includes(
                        item.category.toLocaleLowerCase()
                    )) &&
                (filter.search === undefined ||
                    item.title
                        .toLowerCase()
                        .includes(filter.search.toLowerCase()))
            );
        })
        .sort((a: Product, b: Product) => {
            if (sorting === "asc") {
                return a.price - b.price;
            } else if (sorting === "desc") {
                return b.price - a.price;
            }
            return a.id - b.id;
        });
    return (
        <>
            <Heading />
            <MyBreadcrumb />
            <main className="space-y-8 p-16">
                <div className=" flex space-x-4">
                    <CategoryFilter setFilter={setFilter} filter={filter} />
                    <SeachBar setFilter={setFilter} filter={filter} />
                    <Button
                        onClick={() => setSorting("asc")}
                        variant={sorting === "asc" ? "default" : "outline"}
                    >
                        Sort Asc
                    </Button>
                    <Button
                        onClick={() => setSorting("desc")}
                        variant={sorting === "desc" ? "default" : "outline"}
                    >
                        Sort Desc
                    </Button>
                </div>
                <Separator orientation="horizontal" />
                <div className="flex flex-wrap gap-4 justify-between">
                    {filteredItems.map((item, index) => (
                        <ProductPreview item={item} key={index} />
                    ))}
                </div>
            </main>
        </>
    );
}
const ProductPreview = ({ item }: { item: Product }) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <Card className="p-4 space-y-4 text-center w-60">
            <div className="w-48 h-48 bg-slate-100 shrink-0 flex justify-center items-center relative rounded-md m-auto">
                <Image
                    src={item.image}
                    alt="poster"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <Separator orientation="horizontal" />
            <div className="space-y-2">
                <p className="font-semibold text-wrap">{item.title}</p>
                <p className="text-sm text-slate-500">
                    {item.category.toLocaleUpperCase()} - {item.year}
                </p>
            </div>
            <p className="shrink-0 font-medium">
                {formatter.format(item.price)}
            </p>
            <AddToCart
                product={item}
                styling="flex flex-col space-y-2 items-center"
            />
            <Link href={`/${item.id}`} className="block">
                <Button variant="outline" className="">
                    View details
                </Button>
            </Link>
        </Card>
    );
};
