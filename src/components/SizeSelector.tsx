import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-[#78716C] font-semibold">
          Size
        </h4>
        <span className="font-inter text-xs text-[#B8974E] cursor-pointer hover:underline">
          Size Guide
        </span>
      </div>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "w-14 h-14 rounded-lg font-inter text-sm font-medium transition-all duration-300 border",
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
  );
}
