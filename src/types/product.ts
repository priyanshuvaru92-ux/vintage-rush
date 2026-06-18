export interface Product {
  id: string; // uuid
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  featured: boolean;
  best_seller: boolean;
  created_at: string;
}
