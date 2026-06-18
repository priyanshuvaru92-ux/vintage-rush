import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  categories,
  sizeOptions,
  colorOptions,
  priceRanges,
} from "@/data/mockProducts";

interface FilterSidebarProps {
  selectedCategory: string;
  selectedSize: string;
  selectedColor: string;
  selectedPriceRange: number;
  onCategoryChange: (cat: string) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onPriceRangeChange: (index: number) => void;
  onReset: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const FilterContent = memo(function FilterContent({
  selectedCategory,
  selectedSize,
  selectedColor,
  selectedPriceRange,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onPriceRangeChange,
  onReset,
}: Omit<FilterSidebarProps, "mobileOpen" | "onMobileClose">) {
  const hasFilters =
    selectedCategory !== "All" ||
    selectedSize !== "" ||
    selectedColor !== "" ||
    selectedPriceRange !== 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-poppins text-lg font-semibold text-white tracking-wide">
          Filters
        </h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="font-inter text-xs tracking-wider uppercase text-secondary hover:text-white transition-colors duration-300"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-white/50 mb-4">
          Category
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "px-4 py-2 rounded-lg font-inter text-sm transition-all duration-300 border",
                selectedCategory === cat
                  ? "bg-secondary text-primary border-secondary font-medium"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-white/50 mb-4">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(selectedSize === size ? "" : size)}
              className={cn(
                "w-12 h-12 rounded-lg font-inter text-sm font-medium transition-all duration-300 border",
                selectedSize === size
                  ? "bg-secondary text-primary border-secondary"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-white/50 mb-4">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() =>
                onColorChange(selectedColor === color ? "" : color)
              }
              className={cn(
                "px-4 py-2 rounded-lg font-inter text-sm transition-all duration-300 border",
                selectedColor === color
                  ? "bg-secondary text-primary border-secondary font-medium"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-white/50 mb-4">
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => onPriceRangeChange(i)}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg font-inter text-sm text-left transition-all duration-300 border",
                selectedPriceRange === i
                  ? "bg-secondary text-primary border-secondary font-medium"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default memo(function FilterSidebar(props: FilterSidebarProps) {
  const { mobileOpen, onMobileClose, ...filterProps } = props;

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <FilterContent {...filterProps} />
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#111111] border-r border-white/10 z-50 overflow-y-auto no-scrollbar lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#111111] z-10">
                <span className="font-poppins text-lg font-bold tracking-[0.2em] uppercase text-secondary">
                  Filters
                </span>
                <button
                  onClick={onMobileClose}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <FilterContent {...filterProps} />
              </div>
              <div className="p-6 border-t border-white/10 sticky bottom-0 bg-[#111111]">
                <button
                  onClick={onMobileClose}
                  className="w-full py-3.5 bg-secondary text-primary font-poppins text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
