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
        <h3 className="font-poppins text-lg font-semibold text-[#1C1917] tracking-wide">
          Filters
        </h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="font-inter text-xs tracking-wider uppercase text-[#B8974E] hover:text-[#1C1917] transition-colors duration-300"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-[#78716C] mb-4 font-semibold">
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
                  ? "bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] font-semibold"
                  : "bg-white text-[#78716C] border-[#E8E2D9] hover:border-[#1C1917] hover:text-[#1C1917]"
              )}
              style={{ cursor: "pointer" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-[#78716C] mb-4 font-semibold">
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
                  ? "bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]"
                  : "bg-white text-[#78716C] border-[#E8E2D9] hover:border-[#1C1917] hover:text-[#1C1917]"
              )}
              style={{ cursor: "pointer" }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-[#78716C] mb-4 font-semibold">
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
                  ? "bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] font-semibold"
                  : "bg-white text-[#78716C] border-[#E8E2D9] hover:border-[#1C1917] hover:text-[#1C1917]"
              )}
              style={{ cursor: "pointer" }}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-[#78716C] mb-4 font-semibold">
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
                  ? "bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] font-semibold"
                  : "bg-white text-[#78716C] border-[#E8E2D9] hover:border-[#1C1917] hover:text-[#1C1917]"
              )}
              style={{ cursor: "pointer" }}
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
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#FAF8F5] border-r border-[#E8E2D9] z-50 overflow-y-auto no-scrollbar lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#E8E2D9] sticky top-0 bg-[#FAF8F5] z-10">
                <span className="font-poppins text-lg font-bold tracking-[0.2em] uppercase text-[#1C1917]">
                  Filters
                </span>
                <button
                  onClick={onMobileClose}
                  className="p-2 text-[#78716C] hover:text-[#1C1917] transition-colors"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <FilterContent {...filterProps} />
              </div>
              <div className="p-6 border-t border-[#E8E2D9] sticky bottom-0 bg-[#FAF8F5]">
                <button
                  onClick={onMobileClose}
                  className="w-full py-3 bg-[#1C1917] text-[#FAF8F5] font-poppins text-sm font-semibold tracking-widest uppercase rounded-lg hover:bg-[#44403C] transition-colors duration-300"
                  style={{ border: "none", cursor: "pointer" }}
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
