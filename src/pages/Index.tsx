import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CollectionHero from "@/components/CollectionHero";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <AnnouncementBar />
    <Header />
    <CollectionHero />
    <main className="container py-8 flex-1">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-60 lg:w-64 shrink-0">
          <FilterSidebar />
        </div>
        <div className="flex-1">
          <ProductGrid />
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Index;
