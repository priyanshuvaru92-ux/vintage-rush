import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import UserDropdown from "@/components/auth/UserDropdown";

const navLinks = [
  { label: "Home", href: "/" },
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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#111111]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <h1 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.25em] uppercase text-white group-hover:text-secondary transition-colors duration-300">
                Vintage Rush
              </h1>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative font-inter text-sm tracking-wide uppercase transition-colors duration-300",
                    location.pathname === link.href
                      ? "text-secondary"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="p-2 text-white/70 hover:text-secondary transition-colors duration-300 hidden sm:block" aria-label="Search">
                <Search size={20} />
              </button>
              <Link to="/shop" className="p-2 text-white/70 hover:text-secondary transition-colors duration-300 relative" aria-label="Wishlist">
                <Heart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <button className="p-2 text-white/70 hover:text-secondary transition-colors duration-300 relative" aria-label="Cart">
                <ShoppingBag size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              
              <UserDropdown />
              
              <button
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#111111] border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-poppins text-lg font-bold tracking-[0.2em] uppercase text-secondary">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-1 p-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "block py-3 px-4 font-inter text-base tracking-wide uppercase rounded-lg transition-all duration-300",
                        location.pathname === link.href
                          ? "text-secondary bg-white/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Auth Link */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <Link
                    to="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 font-inter text-base tracking-wide uppercase text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                  >
                    <User size={18} />
                    Account
                  </Link>
                </motion.div>
              </div>
              <div className="p-6 border-t border-white/10">
                <p className="text-white/30 text-xs font-inter uppercase tracking-widest">
                  © 2026 Vintage Rush
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
