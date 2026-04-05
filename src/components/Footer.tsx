const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-16">
    <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-display text-xl font-semibold mb-4">Kala Atelier</h3>
        <p className="text-sm opacity-70 leading-relaxed font-body">
          Curating handcrafted artisan pieces since 2018. Every piece celebrates tradition, craft, and sustainable beauty.
        </p>
      </div>
      {[
        { title: "Shop", links: ["New Arrivals", "Brass", "Ceramics", "Woodwork", "Sale"] },
        { title: "Help", links: ["Contact Us", "Shipping", "Returns", "FAQ", "Size Guide"] },
        { title: "Company", links: ["Our Story", "Artisans", "Sustainability", "Careers", "Press"] },
      ].map((col) => (
        <div key={col.title}>
          <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">{col.title}</h4>
          <ul className="flex flex-col gap-2.5">
            {col.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm font-body opacity-70 hover:opacity-100 transition-opacity">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-body opacity-50">© 2026 Kala Atelier. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {["Instagram", "Pinterest", "Facebook"].map((s) => (
            <a key={s} href="#" className="text-xs font-body opacity-50 hover:opacity-100 transition-opacity">{s}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
