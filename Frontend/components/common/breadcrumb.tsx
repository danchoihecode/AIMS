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

export default function MyBreadcrumb() {
    const url = usePathname();
    const paths = url.split("/").filter(Boolean);
    let currentPath = "";
    return (
        <div className="p-16 bg-slate-100 space-y-2">
            <h1 className="text-3xl font-semibold">
                {paths.length
                    ? capitalizeFirstLetter(paths[paths.length - 1])
                    : "Home"}
            </h1>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {paths &&
                        paths.map((path) => {
                            currentPath += `/${path}`;
                            return (
                                <Fragment key={path}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={currentPath}>
                                                {capitalizeFirstLetter(path)}
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
