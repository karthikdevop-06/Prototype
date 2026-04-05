import { Heart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "sale" | "new";
  category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-foreground" />
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
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full bg-primary text-primary-foreground text-xs font-body font-semibold uppercase tracking-wider py-2.5 rounded-sm hover:opacity-90 transition-opacity">
            Quick View
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
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className={`text-sm font-body font-semibold ${product.originalPrice ? "text-accent" : "text-foreground"}`}>
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
