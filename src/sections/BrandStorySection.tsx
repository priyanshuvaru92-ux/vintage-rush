import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandStorySection() {
  return (
    <section style={{ padding: "120px 0", background: "#F5F1EB", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="brand-story-grid">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <span className="gold-line" />
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E" }}>
                Our Story
              </span>
            </div>

            <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 400, lineHeight: 1.05, color: "#1C1917", marginBottom: "32px" }}>
              Born in Surat,<br />
              <span style={{ fontStyle: "italic", color: "#B8974E" }}>Made for the Streets</span>
            </h2>

            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "#78716C", lineHeight: "1.9", marginBottom: "20px", maxWidth: "460px" }}>
              Vintage Rush is more than a clothing brand — it's a movement rooted in authentic Indian street culture. We design for those who wear their identity with pride.
            </p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "#78716C", lineHeight: "1.9", marginBottom: "40px", maxWidth: "460px" }}>
              Every piece is crafted with intention: premium fabrics, thoughtful cuts, and timeless silhouettes that last beyond trends.
            </p>

            <div style={{ display: "flex", gap: "48px", marginBottom: "48px" }}>
              {[
                { number: "500+", label: "Products Sold" },
                { number: "100%", label: "Authentically Indian" },
                { number: "1 City", label: "Surat, Gujarat" },
              ].map(stat => (
                <div key={stat.label}>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "36px", fontWeight: 400, color: "#1C1917", lineHeight: 1 }}>
                    {stat.number}
                  </p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#78716C", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "4px" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/about" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
              >
                Read Our Story <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ position: "relative" }}
          >
            <div className="img-zoom" style={{ aspectRatio: "4/5", overflow: "hidden", background: "#EDE8DF", borderRadius: "8px" }}>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&q=85"
                alt="Vintage Rush brand story"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(250,248,245,0.05)" }} />
            </div>

            {/* Floating accent card */}
            <div style={{
              position: "absolute", bottom: "-24px", left: "-24px",
              background: "#FFFFFF", border: "1px solid #E8E2D9",
              borderRadius: "4px",
              boxShadow: "0 12px 32px rgba(28,25,23,0.08)",
              padding: "20px 28px",
            }}>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", fontWeight: 500, color: "#B8974E", margin: 0, lineHeight: 1.2 }}>
                "Premium Streetwear
              </p>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", fontWeight: 500, color: "#B8974E", margin: 0, lineHeight: 1.2, fontStyle: "italic" }}>
                for the Modern Indian."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .brand-story-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 768px) { .brand-story-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
