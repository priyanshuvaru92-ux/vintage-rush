import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Loader2, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    color: "#f5f0eb",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(245,240,235,0.4)",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <>
      <SEO
        title="Contact Us | Vintage Rush"
        description="Reach out to Vintage Rush. We're based in Surat, Gujarat. WhatsApp, email, or use the contact form."
      />

      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px", background: "#080808" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: "16px" }}>
              — Get in Touch
            </span>
            <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 300, lineHeight: 1, color: "#f5f0eb", marginBottom: "24px" }}>
              Let's Talk
            </h1>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "16px", color: "rgba(245,240,235,0.45)", lineHeight: "1.8", maxWidth: "500px" }}>
              Whether it's an order query, a collaboration, or just a hello — we're here for all of it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "60px 0 120px", background: "#080808" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px" }} className="contact-grid">

            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div style={{ marginBottom: "48px" }}>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "30px", fontWeight: 400, color: "#f5f0eb", marginBottom: "24px" }}>
                  Contact Information
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { icon: MapPin, label: "Location", value: "Surat, Gujarat, India", href: undefined },
                    { icon: Phone, label: "Phone", value: "+91 91064 85332", href: "tel:+919106485332" },
                    { icon: Mail, label: "Email", value: "priyanshuvaru16@gmail.com", href: "mailto:priyanshuvaru16@gmail.com" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} style={{ display: "flex", gap: "16px" }}>
                      <div style={{ width: "40px", height: "40px", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: "#c9a96e" }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,235,0.35)", marginBottom: "4px" }}>
                          {label}
                        </p>
                        {href ? (
                          <a href={href} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "rgba(245,240,235,0.7)", textDecoration: "none", transition: "color 0.3s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#e8dfd0")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,235,0.7)")}
                          >
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "rgba(245,240,235,0.7)" }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919106485332?text=Hi%20Vintage%20Rush%2C%20I%20have%20a%20query."
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "12px",
                    padding: "16px 28px",
                    background: "rgba(37,211,102,0.08)",
                    border: "1px solid rgba(37,211,102,0.3)",
                    color: "#25D366",
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: "12px", fontWeight: 600,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(37,211,102,0.12)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(37,211,102,0.08)")}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </motion.button>
              </a>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ padding: "48px", border: "1px solid rgba(201,169,110,0.2)", background: "rgba(201,169,110,0.03)", textAlign: "center" }}
                >
                  <CheckCircle size={40} style={{ color: "#c9a96e", margin: "0 auto 16px" }} />
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "28px", fontWeight: 400, color: "#f5f0eb", marginBottom: "12px" }}>
                    Message Sent
                  </h3>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "rgba(245,240,235,0.5)" }}>
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        placeholder="Your name"
                        onFocus={e => (e.target.style.borderBottomColor = "#c9a96e")}
                        onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        placeholder="you@example.com"
                        onFocus={e => (e.target.style.borderBottomColor = "#c9a96e")}
                        onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={inputStyle}
                      placeholder="How can we help?"
                      onFocus={e => (e.target.style.borderBottomColor = "#c9a96e")}
                      onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "none", lineHeight: "1.7" }}
                      placeholder="Tell us more..."
                      onFocus={e => ((e.target as HTMLTextAreaElement).style.borderBottomColor = "#c9a96e")}
                      onBlur={e => ((e.target as HTMLTextAreaElement).style.borderBottomColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary"
                    style={{ width: "fit-content", display: "inline-flex", alignItems: "center", gap: "10px" }}
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                    ) : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.2fr !important; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
