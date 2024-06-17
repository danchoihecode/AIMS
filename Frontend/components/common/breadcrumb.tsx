"use client";

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { headerSupportPages } from "./config";

export default function MyBreadcrumb() {
    const url = usePathname();
    const paths = url.split("/").filter(Boolean).map((path: string) => {return {path, display: capitalizeFirstLetter(path)}});    
    const regex = /\/\d+$/;
    if (regex.test(url)) {
        const lastPath = paths.pop();
        paths.push({
            path: lastPath?.path as string,
            display: "Product Detail",
        });
    }
    else if (!headerSupportPages.includes(url)) return <></>;
    console.log(url)
    let currentPath = "";
    return (
        <div className="p-16 bg-slate-100 space-y-2">
            <h1 className="text-3xl font-semibold">
                {paths.length
                    ? paths[paths.length - 1].display
                    : "Home"}
            </h1>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {paths &&
                        paths.map((path) => {
                            currentPath += `/${path.path}`;
                            return (
                                <Fragment key={path.path}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={currentPath}>
                                                {path.display}
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </Fragment>
                            );
                        })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
