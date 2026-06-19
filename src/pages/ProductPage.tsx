import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ChevronRight, Award, Truck, Wallet, MessageCircle, Loader2 } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import SizeSelector from "@/components/SizeSelector";
import QuantitySelector from "@/components/QuantitySelector";
import RelatedProducts from "@/components/RelatedProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import SEO from "@/components/SEO";

const deliveryFeatures = [
  { icon: Award, label: "Premium Quality" },
  { icon: Wallet, label: "Cash On Delivery" },
  { icon: MessageCircle, label: "WhatsApp Ordering" },
  { icon: Truck, label: "Fast Delivery" },
];

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug);
  const { products: allProducts } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize) return;
    setAddingToCart(true);
    await addToCart(product.id, selectedSize, quantity);
    setAddingToCart(false);
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    setAddingToWishlist(true);
    await toggleWishlist(product.id);
    setAddingToWishlist(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <Skeleton className="aspect-[3/4] w-full rounded-lg" style={{ background: "#EDE8DF" }} />
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/4" style={{ background: "#EDE8DF" }} />
              <Skeleton className="h-10 w-3/4" style={{ background: "#EDE8DF" }} />
              <Skeleton className="h-8 w-1/3" style={{ background: "#EDE8DF" }} />
              <Skeleton className="h-24 w-full" style={{ background: "#EDE8DF" }} />
              <Skeleton className="h-24 w-full" style={{ background: "#EDE8DF" }} />
              <Skeleton className="h-12 w-full" style={{ background: "#EDE8DF" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-poppins text-4xl font-bold text-[#1C1917] mb-4">
            Product Not Found
          </h1>
          <p className="font-inter text-[#78716C] mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            to="/shop"
            className="btn-primary"
            style={{ padding: "12px 32px", textDecoration: "none" }}
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <>
      <SEO 
        title={`${product.name} | Vintage Rush`} 
        description={product.description}
        type="product"
        image={product.images[0]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": product.images,
          "description": product.description,
          "sku": product.id,
          "offers": {
            "@type": "Offer",
            "url": `https://vintagerush.in/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.price,
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#FAF8F5] pt-24 lg:pt-28 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-8 font-inter text-sm text-[#78716C]"
          >
            <Link to="/" className="hover:text-[#1C1917] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-[#1C1917] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>
              Shop
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#1C1917] font-semibold">{product.name}</span>
          </motion.nav>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Title & Price */}
              <div>
                <p className="font-inter text-xs tracking-[0.2em] uppercase text-[#B8974E] mb-2 font-bold">
                  {product.category}
                </p>
                <h1 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1917] tracking-tight">
                  {product.name}
                </h1>
                <p className="mt-4 font-poppins text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 font-inter text-xs text-[#78716C]/60">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Description */}
              <p className="font-inter text-sm sm:text-base text-[#78716C] leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
              />

              {/* Quantity */}
              <QuantitySelector value={quantity} onChange={setQuantity} />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={addingToCart || !selectedSize}
                  className="btn-primary flex-1 flex items-center justify-center gap-3 px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingToCart ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBag size={18} />}
                  Buy Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleToggleWishlist}
                  disabled={addingToWishlist}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 border font-poppins text-sm font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    wishlisted 
                      ? 'border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 bg-red-50' 
                      : 'border-[#C4B89F] text-[#1C1917] hover:border-[#1C1917] hover:bg-[#FAF8F5]'
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {addingToWishlist ? <Loader2 size={18} className="animate-spin" /> : <Heart size={18} className={wishlisted ? "fill-current" : ""} />}
                  {wishlisted ? "Wishlisted" : "Add To Wishlist"}
                </motion.button>
              </div>
              
              {!selectedSize && (
                <p className="text-red-600 text-xs font-inter mt-1">Please select a size before adding to cart.</p>
              )}

              {/* Delivery Features */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {deliveryFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3 p-3.5 bg-white border border-[#E8E2D9] rounded-lg"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#B8974E]" />
                      </div>
                      <span className="font-inter text-xs sm:text-sm text-[#78716C]">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Product Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 pt-16 border-t border-[#E8E2D9]"
          >
            <h2 className="font-poppins text-2xl font-bold text-[#1C1917] mb-6">
              Product Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="font-inter text-sm text-[#78716C] leading-relaxed">
                  {product.description}
                </p>
                <p className="font-inter text-sm text-[#78716C] leading-relaxed">
                  Crafted from premium 240 GSM cotton, designed for everyday
                  comfort and modern streetwear styling. Each piece undergoes
                  rigorous quality checks to ensure the perfect fit and finish.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#E8E2D9]">
                  <span className="font-inter text-sm text-[#78716C]/60">
                    Material
                  </span>
                  <span className="font-inter text-sm text-[#1C1917] font-semibold">
                    Premium Cotton
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E2D9]">
                  <span className="font-inter text-sm text-[#78716C]/60">Fit</span>
                  <span className="font-inter text-sm text-[#1C1917] font-semibold">
                    Relaxed / Oversized
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E2D9]">
                  <span className="font-inter text-sm text-[#78716C]/60">
                    Care
                  </span>
                  <span className="font-inter text-sm text-[#1C1917] font-semibold">
                    Machine Wash Cold
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E2D9]">
                  <span className="font-inter text-sm text-[#78716C]/60">
                    Available Sizes
                  </span>
                  <span className="font-inter text-sm text-[#1C1917] font-semibold">
                    {product.sizes.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E8E2D9]">
                  <span className="font-inter text-sm text-[#78716C]/60">
                    Category
                  </span>
                  <span className="font-inter text-sm text-[#1C1917] font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </motion.div>
    </>
  );
}
