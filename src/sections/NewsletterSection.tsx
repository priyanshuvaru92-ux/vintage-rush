import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate submit
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section style={{ padding: "120px 0", background: "#FAF8F5", position: "relative", overflow: "hidden", borderTop: "1px solid #E8E2D9" }}>
      {/* Subtle warm glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(184,151,78,0.04)", filter: "blur(100px)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E", display: "block", marginBottom: "16px" }}>
            — Stay in the Loop
          </span>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1.05, color: "#1C1917", marginBottom: "16px" }}>
            Join the Rush
          </h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#78716C", lineHeight: "1.8", marginBottom: "48px" }}>
            Be the first to hear about new drops, exclusive offers, and brand updates. No spam — only culture.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "24px 32px", border: "1px solid #C4B89F", background: "#F5F1EB", borderRadius: "8px" }}
          >
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", fontWeight: 500, color: "#B8974E" }}>
              Welcome to the Rush. ✦
            </p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", marginTop: "8px" }}>
              You're on the list. Check your inbox soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "0", maxWidth: "480px", margin: "0 auto" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: "16px 20px",
                background: "#FFFFFF",
                border: "1px solid #C4B89F",
                borderRight: "none",
                borderRadius: "8px 0 0 8px",
                color: "#1C1917",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "#1C1917")}
              onBlur={e => (e.target.style.borderColor = "#C4B89F")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "16px 24px",
                background: "#1C1917",
                color: "#FAF8F5",
                border: "1px solid #1C1917",
                borderRadius: "0 8px 8px 0",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s",
                flexShrink: 0,
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#44403C")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#1C1917")}
            >
              {status === "loading" ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={18} />}
            </button>
          </motion.form>
        )}

        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#78716C", marginTop: "20px", letterSpacing: "0.05em" }}>
          By subscribing, you agree to our Privacy Policy. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
