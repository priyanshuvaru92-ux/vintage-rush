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
      <h4 className="font-inter text-xs tracking-[0.15em] uppercase text-[#78716C] mb-3 font-semibold">
        Quantity
      </h4>
      <div className="inline-flex items-center border border-[#E8E2D9] rounded-lg overflow-hidden bg-white">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-12 h-12 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 h-12 flex items-center justify-center font-inter text-sm font-semibold text-[#1C1917] border-x border-[#E8E2D9]">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-12 h-12 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
