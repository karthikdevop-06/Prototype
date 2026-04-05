import ProductCard, { type Product } from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const products: Product[] = [
  { id: 1, name: "Golden Elephant Figurine", price: 45.00, originalPrice: 62.00, image: product1, badge: "sale", category: "Brass" },
  { id: 2, name: "Earth-Tone Ceramic Vase", price: 78.00, image: product2, badge: "new", category: "Ceramics" },
  { id: 3, name: "Woven Rattan Basket", price: 54.00, image: product3, category: "Textiles" },
  { id: 4, name: "Carved Floral Bowl", price: 89.00, originalPrice: 120.00, image: product4, badge: "sale", category: "Woodwork" },
  { id: 5, name: "Copper Candle Holder", price: 42.00, image: product5, category: "Copper" },
  { id: 6, name: "Rustic Terracotta Planter", price: 36.00, image: product6, badge: "new", category: "Ceramics" },
  { id: 7, name: "Golden Elephant Figurine — Large", price: 95.00, image: product1, category: "Brass" },
  { id: 8, name: "Ceramic Vase — Tall", price: 110.00, originalPrice: 140.00, image: product2, badge: "sale", category: "Ceramics" },
  { id: 9, name: "Artisan Rattan Bowl", price: 48.00, image: product3, badge: "new", category: "Textiles" },
];

const ProductGrid = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-muted-foreground font-body">{products.length} products</p>
      <select className="text-sm font-body text-foreground bg-card border border-border rounded-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring">
        <option>Best Selling</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest</option>
      </select>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default ProductGrid;
