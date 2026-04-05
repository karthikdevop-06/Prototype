import { useState, useMemo } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CollectionHero from "@/components/CollectionHero";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { type Product } from "@/components/ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import { SlidersHorizontal, X } from "lucide-react";

const allProducts: Product[] = [
  { id: 1, name: "Golden Elephant Figurine", price: 3750, originalPrice: 5200, image: product1, badge: "sale", category: "Brass", material: "Brass", inStock: true },
  { id: 2, name: "Earth-Tone Ceramic Vase", price: 6500, image: product2, badge: "new", category: "Ceramics", material: "Terracotta", inStock: true },
  { id: 3, name: "Woven Rattan Basket", price: 4500, image: product3, category: "Textiles", material: "Rattan", inStock: true },
  { id: 4, name: "Carved Floral Bowl", price: 7400, originalPrice: 9999, image: product4, badge: "sale", category: "Woodwork", material: "Teak Wood", inStock: true },
  { id: 5, name: "Copper Candle Holder", price: 3500, image: product5, category: "Copper", material: "Copper", inStock: true },
  { id: 6, name: "Rustic Terracotta Planter", price: 2999, image: product6, badge: "new", category: "Ceramics", material: "Terracotta", inStock: true },
  { id: 7, name: "Golden Elephant Figurine — Large", price: 7900, image: product1, category: "Brass", material: "Brass", inStock: true },
  { id: 8, name: "Ceramic Vase — Tall", price: 9200, originalPrice: 11700, image: product2, badge: "sale", category: "Ceramics", material: "Terracotta", inStock: false },
  { id: 9, name: "Artisan Rattan Bowl", price: 3999, image: product3, badge: "new", category: "Textiles", material: "Rattan", inStock: true },
];

export interface Filters {
  categories: string[];
  materials: string[];
  priceRanges: string[];
  availability: string[];
}

const emptyFilters: Filters = { categories: [], materials: [], priceRanges: [], availability: [] };

const matchesPrice = (price: number, ranges: string[]): boolean => {
  if (ranges.length === 0) return true;
  return ranges.some((r) => {
    if (r === "Under ₹4,000") return price < 4000;
    if (r === "₹4,000 — ₹8,000") return price >= 4000 && price <= 8000;
    if (r === "₹8,000 — ₹15,000") return price >= 8000 && price <= 15000;
    if (r === "Over ₹15,000") return price > 15000;
    return true;
  });
};

const Index = () => {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sortBy, setSortBy] = useState("Best Selling");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.materials.length && !filters.materials.includes(p.material)) return false;
      if (!matchesPrice(p.price, filters.priceRanges)) return false;
      if (filters.availability.length) {
        if (filters.availability.includes("In Stock") && !p.inStock) return false;
        if (filters.availability.includes("Pre-Order") && p.inStock) return false;
      }
      return true;
    });

    switch (sortBy) {
      case "Price: Low to High":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        result = [...result].sort((a, b) => (a.badge === "new" ? -1 : 1));
        break;
    }
    return result;
  }, [filters, sortBy]);

  const activeFilterCount = filters.categories.length + filters.materials.length + filters.priceRanges.length + filters.availability.length;

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <CollectionHero />
      <main className="container py-6 md:py-8 flex-1">
        {/* Mobile filter toggle */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 text-sm font-body font-medium text-foreground border border-border rounded-sm px-3 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-accent text-accent-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={() => setFilters(emptyFilters)}
              className="text-xs font-body text-muted-foreground underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
            <div
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-card border-r border-border overflow-y-auto p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground">Filter</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
              {activeFilterCount > 0 && (
                <button
                  onClick={() => setFilters(emptyFilters)}
                  className="mt-4 w-full text-sm font-body text-accent underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block md:w-60 lg:w-64 shrink-0">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(emptyFilters)}
                className="mt-3 text-sm font-body text-accent underline"
              >
                Clear all filters
              </button>
            )}
          </div>
          <div className="flex-1">
            <ProductGrid products={filtered} sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>
      </main>
      <Footer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} products={allProducts} />
    </div>
  );
};

export default Index;
