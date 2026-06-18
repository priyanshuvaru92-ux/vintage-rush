import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";

export default function NewArrivalsSection() {
  const { products, loading } = useProducts();
  const newArrivals = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="New Arrivals"
          subtitle="Fresh drops just landed. Be the first to own the latest streetwear essentials."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-white/20 text-white font-inter text-sm tracking-widest uppercase rounded-full hover:border-secondary hover:text-secondary transition-all duration-300"
            >
              View All
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
