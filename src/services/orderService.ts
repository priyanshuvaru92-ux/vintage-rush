import { supabase } from '@/lib/supabase';
import { getSessionUserId } from '@/lib/session';
import type { Order } from '@/types/order';

export const orderService = {
  async createOrder(orderData: Partial<Order>, items: { product_id: string, size: string, quantity: number, price: number }[]) {
    const userId = await getSessionUserId();
    
    // 1. Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ ...orderData, user_id: userId }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert order items
    const orderItems = items.map(item => ({
      ...item,
      order_id: order.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 3. Clear cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    return order;
  },

  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*, product:products(*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
    return data || [];
  },

  async getOrderDetails(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*, product:products(*))
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
    return data;
  }
};
