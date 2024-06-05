import axios from 'axios';
import { CartItemDTO } from './CartItemDTO';

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
     cartId: number; productId: number 
    };
  cart: { 
    id: number; subTotal: number 
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

const apiBaseUrl = 'http://localhost:8080';

export const getCartItems = async (): Promise<CartItemDTO[]> => {
  const response = await axios.get(`${apiBaseUrl}/cart`);
  const data = response.data;
  return data.map((item: any) => {
    const qty = item.qty;
    const product = item.product;
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.image,
      quantity: qty,
      category: product.category,
      year: product.year,
      isRushDelivery: product.rushOrderEligible,
    }
  });
}

// GET /inventory/check
export const checkInventory = async (productId: string, qty: number): Promise<CheckInventoryResponse> => {
  const response = await axios.get<CheckInventoryResponse>(`${apiBaseUrl}/inventory/check`, {
    params: {
      product_id: productId,
      qty,
    },
  });
  return response.data;
};

// GET /tax
export const getTaxRate = async (): Promise<TaxResponse> => {
  const response = await axios.get<TaxResponse>(`${apiBaseUrl}/tax`);
  return response.data;
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



