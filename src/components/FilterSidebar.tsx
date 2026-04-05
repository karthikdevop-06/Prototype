import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterSection {
  title: string;
  options: { label: string; count: number }[];
}

const filters: FilterSection[] = [
  {
    title: "Availability",
    options: [
      { label: "In Stock", count: 142 },
      { label: "Pre-Order", count: 8 },
    ],
  },
  {
    title: "Category",
    options: [
      { label: "Brass", count: 38 },
      { label: "Ceramics", count: 27 },
      { label: "Woodwork", count: 31 },
      { label: "Textiles", count: 24 },
      { label: "Copper", count: 22 },
    ],
  },
  {
    title: "Price",
    options: [
      { label: "Under $50", count: 45 },
      { label: "$50 — $150", count: 52 },
      { label: "$150 — $300", count: 33 },
      { label: "Over $300", count: 20 },
    ],
  },
  {
    title: "Material",
    options: [
      { label: "Brass", count: 38 },
      { label: "Terracotta", count: 15 },
      { label: "Teak Wood", count: 22 },
      { label: "Rattan", count: 18 },
      { label: "Copper", count: 22 },
    ],
  },
];

const FilterSidebar = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Availability: true,
    Category: true,
    Price: false,
    Material: false,
  });

  const toggle = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <aside className="w-full">
      <h2 className="font-display text-xl font-semibold text-foreground mb-6">Filter</h2>
      {filters.map((section) => (
        <div key={section.title} className="border-t border-border py-4">
          <button
            onClick={() => toggle(section.title)}
            className="flex items-center justify-between w-full text-sm font-body font-medium text-foreground"
          >
            {section.title}
            {openSections[section.title] ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {openSections[section.title] && (
            <div className="mt-3 flex flex-col gap-2.5">
              {section.options.map((opt) => (
                <label key={opt.label} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-accent accent-accent focus:ring-accent"
                  />
                  <span className="text-sm font-body text-muted-foreground group-hover:text-foreground transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">({opt.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
