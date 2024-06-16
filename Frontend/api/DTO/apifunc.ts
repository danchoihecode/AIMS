import axios from 'axios';
import { CartItemDTO } from './CartItemDTO';
import { UserDTO } from './UserDTO';
<<<<<<< HEAD
import { OrderDTO } from './OrderDTO';
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
=======

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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
};

// GET /cart
const getCart = async (): Promise<CartItem[]> => {
<<<<<<< HEAD
  const response = await axios.get<CartItem[]>(`${apiBaseUrl}/cart`);
  return response.data;
=======
    const response = await axios.get<CartItem[]>(`${apiBaseUrl}/cart`);
    return response.data;
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
};

// POST /cart
interface AddToCartRequest {
<<<<<<< HEAD
  product_id: string;
  qty: string;
}

const addToCart = async (data: AddToCartRequest): Promise<CartResponse> => {
  const response = await axios.post<CartResponse>(`${apiBaseUrl}/cart`, data);
  return response.data;
=======
    product_id: string;
    qty: string;
}

const addToCart = async (data: AddToCartRequest): Promise<CartResponse> => {
    const response = await axios.post<CartResponse>(`${apiBaseUrl}/cart`, data);
    return response.data;
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
};

export const getUsers = async (): Promise<UserDTO[]> => {
  const response = await axios.get(`${apiBaseUrl}/admin/users`);
  const data = response.data;
<<<<<<< HEAD
  return data.map((item: any) => {
    const qty = item.qty;
    const user = item.user;
=======
  return data.map((user: any) => {
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
<<<<<<< HEAD
      password: user.password,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isBlocked: user.isBlocked,
=======
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isBlocked: user.blocked,
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
    }
  });
}

export const updateUser = async (user: UserDTO): Promise<UserDTO[]> => {
<<<<<<< HEAD
  const response = await axios.put(`${apiBaseUrl}/admin/users/${user.id}`, user);
=======
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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
  return response.data;
}

export const createUser = async (user: UserDTO): Promise<UserDTO[]> => {
  const response = await axios.post(`${apiBaseUrl}/admin/users/create`, user);
  return response.data;
}

export const getUser = async (id: string): Promise<UserDTO> => {
<<<<<<< HEAD
  const response = await axios.get(`${apiBaseUrl}/admin/users/${id}`);
=======
  const response = await axios.get(`${apiBaseUrl}/admin/users/${id}/edit`);
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
  const user = response.data;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
<<<<<<< HEAD
    password: user.password,
=======
    password: 'password',
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
    isManager: user.isManager,
    isBlocked: user.isBlocked,
  }
}
<<<<<<< HEAD
export const getOrders = async (): Promise<OrderDTO[]> => {
  const response = await axios.get(`${apiBaseUrl}/manager/orders`);
  const data = response.data;
  return data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      amount: item.amount,
      state: item.state,
    }
  });
}

=======

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
>>>>>>> b07a15e8229340d3646ddb7be785e7b564c5ec48
