import { useState, useEffect, useCallback } from 'react';
import { wishlistService } from '@/services/wishlistService';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlistItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch wishlist'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId: string) => {
    try {
      const result = await wishlistService.toggleWishlist(productId);
      await fetchWishlist();
      return result.added;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const isWishlisted = (productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  return { wishlistItems, loading, error, toggleWishlist, isWishlisted, refetch: fetchWishlist };
}
