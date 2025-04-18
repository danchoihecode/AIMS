"use client";

import { Filter } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryFilter({setFilter, filter}: {setFilter: any; filter: Filter}) {
    const params = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const categoryFilter = filter.category ?? ['book', 'cd', 'dvd', 'lp'];
    const category: Record<string, boolean> = {
        book: categoryFilter.includes("book"),
        cd: categoryFilter.includes("cd"),
        dvd: categoryFilter.includes("dvd"),
        lp: categoryFilter.includes("lp"),
    };
    const [allCategory, setAllCategory] = useState<boolean>(false);
    const [booksCategory, setBooksCategory] = useState<boolean>(category.book);
    const [cdCategory, setCdCategory] = useState<boolean>(category.cd);
    const [dvdCategory, setDvdCategory] = useState<boolean>(category.dvd);
    const [lpCategory, setLdCategory] = useState<boolean>(category.lp);
    const handleSelectAll = (checked: boolean) => {
        setAllCategory(checked);
        setBooksCategory(checked);
        setCdCategory(checked);
        setDvdCategory(checked);
        setLdCategory(checked);
        const seachParams = new URLSearchParams(params);

        if (checked) {
            seachParams.delete("filter");
        } else {
            seachParams.set("filter", "");
        }
        replace(`${pathname}?${seachParams.toString()}`);
        setFilter((prev: any) => ({...prev, category: checked ? undefined : []}));
    };
    useEffect(() => {
      const seachParams = new URLSearchParams(params);
      if (booksCategory && cdCategory && dvdCategory && lpCategory) {
            setAllCategory(true);
            seachParams.delete("filter");            
        } else {
            setAllCategory(false);
            const categoryFilter :string[] = [];
            if (booksCategory) categoryFilter.push("book");
            if (cdCategory) categoryFilter.push("cd");
            if (dvdCategory) categoryFilter.push("dvd");
            if (lpCategory) categoryFilter.push("lp");
            seachParams.set("filter", categoryFilter.join(" "));
            setFilter((prev: any) => ({...prev, category: categoryFilter}));
        }
        replace(`${pathname}?${seachParams.toString()}`);
        
    }, [booksCategory, cdCategory, dvdCategory, lpCategory]);
    return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Category</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={allCategory}
                        onCheckedChange={handleSelectAll}
                    >
                        Select All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={booksCategory}
                        onCheckedChange={setBooksCategory}
                    >
                        Books
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={cdCategory}
                        onCheckedChange={setCdCategory}
                    >
                        CDs
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={dvdCategory}
                        onCheckedChange={setDvdCategory}
                    >
                        DVDs
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={lpCategory}
                        onCheckedChange={setLdCategory}
                    >
                        LP Records
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
    );
}