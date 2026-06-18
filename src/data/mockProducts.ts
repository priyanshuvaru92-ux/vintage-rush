export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  featured: boolean;
  bestSeller: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    slug: "oversized-black-tee",
    name: "Oversized Black Tee",
    description:
      "Crafted from premium 240 GSM cotton, this oversized black tee delivers the perfect blend of comfort and streetwear style. Features a relaxed drop-shoulder fit with reinforced stitching for long-lasting wear.",
    price: 1299,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: 2,
    slug: "vintage-beige-tee",
    name: "Vintage Beige Tee",
    description:
      "A warm beige oversized tee with vintage wash finish. Made from 100% combed cotton for a buttery soft feel. Perfect for layering or wearing solo with cargo pants.",
    price: 1199,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    images: [
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop",
    ],
    featured: true,
    bestSeller: false,
  },
  {
    id: 3,
    slug: "shadow-hoodie",
    name: "Shadow Hoodie",
    description:
      "The Shadow Hoodie features a heavyweight 380 GSM French terry construction with a spacious kangaroo pocket and adjustable drawcord hood. The washed black finish gives it that perfect lived-in look.",
    price: 2499,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1578768079470-fa153bb36f32?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: 4,
    slug: "cargo-pants",
    name: "Cargo Pants",
    description:
      "Utility-inspired cargo pants with multiple pockets and an adjustable waistband. Made from durable twill fabric with a slight stretch for unrestricted movement. Tapered leg for a modern silhouette.",
    price: 2199,
    category: "Pants",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: 5,
    slug: "essential-white-tee",
    name: "Essential White Tee",
    description:
      "The essential white tee every wardrobe needs. Premium 200 GSM cotton with a clean, minimalist design. Pre-shrunk fabric ensures the perfect fit wash after wash.",
    price: 999,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: true,
  },
  {
    id: 6,
    slug: "brown-oversized-tee",
    name: "Brown Oversized Tee",
    description:
      "An earth-toned oversized tee in rich chocolate brown. The 240 GSM bio-washed cotton delivers exceptional softness with a vintage aesthetic that pairs perfectly with any streetwear look.",
    price: 1299,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown"],
    images: [
      "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: true,
  },
  {
    id: 7,
    slug: "urban-black-hoodie",
    name: "Urban Black Hoodie",
    description:
      "A premium zip-up hoodie in jet black. Features brushed fleece lining, ribbed cuffs and hem, and a metal YKK zipper. The structured hood holds its shape for a clean, modern look.",
    price: 2799,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    images: [
      "https://images.unsplash.com/photo-1578768079470-fa153bb36f32?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: true,
  },
  {
    id: 8,
    slug: "cream-hoodie",
    name: "Cream Hoodie",
    description:
      "A luxurious cream pullover hoodie crafted from 400 GSM premium loopback cotton. The oversized fit and dropped shoulders create a relaxed silhouette, while the embossed logo adds subtle branding.",
    price: 2599,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Beige"],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1578768079470-fa153bb36f32?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: false,
  },
  {
    id: 9,
    slug: "washed-grey-tee",
    name: "Washed Grey Tee",
    description:
      "A stone-washed grey tee with a perfectly faded vintage look. Each piece is individually garment-dyed for a unique finish. 220 GSM cotton with a regular relaxed fit.",
    price: 1099,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: false,
  },
  {
    id: 10,
    slug: "relaxed-cargo-pants",
    name: "Relaxed Cargo Pants",
    description:
      "Wide-leg cargo pants with a relaxed fit for maximum comfort. Features oversized utility pockets, an elastic waistband with drawcord, and reinforced knee panels. Made from heavyweight cotton canvas.",
    price: 2399,
    category: "Pants",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: true,
  },
  {
    id: 11,
    slug: "minimal-street-tee",
    name: "Minimal Street Tee",
    description:
      "A clean, minimal tee with a subtle chest print. The 200 GSM compact cotton provides a structured feel while maintaining breathability. Designed for those who appreciate understated style.",
    price: 1199,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: false,
  },
  {
    id: 12,
    slug: "classic-vintage-tee",
    name: "Classic Vintage Tee",
    description:
      "The Classic Vintage Tee is a tribute to old-school streetwear. Features acid-wash treatment, distressed detailing, and a boxy fit. Made from 240 GSM ringspun cotton for that authentic vintage weight.",
    price: 1399,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&h=750&fit=crop",
    ],
    featured: false,
    bestSeller: false,
  },
];

export const categories = ["All", "T-Shirts", "Hoodies", "Pants"];

export const sizeOptions = ["S", "M", "L", "XL"];

export const colorOptions = [
  "Black",
  "White",
  "Beige",
  "Brown",
  "Grey",
  "Olive",
  "Cream",
];

export const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 999 },
  { label: "₹1,000 — ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 — ₹3,000", min: 2000, max: 3000 },
];

export type SortOption = "featured" | "newest" | "price-low" | "price-high";

export const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
];
