import { supabase } from '@/lib/supabase';
import { getSessionUserId } from '@/lib/session';

export const cartService = {
  async getCart() {
    const userId = await getSessionUserId();
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
    return data || [];
  },

  async addToCart(productId: string, size: string, quantity: number = 1) {
    const userId = await getSessionUserId();
    
    // Check if item already exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('size', size)
      .single();

    if (existing) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('cart_items')
        .insert([{ user_id: userId, product_id: productId, size, quantity }])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    }
  },

  async removeFromCart(itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
      
    if (error) throw error;
  }
};
