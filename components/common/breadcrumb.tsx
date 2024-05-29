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

export default function MyBreadcrumb() {
    const url = usePathname();
    const paths = url.split("/").filter(Boolean);
    let currentPath = "";
    return (
        <div className="p-16 bg-slate-100 space-y-2">
            <h1 className="text-3xl font-semibold">
                {capitalizeFirstLetter(paths[paths.length - 1])}
            </h1>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {paths.map((path) => {
                        currentPath += `/${path}`;
                        return (
                            <Fragment key={path}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={`${currentPath}`}>
                                        {capitalizeFirstLetter(path)}
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
