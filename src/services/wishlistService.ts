import { supabase } from '@/lib/supabase';
import { getSessionUserId } from '@/lib/session';

export const wishlistService = {
  async getWishlist() {
    const userId = await getSessionUserId();
    const { data, error } = await supabase
      .from('wishlist')
      .select('*, product:products(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
    return data || [];
  },

  async toggleWishlist(productId: string) {
    const userId = await getSessionUserId();
    
    // Check if exists
    const { data: existing } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      // Remove
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', existing.id);
      if (error) throw error;
      return { added: false };
    } else {
      // Add
      const { error } = await supabase
        .from('wishlist')
        .insert([{ user_id: userId, product_id: productId }]);
      if (error) throw error;
      return { added: true };
    }
  }
};
