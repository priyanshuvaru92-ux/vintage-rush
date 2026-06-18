import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { priceRanges, type SortOption } from "@/data/mockProducts";
import SEO from "@/components/SEO";
export default function ShopPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Size
    if (size) {
      result = result.filter((p) => p.sizes.includes(size));
    }

    // Color
    if (color) {
      result = result.filter((p) => p.colors.includes(color));
    }

    // Price
    const range = priceRanges[priceRange];
    if (range && range.max !== Infinity) {
      result = result.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
    }

    // Sort
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "featured":
      default:
        result.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
        break;
    }

    return result;
  }, [products, search, category, size, color, priceRange, sort]);

  const resetFilters = () => {
    setCategory("All");
    setSize("");
    setColor("");
    setPriceRange(0);
    setSearch("");
  };

  return (
    <>
      <SEO title="Shop Collection | Vintage Rush" />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#111111] pt-24 lg:pt-28 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Shop Collection
          </h1>
          <p className="mt-3 font-inter text-base text-white/40">
            Discover premium streetwear crafted for the bold
          </p>
          <div className="mt-4 h-[2px] w-16 bg-secondary" />
        </motion.div>

        {/* Search + Sort + Filter toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg font-inter text-sm text-white/70 hover:border-white/30 transition-all duration-300"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex gap-10">
          <FilterSidebar
            selectedCategory={category}
            selectedSize={size}
            selectedColor={color}
            selectedPriceRange={priceRange}
            onCategoryChange={setCategory}
            onSizeChange={setSize}
            onColorChange={setColor}
            onPriceRangeChange={setPriceRange}
            onReset={resetFilters}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="font-inter text-sm text-white/40">
                <span className="text-white font-medium">
                  {loading ? "-" : filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
              <div className="hidden sm:flex items-center gap-2 text-white/30">
                <LayoutGrid size={16} />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center"
              >
                <p className="font-poppins text-2xl text-white/30 mb-4">
                  No products found
                </p>
                <p className="font-inter text-sm text-white/20 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-secondary text-primary font-inter text-sm font-medium tracking-wider uppercase rounded-full hover:bg-white transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
}
