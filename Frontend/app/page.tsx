"use client";

import CategoryFilter from "@/components/home/filter";
import SeachBar from "@/components/home/seach-bar";
import { Separator } from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { CartItemDTO } from "@/api/DTO/CartItemDTO";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface Filter {
    category: string[] | undefined;
    search: string | undefined;
    page: number | undefined;
}
export default function Home() {
    const cartItems_: CartItemDTO[] = [
        {
            productId: "1",
            title: "The Great Gatsby",
            price: 10.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "book",
            year: 1925,
            isRushDelivery: true,
        },
        {
            productId: "2",
            title: "The Godfather",
            price: 15.99,
            imageUrl: "/poster/anh2.png",
            quantity: 2,
            category: "dvd",
            year: 1972,
        },
        {
            productId: "3",
            title: "Abbey Road",
            price: 12.99,
            imageUrl: "/poster/anh2.png",
            quantity: 3,
            category: "cd",
            year: 1969,
        },
        {
            productId: "4",
            title: "Pulp Fiction",
            price: 11.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "dvd",
            year: 1994,
            isRushDelivery: false,
        },
        {
            productId: "5",
            title: "Back to the Future",
            price: 9.99,
            imageUrl: "/poster/anh2.png",
            quantity: 4,
            category: "ld",
            year: 1985,
        },
        {
            productId: "6",
            title: "Harry Potter and the Sorcerer's Stone",
            price: 12.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "book",
            year: 1997,
            isRushDelivery: true,
        },
        {
            productId: "7",
            title: "Inception",
            price: 14.99,
            imageUrl: "/poster/anh2.png",
            quantity: 2,
            category: "dvd",
            year: 2010,
        },
        {
            productId: "8",
            title: "Thriller",
            price: 10.99,
            imageUrl: "/poster/anh2.png",
            quantity: 3,
            category: "cd",
            year: 1982,
        },
        {
            productId: "9",
            title: "Jurassic Park",
            price: 13.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "ld",
            year: 1993,
        },
        {
            productId: "10",
            title: "The Hobbit",
            price: 8.99,
            imageUrl: "/poster/anh2.png",
            quantity: 2,
            category: "book",
            year: 1937,
        },
        {
            productId: "11",
            title: "Forrest Gump",
            price: 10.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "dvd",
            year: 1994,
            isRushDelivery: true,
        },
        {
            productId: "12",
            title: "Dark Side of the Moon",
            price: 12.99,
            imageUrl: "/poster/anh2.png",
            quantity: 3,
            category: "cd",
            year: 1973,
        },
        {
            productId: "13",
            title: "Blade Runner",
            price: 11.99,
            imageUrl: "/poster/anh2.png",
            quantity: 2,
            category: "ld",
            year: 1982,
        },
        {
            productId: "14",
            title: "1984",
            price: 9.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "book",
            year: 1949,
            isRushDelivery: false,
        },
        {
            productId: "15",
            title: "Star Wars: A New Hope",
            price: 14.99,
            imageUrl: "/poster/anh2.png",
            quantity: 3,
            category: "dvd",
            year: 1977,
        },
        {
            productId: "16",
            title: "Led Zeppelin IV",
            price: 13.99,
            imageUrl: "/poster/anh2.png",
            quantity: 2,
            category: "cd",
            year: 1971,
        },
        {
            productId: "17",
            title: "The Matrix",
            price: 12.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "ld",
            year: 1999,
        },
        {
            productId: "18",
            title: "Pride and Prejudice",
            price: 7.99,
            imageUrl: "/poster/anh2.png",
            quantity: 1,
            category: "book",
            year: 1813,
        },
        {
            productId: "19",
            title: "The Lord of the Rings: The Fellowship of the Ring",
            price: 15.99,
            imageUrl: "/poster/anh2.png",
            quantity: 2,
            category: "dvd",
            year: 2001,
            isRushDelivery: true,
        },
        {
            productId: "20",
            title: "Sgt. Pepper's Lonely Hearts Club Band",
            price: 14.99,
            imageUrl: "/poster/anh2.png",
            quantity: 3,
            category: "cd",
            year: 1967,
        },
    ];
    const params = useSearchParams();

    const [cartItems, setCartItems] = useState(cartItems_);
    const [filter, setFilter] = useState<Filter>({
        category: params.get("filter")?.split(" "),
        search: params.get("search") ?? undefined,
        page: undefined,
    });
    const filteredItems = cartItems.filter((item) => {
        return (
            (filter.category === undefined ||
                filter.category.includes(item.category)) &&
            (filter.search === undefined ||
                item.title.toLowerCase().includes(filter.search.toLowerCase()))
        );
    });
    return (
        <main className="space-y-8">
            <CategoryFilter setFilter={setFilter} filter={filter} />
            <SeachBar setFilter={setFilter}  filter={filter}/>
            <Separator orientation="horizontal" />
            <div className="flex flex-wrap gap-4 justify-center">
                {filteredItems.map((item, index) => (
                    <ProductPreview item={item} key={index} />
                ))}
            </div>

            <Separator orientation="horizontal" />
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}
const ProductPreview = ({ item }: { item: CartItemDTO }) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <Link href={`/${item.productId}`}>
            <div className="space-y-4 text-center w-52">
                <div className="w-48 h-48 bg-slate-100 shrink-0 flex justify-center items-center relative">
                    <Image
                        src={item.imageUrl}
                        alt="poster"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="space-y-2">
                    <p className="font-semibold text-wrap">{item.title}</p>
                    <p className="text-sm text-slate-500">
                        {item.category.toLocaleUpperCase()} - {item.year}
                    </p>
                </div>
                <p className="shrink-0 font-medium">
                    {formatter.format(item.price * 10000)}
                </p>
            </div>
        </Link>
    );
};
