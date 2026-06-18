import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/productService';
import type { Product } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}
