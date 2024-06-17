import { Product } from "@/api/DTO/CartItemDTO";
import { getProductDetails } from "@/api/Product";
import AddToCart from "@/components/product-detail/add-to-cart";
import { BookRows, CDRows, DVDRows, LPRows } from "@/components/product-detail/item-details";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ServerCrash } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Product Detail",
    description: "Product detail page",
};

export default async function ProductDetail({
    params,
}: {
    params: { product_id: string };
}) {
    const { data, error } = await getProductDetails(params.product_id);
    if (error) {
        return (
            <div className="flex space-x-4 justify-center">
                <ServerCrash size={144} strokeWidth={1} />
                <div className="space-y-4">
                    <p className="font-bold text-lg block">
                        An error occurred while fetching the product details
                    </p>
                    <p className="text-slate-500 block">
                        {error.response.data}
                    </p>

                    <Link href="/" className="block">
                        <Button>Go back to home</Button>
                    </Link>
                </div>
            </div>
        );
    }
    const item: Product = data.product;
    const book = data.book;
    const dvd = data.dvd;
    const cd = data.cd;
    const lp = data.lp;
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <div className="md:flex md:space-x-8 space-y-8 items-start">
            <Image
                src={item.image}
                width={400}
                height={400}
                alt="product"
                className="m-auto md:m-0"
            />
            <div className="space-y-4 w-full">
                <h1 className="text-3xl font-bold ">{item.title}</h1>
                <h2 className="text-2xl font-semibold">
                    {formatter.format(item.price)}
                </h2>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                Category
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Year</TableCell>
                            <TableCell>{item.year}</TableCell>
                        </TableRow>
                        {dvd && <DVDRows dvd={dvd} />}
                        {cd && <CDRows cd={cd} />}
                        {book && <BookRows book={book} />}
                        {lp && <LPRows lp={lp} />}
                    </TableBody>
                </Table>
                <AddToCart product={item}/>
            </div>
        </div>
    );
}