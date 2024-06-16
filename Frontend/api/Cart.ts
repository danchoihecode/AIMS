"use client";
import axios from "axios";
import { CartItemDTO } from "./DTO/CartItemDTO";
import { OrderDTO } from "./DTO/OrderDTO";
import { UserDTO } from './DTO/UserDTO';
import { axiosWithErrorHandling } from "./axiosConfig";

interface Product {
    id: number;
    title: string;
    price: number;
    qtyInStock: number;
    weight: number;
    image: string;
    year: number;
    category: string;
    rushOrderEligible: boolean;
}

interface CartItem {
    id: {
        cartId: number;
        productId: number;
    };
    cart: {
        id: number;
        subTotal: number;
    };
    product: Product;
    qty: number;
}

interface CartResponse {
    message: string;
    cart: CartItem[];
}
interface Response {
    data: any;
    error: any;
}
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});


export const getEmptyCart = async (): Promise<Response> => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance,{
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
    if (!cartId) {
        await getEmptyCart();
        return {
            data: [],
            error: new Error("Cart is empty"),
        };
    }
    return getCartItemsByCartId(cartId);
};
export const getCartItemsByCartId = async (cartId: string | number): Promise<Response> => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance,{
        method: "GET",
        params: {
            cartId,
        },
    });
    return {
        data: error ? [] : data,
        error,
    };
}

export const updateCartItemQty = async (
    productId: string,
    quantity: number
) => {
    const { error } = await axiosWithErrorHandling(axiosInstance,{
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
    return axiosWithErrorHandling(axiosInstance,{
        method: "DELETE",
        url: `/${localStorage.getItem("cartId")}`,
        data: {
            productId,
        },
    });
};

export const getTaxRate = async (): Promise<number> => {
    const { data, error } = await axiosWithErrorHandling(axiosInstance,{
        method: "GET",
        url: `/tax`,
    });
    return error ? 0.1 : data;
};

export const addItemToCart = async (
    productId: number,
    quantity: number
): Promise<Response> => {
    return await axiosWithErrorHandling(axiosInstance,{
        method: "POST",
        url: `/${localStorage.getItem("cartId")}/add`,
        data: {
            productId,
            quantity,
        },
    });
}
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