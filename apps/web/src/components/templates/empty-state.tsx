import { Search } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01] mx-4 md:mx-6">
      <div className="flex justify-center mb-6 opacity-20">
        <Search className="w-12 h-12" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 italic">
        No templates found
      </h3>
      <p className="text-white/30">
        {searchQuery 
          ? `No results for "${searchQuery}". Try a different search term.`
          : "Try adjusting your search or category filter."
        }
      </p>
    </div>
  );
}
