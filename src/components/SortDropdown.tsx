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
        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg font-inter text-sm text-white/70 hover:border-white/30 transition-all duration-300"
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
        <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30">
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
                  ? "bg-secondary/10 text-secondary"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
