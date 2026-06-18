export interface Order {
  id: string; // uuid
  user_id: string | null;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  size: string | null;
  quantity: number;
  price: number;
}
