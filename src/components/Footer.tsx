import { Link } from "react-router-dom";
import { Camera, MessageCircle, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const shopLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Best Sellers", href: "/shop?filter=bestseller" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  "Shipping Policy",
  "Return & Exchange",
  "Size Guide",
  "FAQ",
  "Track Order",
];

export default function Footer() {
  return (
    <footer style={{ background: "#FAF8F5", borderTop: "1px solid #E8E2D9", position: "relative", zIndex: 10 }}>
      
      {/* Top Section: Links & Contact */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "48px" }} className="footer-grid">

          {/* Brand Info */}
          <div className="footer-col-brand">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3 style={{
                fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1C1917",
                marginBottom: "20px",
              }}>
                VINTAGE RUSH
              </h3>
            </Link>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", lineHeight: "1.8", maxWidth: "260px", marginBottom: "28px" }}>
              Premium Indian streetwear born in Surat. Fusing subculture aesthetics with modern luxury construction.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: Camera, href: "https://instagram.com/vintagerush", label: "Instagram" },
                { icon: MessageCircle, href: "https://wa.me/919106485332", label: "WhatsApp" },
                { icon: Mail, href: "mailto:priyanshuvaru16@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "50%",
                    border: "1px solid #E8E2D9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#78716C",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1C1917";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#1C1917";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8E2D9";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#78716C";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1917", marginBottom: "24px" }}>
              Sitemap
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {shopLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1C1917")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#78716C")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1917", marginBottom: "24px" }}>
              Service
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {supportLinks.map(item => (
                <li key={item}>
                  <span
                    style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", cursor: "pointer", transition: "color 0.3s" }}
                    onMouseEnter={e => ((e.target as HTMLSpanElement).style.color = "#1C1917")}
                    onMouseLeave={e => ((e.target as HTMLSpanElement).style.color = "#78716C")}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1C1917", marginBottom: "24px" }}>
              Studio
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={14} style={{ color: "#1C1917", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", lineHeight: "1.6" }}>
                  Surat, Gujarat, India
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone size={14} style={{ color: "#1C1917", flexShrink: 0 }} />
                <a
                  href="tel:+919106485332"
                  style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1C1917")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#78716C")}
                >
                  +91 91064 85332
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail size={14} style={{ color: "#1C1917", flexShrink: 0 }} />
                <a
                  href="mailto:priyanshuvaru16@gmail.com"
                  style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", textDecoration: "none", transition: "color 0.3s", wordBreak: "break-all" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1C1917")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#78716C")}
                >
                  priyanshuvaru16@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919106485332"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "10px 20px",
                    background: "transparent",
                    border: "1px solid #1C1917",
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: "10px", fontWeight: 600,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "#1C1917", textDecoration: "none",
                    transition: "all 0.3s ease",
                    marginTop: "4px",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#1C1917";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#FAF8F5";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#1C1917";
                  }}
                >
                  <MessageCircle size={12} />
                  WhatsApp Us
                  <ArrowUpRight size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Massive Brand Typographic Statement */}
      <div style={{
        textAlign: "center",
        borderTop: "1px solid #E8E2D9",
        padding: "60px 24px",
        overflow: "hidden"
      }}>
        <h2 style={{
          fontFamily: '"Cinzel", "Cormorant Garamond", Georgia, serif',
          fontSize: "clamp(2rem, 11vw, 8.5rem)",
          fontWeight: 700,
          letterSpacing: "0.32em",
          color: "#1C1917",
          lineHeight: 1,
          margin: 0,
          textIndent: "0.32em", // offsets trailing letter spacing for exact center alignment
          textTransform: "uppercase",
          opacity: 0.95
        }} className="footer-title-large">
          VINTAGE RUSH
        </h2>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div style={{ borderTop: "1px solid #E8E2D9", maxWidth: "1280px", margin: "0 auto", padding: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#78716C", letterSpacing: "0.08em" }}>
          © 2026 Vintage Rush. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy", "Terms of Service"].map(item => (
            <span
              key={item}
              style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#78716C", cursor: "pointer", transition: "color 0.3s", letterSpacing: "0.08em" }}
              onMouseEnter={e => ((e.target as HTMLSpanElement).style.color = "#1C1917")}
              onMouseLeave={e => ((e.target as HTMLSpanElement).style.color = "#78716C")}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-title-large {
            letter-spacing: 0.15em !important;
            text-indent: 0.15em !important;
          }
        }
      `}</style>
    </footer>
  );
}
