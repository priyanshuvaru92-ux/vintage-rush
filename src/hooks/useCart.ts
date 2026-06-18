import { useState, useEffect, useCallback } from 'react';
import { cartService } from '@/services/cartService';

export function useCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCartItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cart'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, size: string, quantity: number) => {
    try {
      await cartService.addToCart(productId, size, quantity);
      await fetchCart();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await cartService.removeFromCart(itemId);
      await fetchCart();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { cartItems, loading, error, addToCart, removeFromCart, refetch: fetchCart };
}
