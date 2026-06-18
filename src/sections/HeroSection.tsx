import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
          alt="Vintage Rush streetwear"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-[#111111]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-secondary" />
            <span className="font-inter text-xs sm:text-sm tracking-[0.3em] uppercase text-secondary font-medium">
              Premium Streetwear Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white"
          >
            Wear the Trend.
            <br />
            <span className="text-secondary">Own the Rush.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 sm:mt-8 font-inter text-base sm:text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
          >
            Premium streetwear crafted for the modern generation. Elevate your
            style with pieces that define culture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-4"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group px-8 py-4 bg-secondary text-primary font-poppins text-sm font-semibold tracking-widest uppercase rounded-full flex items-center gap-3 hover:bg-white transition-colors duration-300"
              >
                Shop Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </Link>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border border-white/20 text-white font-poppins text-sm font-semibold tracking-widest uppercase rounded-full hover:border-secondary hover:text-secondary transition-all duration-300"
              >
                Explore Collection
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
