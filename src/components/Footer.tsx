import { Link } from "react-router-dom";
import { Camera, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-poppins text-xl font-bold tracking-[0.2em] uppercase text-white mb-4">
              Vintage Rush
            </h3>
            <p className="text-white/50 font-inter text-sm leading-relaxed mb-6">
              Premium Indian streetwear brand crafted for the modern generation.
              We blend timeless vintage aesthetics with contemporary street
              culture.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary/50 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:hello@vintagerush.in"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary/50 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins text-sm font-semibold tracking-[0.15em] uppercase text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Shop All", href: "/shop" },
                { label: "New Arrivals", href: "/shop?filter=new" },
                { label: "Best Sellers", href: "/shop?filter=bestseller" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/40 hover:text-secondary font-inter text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-poppins text-sm font-semibold tracking-[0.15em] uppercase text-white mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                "Shipping Policy",
                "Return & Exchange",
                "Size Guide",
                "FAQ",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 hover:text-secondary font-inter text-sm transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins text-sm font-semibold tracking-[0.15em] uppercase text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/40 font-inter text-sm">
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-white/40 font-inter text-sm">
                  +91 99999 99999
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-white/40 font-inter text-sm">
                  hello@vintagerush.in
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-inter text-xs tracking-wider">
            © 2026 Vintage Rush. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span
                key={item}
                className="text-white/30 hover:text-white/60 font-inter text-xs tracking-wider cursor-pointer transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
