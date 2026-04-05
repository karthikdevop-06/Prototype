import { Truck, Gift, Shield } from "lucide-react";

const announcements = [
  { icon: Truck, text: "Free Shipping on Orders Over $75" },
  { icon: Gift, text: "Gift Wrapping Available" },
  { icon: Shield, text: "Handcrafted with a Lifetime Guarantee" },
];

const AnnouncementBar = () => (
  <div className="bg-banner text-banner-foreground py-2 text-sm font-body">
    <div className="container flex items-center justify-center gap-8">
      {announcements.map((a, i) => (
        <div key={i} className="hidden md:flex items-center gap-2 first:flex">
          <a.icon className="w-4 h-4" />
          <span className="text-xs tracking-wide">{a.text}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AnnouncementBar;
