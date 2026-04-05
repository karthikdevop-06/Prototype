import { X, Search } from "lucide-react";
import { useState, useMemo } from "react";
import type { Product } from "@/components/ProductCard";

interface Props {
  open: boolean;
  onClose: () => void;
  products: Product[];
}

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const SearchOverlay = ({ open, onClose, products }: Props) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      <div className="container max-w-2xl pt-20">
        <div className="flex items-center gap-3 border-b-2 border-foreground pb-3">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products…"
            autoFocus
            className="flex-1 bg-transparent text-lg font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={() => { setQuery(""); onClose(); }}>
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <p className="text-sm text-muted-foreground font-body py-8 text-center">
              No products found for "{query}"
            </p>
          )}
          {results.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 py-3 border-b border-border hover:bg-muted/50 px-2 rounded-sm cursor-pointer transition-colors"
              onClick={onClose}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-sm"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-sm font-medium text-foreground truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-muted-foreground font-body">{product.category}</p>
              </div>
              <span className="text-sm font-body font-semibold text-foreground shrink-0">
                {formatINR(product.price)}
              </span>
            </div>
          ))}
          {!query.trim() && (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground font-body">
                Start typing to search products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
