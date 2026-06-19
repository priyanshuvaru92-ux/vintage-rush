import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-12 pr-6 py-3 bg-white border border-[#E8E2D9] rounded-lg text-[#1C1917] font-inter text-sm placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#1C1917] transition-colors duration-300"
      />
    </div>
  );
}
