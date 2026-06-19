import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=700&fit=crop&q=80", tall: true },
  { id: 2, src: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=500&fit=crop&q=80", tall: false },
  { id: 3, src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=700&fit=crop&q=80", tall: true },
  { id: 4, src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=500&fit=crop&q=80", tall: false },
  { id: 5, src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=700&fit=crop&q=80", tall: false },
  { id: 6, src: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=700&fit=crop&q=80", tall: true },
];

export default function InstagramGallerySection() {
  return (
    <section style={{ padding: "100px 0", background: "#F5F1EB" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8974E", display: "block", marginBottom: "12px" }}>
            — @vintagerush
          </span>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1, color: "#1C1917", margin: 0 }}>
            Follow Our World
          </h2>
        </motion.div>

        {/* Masonry-style Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "200px", gap: "12px" }} className="insta-grid">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "#EDE8DF",
                borderRadius: "8px",
                gridRow: img.tall ? "span 2" : "span 1",
                cursor: "pointer",
              }}
              className="img-zoom"
            >
              <img
                src={img.src}
                alt={`Vintage Rush style ${img.id}`}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(28,25,23,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: 0, transition: "opacity 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <Camera size={28} style={{ color: "#FAF8F5" }} />
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FAF8F5" }}>
                    View Post
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "48px" }}
        >
          <a
            href="https://instagram.com/vintagerush"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              className="btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
            >
              <Camera size={15} />
              Follow @vintagerush
            </button>
          </a>
        </motion.div>
      </div>

      <style>{`
        .insta-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 640px) { .insta-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
