import axios from "axios";
import { CartItemDTO } from "./CartItemDTO";
import { cookies } from "next/headers";
import { getData } from "@/lib/cookies-data";

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

interface CheckInventoryResponse {
    productId: number;
    qty: number;
    available: boolean;
}

interface TaxResponse {
    taxRate: number;
}

interface CartResponse {
    message: string;
    cart: CartItem[];
}
interface Response {
    data: any;
    error: any;
}

const apiBaseUrl = "http://localhost:8080/cart";
const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
export const axiosWithErrorHandling = async (
    config: any
): Promise<Response> => {
    try {
        const response = await axiosInstance(config);
        return {
            data: response.data,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: error,
        };
    }
};

export const getEmptyCart = async (): Promise<Response> => {
    const { data, error } = await axiosWithErrorHandling({
        method: "GET",
        url: `/new`,
    });
    return {
        data: data?.id,
        error: error,
    };
};
export const getCartItems = async (): Promise<CartItemDTO[]> => {
    const { data, error } = await axiosWithErrorHandling({
        method: "GET",
        params: {
            cartId: await getData("cartId"),
        },
    });
    return error ? [] : data;
};

// GET /inventory/check
export const checkInventory = async (
    productId: string,
    qty: number
): Promise<CheckInventoryResponse> => {
    const response = await axios.get<CheckInventoryResponse>(
        `${apiBaseUrl}/inventory/check`,
        {
            params: {
                product_id: productId,
                qty,
            },
        }
    );
    return response.data;
};
export const updateCartItemQty = async (
    productId: string,
    quantity: number
) => {
  const cartId = await getData("cartId");
  const {error} = await axiosWithErrorHandling({
    method: "PUT",
    url: `/${cartId}`,
    data: {
      productId,
      quantity,
    },
  });
  return error ? false : true;
};
export const deleteCartItem = async (productId: string) => {
    const cartId = await getData("cartId");
    return axiosWithErrorHandling({
        method: "DELETE",
        url: `/${cartId}`,
        data: {
            productId,
        },
    });
};
// GET /tax
export const getTaxRate = async (): Promise<number> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/tax`);
        return response.data;
    } catch (error) {
        return 0.1;
    }
};
export const updateCart = async (
    cartId: string,
    productId: string,
    qty: number
) => {
    try {
        await axios.put(`${apiBaseUrl}`, {
            cartId,
            productId,
            qty,
        });
    } catch (error) {
        console.log(error);
    }
};
// GET /cart
const getCart = async (): Promise<CartItem[]> => {
    const response = await axios.get<CartItem[]>(`${apiBaseUrl}/cart`);
    return response.data;
};

// POST /cart
interface AddToCartRequest {
    product_id: string;
    qty: string;
}

const addToCart = async (data: AddToCartRequest): Promise<CartResponse> => {
    const response = await axios.post<CartResponse>(`${apiBaseUrl}/cart`, data);
    return response.data;
};
