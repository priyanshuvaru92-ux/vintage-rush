import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sortOptions, type SortOption } from "@/data/mockProducts";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    sortOptions.find((o) => o.value === value)?.label ?? "Sort";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E2D9] rounded-lg font-inter text-sm text-[#1C1917] hover:border-[#1C1917] transition-all duration-300"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8E2D9] rounded-xl overflow-hidden shadow-2xl z-30">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left font-inter text-sm transition-all duration-200",
                value === option.value
                  ? "bg-[#F5F1EB] text-[#B8974E] font-medium"
                  : "text-[#78716C] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
              )}
              style={{ border: "none", cursor: "pointer" }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
