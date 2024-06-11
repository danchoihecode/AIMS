import axios from 'axios';
import { CartItemDTO } from './CartItemDTO';
import { UserDTO } from './UserDTO';

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

export const getUsers = async (): Promise<UserDTO[]> => {
  const response = await axios.get(`${apiBaseUrl}/admin/users`);
  const data = response.data;
  return data.map((item: any) => {
    const qty = item.qty;
    const user = item.user;
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isBlocked: user.isBlocked,
    }
  });
}

export const updateUser = async (user: UserDTO): Promise<UserDTO[]> => {
  const response = await axios.put(`${apiBaseUrl}/admin/users/${user.id}`, user);
  return response.data;
}

export const createUser = async (user: UserDTO): Promise<UserDTO[]> => {
  const response = await axios.post(`${apiBaseUrl}/admin/users/create`, user);
  return response.data;
}

export const getUser = async (id: string): Promise<UserDTO> => {
  const response = await axios.get(`${apiBaseUrl}/admin/users/${id}`);
  const user = response.data;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
    isManager: user.isManager,
    isBlocked: user.isBlocked,
  }
}
