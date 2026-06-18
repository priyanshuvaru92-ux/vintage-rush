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
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-inter text-sm placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors duration-300"
      />
    </div>
  );
}
