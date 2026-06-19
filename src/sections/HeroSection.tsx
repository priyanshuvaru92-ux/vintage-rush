import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const words = ["Wear", "The", "Trend.", "Own", "The", "Rush."];

export default function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#080808" }}>
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1920&h=1080&fit=crop&q=85"
          alt="Vintage Rush premium streetwear"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.35 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #080808 40%, rgba(8,8,8,0.7) 70%, rgba(8,8,8,0.4))" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808 0%, transparent 50%)" }} />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Gold glow */}
      <div style={{ position: "absolute", top: "30%", left: "10%", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(201,169,110,0.04)", filter: "blur(120px)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ maxWidth: "700px" }}>
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}
          >
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: "#c9a96e" }} />
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e" }}>
              Premium Indian Streetwear
            </span>
          </motion.div>

          {/* Headline — word by word */}
          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px" }}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "inline-block",
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: "clamp(52px, 8vw, 96px)",
                    fontWeight: 300,
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    color: i >= 3 ? "#e8dfd0" : "#f5f0eb",
                    fontStyle: i >= 3 ? "italic" : "normal",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ marginTop: "32px", fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "rgba(245,240,235,0.45)", lineHeight: "1.8", maxWidth: "440px" }}
          >
            Based in Surat. Built for the streets. Elevate your wardrobe with pieces that define a generation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", gap: "16px" }}
          >
            <Link to="/shop" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
              >
                Shop Now
                <ArrowRight size={14} />
              </motion.button>
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(201,169,110,0.8), transparent)" }}
        />
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,235,0.3)" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
