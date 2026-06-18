import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div>
      <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-white/50 mb-3">
        Quantity
      </h4>
      <div className="inline-flex items-center border border-white/10 rounded-xl overflow-hidden">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 h-12 flex items-center justify-center font-inter text-sm font-medium text-white border-x border-white/10">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
