import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Oversized",
    subtitle: "Effortlessly relaxed",
    tag: "Tees & Hoodies",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop&q=80",
    href: "/shop?category=oversized",
  },
  {
    id: 2,
    title: "Cargo",
    subtitle: "Utility meets street",
    tag: "Pants & Shorts",
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=800&h=1000&fit=crop&q=80",
    href: "/shop?category=cargo",
  },
  {
    id: 3,
    title: "Streetwear",
    subtitle: "Culture in every thread",
    tag: "Full Collection",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=1000&fit=crop&q=80",
    href: "/shop",
  },
];

export default function CollectionsSection() {
  return (
    <section style={{ padding: "100px 0", background: "#F5F1EB" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px", textAlign: "center" }}
        >
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E", display: "block", marginBottom: "12px" }}>
            — Explore Categories
          </span>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1, color: "#1C1917", margin: 0 }}>
            Collections
          </h2>
        </motion.div>

        {/* 3-column editorial grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="collections-grid">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link to={col.href} style={{ textDecoration: "none", display: "block" }}>
                <div
                  className="img-zoom card-hover"
                  style={{
                    position: "relative",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    background: "#EDE8DF",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Dark overlay for text readability on images */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.15) 50%, transparent 80%)" }} />

                  {/* Text */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 28px" }}>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8974E", marginBottom: "8px" }}>
                      {col.tag}
                    </p>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 400, lineHeight: 1, color: "#FAF8F5", marginBottom: "4px" }}>
                      {col.title}
                    </h3>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "rgba(250,248,245,0.7)", marginBottom: "16px" }}>
                      {col.subtitle}
                    </p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FAF8F5" }}>
                      Shop Now <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .collections-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 768px) { .collections-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
