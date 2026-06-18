import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const banners = [
  {
    title: "Oversized Tees",
    subtitle: "Comfort meets culture",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=600&fit=crop",
    href: "/shop",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Hoodies",
    subtitle: "Layered for every season",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    href: "/shop",
    span: "",
  },
  {
    title: "Cargo Pants",
    subtitle: "Street-ready utility",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop",
    href: "/shop",
    span: "",
  },
];

export default function TrendingSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Trending Collection
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg text-white/40">
            Explore the styles defining the streets right now
          </p>
          <div className="mt-6 h-[2px] w-16 bg-secondary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 sm:gap-6">
          {banners.map((banner, i) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={banner.span}
            >
              <Link
                to={banner.href}
                className="group relative block w-full h-full min-h-[250px] sm:min-h-[300px] rounded-2xl overflow-hidden"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="font-inter text-xs tracking-[0.2em] uppercase text-secondary">
                    {banner.subtitle}
                  </span>
                  <h3 className="mt-2 font-poppins text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                    {banner.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
