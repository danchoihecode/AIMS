'use server'
import { cookies } from "next/headers";
export const getData = async (key: string) => {
    const data = cookies().get(key);
    return data?.value;
};
export const setData = async (key: string, value: string) => {
    return cookies().set(key, value);
};