import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 — Not Found | Vintage Rush" description="Page not found." />
      <div style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background number */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: "clamp(200px, 30vw, 400px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.015)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          404
        </div>

        {/* Gold glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(201,169,110,0.04)", filter: "blur(100px)", pointerEvents: "none" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", position: "relative" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: "#c9a96e" }} />
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e" }}>
              Page Not Found
            </span>
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: "#c9a96e" }} />
          </div>

          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 300, lineHeight: 1, color: "#f5f0eb", marginBottom: "20px" }}>
            You're Off the Map
          </h1>

          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "rgba(245,240,235,0.45)", marginBottom: "48px", maxWidth: "400px", lineHeight: "1.8", margin: "0 auto 48px" }}>
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
              >
                <ArrowLeft size={14} />
                Back to Home
              </motion.button>
            </Link>
            <Link to="/shop" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                Browse Collection
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
