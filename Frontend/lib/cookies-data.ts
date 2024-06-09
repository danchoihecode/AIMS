'use server'
import { cookies } from "next/headers";
export const getData = async (key: string) => {
    const data = cookies().get(key);
    return data?.value;
};
export const setData = (key: string, value: string) => {
    'use server'
    return cookies().set(key, value);
};