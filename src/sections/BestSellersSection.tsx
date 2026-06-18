import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";

export default function BestSellersSection() {
  const { products, loading } = useProducts();
  const bestSellers = products.filter((p) => p.best_seller).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Best Sellers"
          subtitle="The pieces our community can't stop wearing. Tried, tested, and loved."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
            {bestSellers.map((product, i) => (
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
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-secondary text-primary font-inter text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300"
            >
              Shop All Best Sellers
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
