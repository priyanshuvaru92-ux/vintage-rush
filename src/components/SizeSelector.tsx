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
        <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-white/50">
          Size
        </h4>
        <span className="font-inter text-xs text-secondary cursor-pointer hover:underline">
          Size Guide
        </span>
      </div>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "w-14 h-14 rounded-xl font-inter text-sm font-medium transition-all duration-300 border",
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
  );
}
