import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search templates..." 
}: SearchInputProps) {
  return (
    <div className="relative flex-1 group">
      <Search 
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4",
          "text-white/20",
          "group-focus-within:text-primary",
          "transition-colors duration-200"
        )} 
        aria-hidden="true"
      />
      <input
        type="text"
        role="searchbox"
        aria-label="Search templates"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full",
          "bg-white/[0.02] border border-white/10",
          "rounded-xl",
          "py-3 pl-12 pr-4",
          "text-sm text-white",
          "placeholder:text-white/20",
          "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
          "transition-all duration-200"
        )}
      />
    </div>
  );
}
