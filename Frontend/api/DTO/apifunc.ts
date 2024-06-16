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
  return data.map((user: any) => {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isBlocked: user.blocked,
    }
  });
}

export const updateUser = async (user: UserDTO): Promise<UserDTO[]> => {
  let response = {} as any;
  try {
    response = await axios.post(`${apiBaseUrl}/admin/users/${user.id}/update`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('User updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
  return response.data;
}

export const createUser = async (user: UserDTO): Promise<UserDTO[]> => {
  const response = await axios.post(`${apiBaseUrl}/admin/users/create`, user);
  return response.data;
}

export const getUser = async (id: string): Promise<UserDTO> => {
  const response = await axios.get(`${apiBaseUrl}/admin/users/${id}/edit`);
  const user = response.data;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    password: 'password',
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
    isManager: user.isManager,
    isBlocked: user.isBlocked,
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await axios.delete(`${apiBaseUrl}/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function blockUser(id: string) {
  try {
    const response = await axios.post(`${apiBaseUrl}/admin/users/${id}/block`);
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
}

export async function unblockUser(id: string) {
  try {
    const response = await axios.post(`${apiBaseUrl}/admin/users/${id}/unblock`);
    return response.data;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
}