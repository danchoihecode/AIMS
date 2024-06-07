import axios from "axios";
import { CartItemDTO } from "./CartItemDTO";

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

const apiBaseUrl = "http://localhost:8080/cart";

export const getCartItems = async (): Promise<CartItemDTO[]> => {
    try {
        const response = await axios.get(`${apiBaseUrl}`, {
            params: {
                cartId: "1",
            },
        });
        console.log(response.data);
        const data = response.data;
        return data.items;
    } catch (error) {
        console.log(error);
        return [];
    }
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

// GET /tax
export const getTaxRate = async (): Promise<number> => {
    try {
        const response = await axios.get<TaxResponse>(`${apiBaseUrl}/tax`);
        const data = response.data;
        return data.taxRate / 100;
    } catch (error) {
        console.log(error);
        return 0.1;
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
