import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";

const navItems = ["New Arrivals", "Brass", "Ceramics", "Woodwork", "Textiles", "Home Decor", "About"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        <a href="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          Kala Atelier
        </a>

        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          <User className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors hidden md:block" />
          <Heart className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors hidden md:block" />
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              0
            </span>
          </div>
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
  );
};

export default Header;
