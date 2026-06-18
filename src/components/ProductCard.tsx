import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

import { memo } from "react";

export default memo(function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl bg-surface-light aspect-[3/4]">
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            aria-label="Add to wishlist"
          >
            <Heart size={16} />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="px-3 py-1 bg-secondary text-primary text-[10px] font-inter font-bold uppercase tracking-widest rounded-full">
                New
              </span>
            )}
            {product.best_seller && (
              <span className="px-3 py-1 bg-accent text-white text-[10px] font-inter font-bold uppercase tracking-widest rounded-full">
                Bestseller
              </span>
            )}
          </div>

          {/* Quick view */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-2.5 text-center text-white text-sm font-inter font-medium tracking-wide uppercase">
              Quick View
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1.5">
          <h3 className="font-poppins text-sm sm:text-base font-medium text-white group-hover:text-secondary transition-colors duration-300 truncate">
            {product.name}
          </h3>
          <p className="font-inter text-sm text-white/40 capitalize">
            {product.category}
          </p>
          <p className="font-poppins text-base sm:text-lg font-semibold text-secondary">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});
