import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import UserDropdown from "@/components/auth/UserDropdown";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Best Sellers", href: "/shop?filter=bestseller" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.5s ease",
          background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <nav style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
            
            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
              <span style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(16px, 2vw, 22px)",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#f5f0eb",
                transition: "color 0.3s ease",
              }}>
                VINTAGE RUSH
              </span>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: "none", alignItems: "center", gap: "40px" }} className="nav-desktop">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="underline-grow"
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: location.pathname === link.href.split("?")[0] ? "#e8dfd0" : "rgba(245,240,235,0.55)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <button
                style={{ padding: "8px", color: "rgba(245,240,235,0.6)", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s", display: "none" }}
                className="action-btn"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                to="/shop"
                style={{ padding: "8px", color: "rgba(245,240,235,0.6)", textDecoration: "none", position: "relative", transition: "color 0.3s", display: "flex" }}
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span style={{
                    position: "absolute", top: "2px", right: "2px",
                    width: "16px", height: "16px",
                    background: "#c9a96e", color: "#080808",
                    fontSize: "9px", fontWeight: 700,
                    borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/checkout"
                style={{ padding: "8px", color: "rgba(245,240,235,0.6)", textDecoration: "none", position: "relative", transition: "color 0.3s", display: "flex" }}
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute", top: "2px", right: "2px",
                    width: "16px", height: "16px",
                    background: "#e8dfd0", color: "#080808",
                    fontSize: "9px", fontWeight: 700,
                    borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              <UserDropdown />

              <button
                style={{ padding: "8px", color: "rgba(245,240,235,0.7)", background: "none", border: "none", cursor: "pointer" }}
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 50 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "300px", maxWidth: "85vw",
                background: "#111111",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                zIndex: 51, display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "18px", fontWeight: 500, letterSpacing: "0.25em", color: "#e8dfd0", textTransform: "uppercase" }}>
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: "8px", color: "rgba(245,240,235,0.6)", background: "none", border: "none", cursor: "pointer" }}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div style={{ flex: 1, padding: "32px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <Link
                  to="/"
                  style={{ padding: "12px 0", fontFamily: '"DM Sans", sans-serif', fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,235,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "block" }}
                >
                  Home
                </Link>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.href}
                      style={{
                        padding: "12px 0",
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
                        color: location.pathname === link.href.split("?")[0] ? "#e8dfd0" : "rgba(245,240,235,0.5)",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        display: "block",
                        transition: "color 0.3s",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", color: "rgba(245,240,235,0.25)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  © 2026 Vintage Rush
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Inline styles for responsive desktop nav */}
      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .action-btn { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
