import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";
import { Filter } from "@/app/page";

export default function SeachBar({setFilter, filter}: {setFilter: any; filter: Filter}) {
    const params = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [search, setSearch] = useState<string>(filter.search ?? "");
    const handleSearch = (value: string) => {
        const seachParams = new URLSearchParams(params);
        if (value.length >= 3) {
            setFilter((prev: any) => ({...prev, search: value}));
            seachParams.set("search", value);
        }
        else {
            setFilter((prev: any) => ({...prev, search: undefined}));
            seachParams.delete("search");
        }
        replace(`${pathname}?${seachParams.toString()}`);

    };
    return (
        <Input
            placeholder="Search"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
            }}
            className="max-w-96"
        />
    );
}
