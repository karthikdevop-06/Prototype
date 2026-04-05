import ProductCard, { type Product } from "./ProductCard";

interface Props {
  products: Product[];
  sortBy: string;
  onSortChange: (v: string) => void;
}

const ProductGrid = ({ products, sortBy, onSortChange }: Props) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-muted-foreground font-body">{products.length} product{products.length !== 1 ? "s" : ""}</p>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="text-sm font-body text-foreground bg-card border border-border rounded-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option>Best Selling</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest</option>
      </select>
    </div>
    {products.length === 0 ? (
      <div className="text-center py-16">
        <p className="font-display text-xl text-foreground mb-2">No products found</p>
        <p className="text-sm text-muted-foreground font-body">Try adjusting your filters</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </div>
);

export default ProductGrid;
