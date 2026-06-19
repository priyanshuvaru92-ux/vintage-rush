import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

function SkeletonCard() {
  return (
    <div>
      <div className="shimmer" style={{ aspectRatio: "3/4", width: "100%", borderRadius: "8px" }} />
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div className="shimmer" style={{ height: "14px", width: "70%", borderRadius: "2px" }} />
        <div className="shimmer" style={{ height: "12px", width: "40%", borderRadius: "2px" }} />
      </div>
    </div>
  );
}

export default function BestSellersSection() {
  const { products, loading } = useProducts();
  const bestSellers = products.filter((p) => p.best_seller).slice(0, 8);

  return (
    <section style={{ padding: "100px 0", background: "#FAF8F5" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E", display: "block", marginBottom: "12px" }}>
            — Community Favourites
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1, color: "#1C1917", margin: 0 }}>
              Best Sellers
            </h2>
            <Link to="/shop?filter=bestseller" style={{ textDecoration: "none" }}>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: '"DM Sans", sans-serif', fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#78716C", transition: "color 0.3s", cursor: "pointer" }}
              >
                Shop All <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="bestseller-grid">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)
            : bestSellers.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  style={{ position: "relative" }}
                >
                  {/* Decorative number */}
                  <span style={{
                    position: "absolute", top: "-16px", left: "8px",
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "80px", fontWeight: 300,
                    color: "rgba(28,25,23,0.06)",
                    lineHeight: 1, pointerEvents: "none",
                    zIndex: 0, userSelect: "none",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <ProductCard product={product} index={i} />
                  </div>
                </motion.div>
              ))
          }
        </div>
      </div>

      <style>{`
        .bestseller-grid { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 1024px) { .bestseller-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .bestseller-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
