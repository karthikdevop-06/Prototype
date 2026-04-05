import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "sale" | "new";
  category: string;
  material: string;
  inStock: boolean;
}

const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

const ProductCard = ({ product }: { product: Product }) => {
  const [liked, setLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Added to bag", description: `${product.name} has been added to your bag.` });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    toast({ title: liked ? "Removed from wishlist" : "Added to wishlist", description: product.name });
  };

  return (
    <div className="product-card group cursor-pointer">
      <div className="relative overflow-hidden" style={{ backgroundColor: "hsl(var(--product-image-bg))" }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={640}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        {product.badge === "sale" && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-body font-semibold px-2.5 py-1 rounded-sm"
            style={{ background: "hsl(var(--badge-sale))", color: "hsl(var(--badge-sale-fg))" }}>
            -{discount}%
          </span>
        )}
        {product.badge === "new" && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-body font-semibold px-2.5 py-1 rounded-sm"
            style={{ background: "hsl(var(--badge-new))", color: "hsl(var(--badge-new-fg))" }}>
            New
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <span className="text-sm font-body font-semibold text-foreground bg-card/90 px-4 py-2 rounded-sm">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-primary text-primary-foreground text-xs font-body font-semibold uppercase tracking-wider py-2.5 rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>
      <div className="p-3.5">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-body mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-base font-medium text-foreground leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm font-body text-muted-foreground line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          <span className={`text-sm font-body font-semibold ${product.originalPrice ? "text-accent" : "text-foreground"}`}>
            {formatINR(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
