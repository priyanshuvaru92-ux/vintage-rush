import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { memo } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default memo(function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [wishLoading, setWishLoading] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishLoading(true);
    await toggleWishlist(product.id);
    setWishLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
        {/* Image Container */}
        <div
          className="img-zoom"
          style={{
            position: "relative",
            overflow: "hidden",
            aspectRatio: "3/4",
            background: "#181818",
          }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Gradient overlay on hover */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)",
              opacity: 0, transition: "opacity 0.4s ease",
            }}
            className="card-overlay"
          />

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            disabled={wishLoading}
            style={{
              position: "absolute", top: "12px", right: "12px",
              width: "36px", height: "36px",
              borderRadius: "50%",
              background: "rgba(8,8,8,0.7)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${wishlisted ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.15)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: 0,
              transform: "translateY(4px)",
            }}
            className="wishlist-btn"
            aria-label="Add to wishlist"
          >
            <Heart
              size={15}
              style={{ color: wishlisted ? "#c9a96e" : "rgba(245,240,235,0.7)" }}
              fill={wishlisted ? "#c9a96e" : "none"}
            />
          </button>

          {/* Badges */}
          <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {product.featured && (
              <span style={{ padding: "4px 10px", background: "#e8dfd0", color: "#080808", fontFamily: '"DM Sans", sans-serif', fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                New
              </span>
            )}
            {product.best_seller && (
              <span style={{ padding: "4px 10px", background: "#c9a96e", color: "#080808", fontFamily: '"DM Sans", sans-serif', fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Bestseller
              </span>
            )}
          </div>

          {/* Quick View */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "16px",
              transform: "translateY(100%)",
              transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="quick-view"
          >
            <div style={{
              background: "rgba(8,8,8,0.85)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "10px",
              textAlign: "center",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#f5f0eb",
            }}>
              Quick View
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: 500, color: "#f5f0eb", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.3s" }}>
            {product.name}
          </h3>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "rgba(245,240,235,0.35)", textTransform: "capitalize", marginBottom: "6px" }}>
            {product.category}
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "18px", fontWeight: 500, color: "#e8dfd0" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>

      <style>{`
        .img-zoom:hover .card-overlay { opacity: 1 !important; }
        .img-zoom:hover .wishlist-btn { opacity: 1 !important; transform: translateY(0) !important; }
        .img-zoom:hover .quick-view { transform: translateY(0) !important; }
      `}</style>
    </motion.div>
  );
});
