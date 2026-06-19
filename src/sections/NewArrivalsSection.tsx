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

export default function NewArrivalsSection() {
  const { products, loading } = useProducts();
  const newArrivals = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section style={{ padding: "100px 0", background: "#FAF8F5" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E", display: "block", marginBottom: "12px" }}>
              — Just Landed
            </span>
            <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1, color: "#1C1917", margin: 0 }}>
              New Arrivals
            </h2>
          </div>
          <Link to="/shop?filter=new" style={{ textDecoration: "none" }}>
            <motion.span
              whileHover={{ gap: "16px", color: "#1C1917" }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: '"DM Sans", sans-serif', fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#78716C", transition: "color 0.3s", cursor: "pointer" }}
            >
              View All <ArrowRight size={14} />
            </motion.span>
          </Link>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="product-grid">
          {loading
            ? [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
            : newArrivals.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
          }
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
