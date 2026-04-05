import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Props {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: Props) => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute right-0 top-0 bottom-0 w-[90%] max-w-md bg-card border-l border-border flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Your Bag ({totalItems})
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            <p className="font-display text-lg text-foreground">Your bag is empty</p>
            <p className="text-sm text-muted-foreground font-body text-center">
              Add some beautiful artisan pieces to get started.
            </p>
            <button
              onClick={onClose}
              className="mt-2 bg-primary text-primary-foreground text-sm font-body font-semibold uppercase tracking-wider px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b border-border pb-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      {item.product.category}
                    </p>
                    <p className="text-sm font-body font-semibold text-foreground mt-1">
                      {formatINR(item.product.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-sm border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-body font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-sm border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-xs text-muted-foreground underline font-body hover:text-foreground transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg font-semibold text-foreground">
                  {formatINR(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Shipping & taxes calculated at checkout
              </p>
              <button className="w-full bg-primary text-primary-foreground text-sm font-body font-semibold uppercase tracking-wider py-3 rounded-sm hover:opacity-90 transition-opacity">
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full text-sm font-body text-muted-foreground underline hover:text-foreground transition-colors"
              >
                Clear Bag
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
