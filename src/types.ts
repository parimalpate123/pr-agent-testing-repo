// User type definitions
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}
