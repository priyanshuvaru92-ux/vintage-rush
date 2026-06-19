import { motion } from "framer-motion";
import { Truck, MessageCircle, RotateCcw, Star } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    desc: "Crafted from carefully sourced fabrics. Every stitch is intentional.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Pan-India shipping with real-time tracking. We move at your pace.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Direct line to us. Order, track, or ask anything — we reply fast.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "7-day hassle-free return policy. Your satisfaction is our standard.",
  },
];

export default function WhyUsSection() {
  return (
    <section style={{ padding: "100px 0", background: "#FAF8F5" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E", display: "block", marginBottom: "12px" }}>
            — Why Choose Us
          </span>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1, color: "#1C1917", margin: 0 }}>
            The Rush Difference
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="why-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: "48px 36px",
                  background: "#FFFFFF",
                  border: "1px solid #E8E2D9",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(28,25,23,0.02)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  textAlign: "left",
                  cursor: "default",
                }}
                className="card-hover"
              >
                <div style={{ width: "48px", height: "48px", border: "1px solid rgba(184, 151, 78, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
                  <Icon size={20} style={{ color: "#B8974E" }} />
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "22px", fontWeight: 500, color: "#1C1917", marginBottom: "12px" }}>
                  {feature.title}
                </h3>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", lineHeight: "1.8" }}>
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-grid { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 1024px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
