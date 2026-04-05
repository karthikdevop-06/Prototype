import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Filters } from "@/pages/Index";

interface FilterSection {
  title: string;
  filterKey: keyof Filters;
  options: { label: string; count: number }[];
}

const filterSections: FilterSection[] = [
  {
    title: "Availability",
    filterKey: "availability",
    options: [
      { label: "In Stock", count: 8 },
      { label: "Pre-Order", count: 1 },
    ],
  },
  {
    title: "Category",
    filterKey: "categories",
    options: [
      { label: "Brass", count: 2 },
      { label: "Ceramics", count: 3 },
      { label: "Woodwork", count: 1 },
      { label: "Textiles", count: 2 },
      { label: "Copper", count: 1 },
    ],
  },
  {
    title: "Price",
    filterKey: "priceRanges",
    options: [
      { label: "Under ₹4,000", count: 4 },
      { label: "₹4,000 — ₹8,000", count: 3 },
      { label: "₹8,000 — ₹15,000", count: 2 },
      { label: "Over ₹15,000", count: 0 },
    ],
  },
  {
    title: "Material",
    filterKey: "materials",
    options: [
      { label: "Brass", count: 2 },
      { label: "Terracotta", count: 3 },
      { label: "Teak Wood", count: 1 },
      { label: "Rattan", count: 2 },
      { label: "Copper", count: 1 },
    ],
  },
];

interface Props {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
}

const FilterSidebar = ({ filters, onFiltersChange }: Props) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Availability: true,
    Category: true,
    Price: false,
    Material: false,
  });

  const toggle = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const handleCheck = (key: keyof Filters, label: string, checked: boolean) => {
    const current = filters[key];
    const updated = checked ? [...current, label] : current.filter((v) => v !== label);
    onFiltersChange({ ...filters, [key]: updated });
  };

  return (
    <aside className="w-full">
      <h2 className="font-display text-xl font-semibold text-foreground mb-6 hidden md:block">Filter</h2>
      {filterSections.map((section) => (
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
                    checked={filters[section.filterKey].includes(opt.label)}
                    onChange={(e) => handleCheck(section.filterKey, opt.label, e.target.checked)}
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
