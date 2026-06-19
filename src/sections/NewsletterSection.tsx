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
    <section style={{ padding: "120px 0", background: "#080808", position: "relative", overflow: "hidden" }}>
      {/* Gold glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(201,169,110,0.04)", filter: "blur(100px)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: "16px" }}>
            — Stay in the Loop
          </span>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1.05, color: "#f5f0eb", marginBottom: "16px" }}>
            Join the Rush
          </h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "rgba(245,240,235,0.45)", lineHeight: "1.8", marginBottom: "48px" }}>
            Be the first to hear about new drops, exclusive offers, and brand updates. No spam — only culture.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "24px 32px", border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.05)" }}
          >
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", fontWeight: 400, color: "#c9a96e" }}>
              Welcome to the Rush. ✦
            </p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "rgba(245,240,235,0.5)", marginTop: "8px" }}>
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
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRight: "none",
                color: "#f5f0eb",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "16px 20px",
                background: "#e8dfd0",
                color: "#080808",
                border: "none",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s",
                flexShrink: 0,
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#f5f0eb")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#e8dfd0")}
            >
              {status === "loading" ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={18} />}
            </button>
          </motion.form>
        )}

        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "rgba(245,240,235,0.25)", marginTop: "20px", letterSpacing: "0.05em" }}>
          By subscribing, you agree to our Privacy Policy. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
