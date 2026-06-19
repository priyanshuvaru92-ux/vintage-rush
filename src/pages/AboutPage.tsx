import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import SEO from "@/components/SEO";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | Vintage Rush"
        description="Vintage Rush is a premium Indian streetwear brand born in Surat. Learn our story, mission, and vision."
      />

      {/* Hero */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", background: "#FAF8F5", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(184,151,78,0.03)", filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: "800px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span className="gold-line" />
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E" }}>
                Our Story
              </span>
            </div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.0, color: "#1C1917", marginBottom: "32px" }}>
              Born in Surat,<br />
              <span style={{ fontStyle: "italic", color: "#B8974E" }}>Built for the Streets</span>
            </h1>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "18px", color: "#78716C", lineHeight: "1.9", maxWidth: "560px" }}>
              We started Vintage Rush with a single belief: that Indian street culture deserves a premium voice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: "100px 0", background: "#F5F1EB" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="about-grid">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="img-zoom" style={{ aspectRatio: "4/5", overflow: "hidden", background: "#EDE8DF", borderRadius: "8px" }}>
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop&q=85"
                  alt="Vintage Rush founders"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "#78716C", lineHeight: "2", marginBottom: "24px" }}>
                What started as a passion project in Surat quickly became a full-fledged movement. We saw a gap: premium quality streetwear that spoke authentically to Indian youth. Not imported trends, but a voice that was entirely our own.
              </p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "#78716C", lineHeight: "2", marginBottom: "24px" }}>
                Every collection is designed with intent. We source premium fabrics, work with local artisans, and ensure every cut fits the way Indian bodies actually move. No compromise, ever.
              </p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "15px", color: "#78716C", lineHeight: "2", marginBottom: "40px" }}>
                Today, Vintage Rush ships pan-India, but our heart is still in Surat. We're a community, a culture, and a brand — all in one.
              </p>

              <Link to="/shop" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
                >
                  Shop the Collection <ArrowRight size={14} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "100px 0", background: "#FAF8F5" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "72px" }}
          >
            <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#1C1917" }}>
              Our Values
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="values-grid">
            {[
              { title: "Authenticity", body: "Every piece reflects real Indian street culture. No imitation. No shortcuts." },
              { title: "Quality", body: "Premium fabrics, premium feel. We never compromise on the material or the craft." },
              { title: "Community", body: "Vintage Rush is built by, and for, the people who wear it. Our community shapes what we create." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: "48px 40px",
                  background: "#FFFFFF",
                  border: "1px solid #E8E2D9",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(28,25,23,0.02)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                className="card-hover"
              >
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "48px", fontWeight: 300, color: "rgba(184,151,78,0.25)", display: "block", marginBottom: "16px", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "28px", fontWeight: 500, color: "#1C1917", marginBottom: "12px" }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#78716C", lineHeight: "1.8" }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: "80px 0 100px", background: "#F5F1EB", borderTop: "1px solid #E8E2D9" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: "#1C1917", marginBottom: "16px" }}>
            Get in Touch
          </h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#78716C", marginBottom: "40px", lineHeight: "1.8" }}>
            Questions, collaborations, or just a conversation? We'd love to hear from you.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            {[
              { icon: MapPin, text: "Surat, Gujarat, India" },
              { icon: Phone, text: "+91 91064 85332", href: "tel:+919106485332" },
              { icon: Mail, text: "priyanshuvaru16@gmail.com", href: "mailto:priyanshuvaru16@gmail.com" },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon size={16} style={{ color: "#B8974E" }} />
                {href ? (
                  <a href={href} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#78716C", textDecoration: "none" }} className="hover:text-[#1C1917] transition-colors">
                    {text}
                  </a>
                ) : (
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#78716C" }}>{text}</span>
                )}
              </div>
            ))}
          </div>
          <Link to="/contact" style={{ textDecoration: "none", display: "inline-block", marginTop: "40px" }}>
            <button className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              Contact Us <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr !important; }
        .values-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
