"use client";
import axios from "axios";
import { axiosWithErrorHandling, Response } from "./axiosConfig";

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
const isValidCartId = (cartId: string | number | null): boolean => {
    if (!cartId) return false;
    if (typeof cartId === "number") return true;
    const numberRegex = /^[0-9]+$/;
    return typeof cartId === "string" && numberRegex.test(cartId);
};

export const getEmptyCart = async (): Promise<Response> => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance, {
        method: "GET",
        url: `/new`,
    });
    localStorage.setItem("cartId", data?.id);
    return {
        data: data?.id,
        error: error,
    };
};
export const getCartItems = async (): Promise<Response> => {
    const cartId = localStorage.getItem("cartId");
    if (!isValidCartId(cartId)) {
        await getEmptyCart();
        return {
            data: [],
            error: new Error("Cart is empty"),
        };
    }
    return getCartItemsByCartId(cartId as string);
};
export const getCartItemsByCartId = async (
    cartId: string | number
): Promise<Response> => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance, {
        method: "GET",
        params: {
            cartId,
        },
    });
    return {
        data: error ? [] : data,
        error,
    };
};

export const updateCartItemQty = async (
    productId: string,
    quantity: number
) => {
    const { error } = await axiosWithErrorHandling(axiosInstance, {
        method: "PUT",
        url: `/${localStorage.getItem("cartId")}`,
        data: {
            productId,
            quantity,
        },
    });
    return error ? false : true;
};

export const deleteCartItem = async (productId: string) => {
    if (!isValidCartId(localStorage.getItem("cartId"))) {
        await getEmptyCart();
        return {
            error: new Error("Invalid request"),
        };
    }
    const { data, error } = await axiosWithErrorHandling(axiosInstance, {
        method: "DELETE",
        url: `/${localStorage.getItem("cartId")}`,
        data: {
            productId,
        },
    });
    if (
        error &&
        error.response.status === 404 &&
        error.response.data.startsWith("Cart")
    ) {
        await getEmptyCart();
        return {
            error: new Error("Invalid request"),
        };
    }
    return {
        data,
        error,
    };
};

export const getTaxRate = async (): Promise<number> => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance, {
        method: "GET",
        url: `/tax`,
    });
    return error ? 0.1 : data;
};

export const addItemToCart = async (
    productId: number,
    quantity: number
): Promise<Response> => {
    if (!isValidCartId(localStorage.getItem("cartId"))) {
        await getEmptyCart();
    }
    const { data, error } = await axiosWithErrorHandling(axiosInstance, {
        method: "POST",
        url: `/${localStorage.getItem("cartId")}/add`,
        data: {
            productId,
            quantity,
        },
    });
    if (
        error &&
        error.response.status === 404 &&
        error.response.data.startsWith("Cart")
    ) {
        await getEmptyCart();
        return addItemToCart(productId, quantity);
    }
    return {
        data,
        error,
    };
};
// export const updateCart = async (productId: string, qty: number) => {
//     try {
//         await axios.put(`${apiBaseUrl}`, {
//             cartId: localStorage.getItem("cartId"),
//             productId,
//             qty,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
// GET /cart
// const getCart = async (): Promise<CartItem[]> => {
//     const response = await axios.get<CartItem[]>(`${apiBaseUrl}/cart`);
//     return response.data;
// };

// POST /cart
