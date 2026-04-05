import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";

const navItems = ["New Arrivals", "Brass", "Ceramics", "Woodwork", "Textiles", "Home Decor", "About"];

interface Props {
  onSearchOpen?: () => void;
}

const Header = ({ onSearchOpen }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>

          <a href="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Kala Atelier
          </a>

          <div className="flex items-center gap-4">
            <button onClick={onSearchOpen}>
              <Search className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            </button>
            <User className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors hidden md:block" />
            <button className="relative hidden md:block" onClick={onSearchOpen ? undefined : undefined}>
              <Heart className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden md:block border-t border-border">
          <div className="container flex items-center justify-center gap-8 py-3">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-card">
            <div className="container py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
