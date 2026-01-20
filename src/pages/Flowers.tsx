import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, LayoutGrid, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Import flower images
import flowerRose from "@/assets/flower-rose.jpg";
import flowerSunflower from "@/assets/flower-sunflower.jpg";
import flowerLavender from "@/assets/flower-lavender.jpg";
import flowerTulip from "@/assets/flower-tulip.jpg";
import flowerDaisy from "@/assets/flower-daisy.jpg";

const allFlowers = [
  {
    id: "1",
    name: "Pink Rose Bloom",
    description: "A classic handcrafted crochet rose in beautiful pink",
    price: 24.99,
    image: flowerRose,
    category: "Roses",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: "2",
    name: "Golden Sunflower",
    description: "Bright and cheerful sunflower to brighten any space",
    price: 29.99,
    image: flowerSunflower,
    category: "Sunflowers",
    sizes: ["S", "M", "L"],
    isBestseller: true,
  },
  {
    id: "3",
    name: "Lavender Bouquet",
    description: "Elegant lavender stems bundled with love",
    price: 34.99,
    image: flowerLavender,
    category: "Lavender",
    sizes: ["S", "M", "L"],
  },
  {
    id: "4",
    name: "Spring Tulip",
    description: "Delicate tulip in soft pink and white hues",
    price: 22.99,
    image: flowerTulip,
    category: "Tulips",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: "5",
    name: "White Daisy",
    description: "Classic daisy with pure white petals and sunny center",
    price: 19.99,
    image: flowerDaisy,
    category: "Daisies",
    sizes: ["S", "M", "L"],
  },
  {
    id: "6",
    name: "Red Rose Passion",
    description: "Deep red rose symbolizing love and passion",
    price: 26.99,
    image: flowerRose,
    category: "Roses",
    sizes: ["S", "M", "L"],
    isBestseller: true,
  },
  {
    id: "7",
    name: "Mini Sunflower Set",
    description: "Set of 3 mini sunflowers perfect for small spaces",
    price: 44.99,
    image: flowerSunflower,
    category: "Sunflowers",
    sizes: ["S", "M", "L"],
  },
  {
    id: "8",
    name: "Lavender Dreams",
    description: "Large lavender arrangement for that French countryside feel",
    price: 49.99,
    image: flowerLavender,
    category: "Lavender",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
];

const categories = ["All", "Roses", "Sunflowers", "Lavender", "Tulips", "Daisies"];

const FlowersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [gridView, setGridView] = useState<"grid" | "compact">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFlowers = allFlowers.filter((flower) => {
    const matchesCategory = selectedCategory === "All" || flower.category === selectedCategory;
    const matchesSearch = flower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flower.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="kozy-container">
            <div className="max-w-2xl">
              <span className="kozy-label text-accent mb-2 block">Our Collection</span>
              <h1 className="kozy-heading-xl text-foreground mb-4">
                Crochet Flowers
              </h1>
              <p className="kozy-body text-muted-foreground">
                Each flower is handcrafted with love, using premium yarn and traditional techniques. 
                Choose your perfect bloom and make it uniquely yours.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="kozy-section bg-background">
          <div className="kozy-container">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search flowers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* View toggles */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGridView("grid")}
                  className={cn(gridView === "grid" && "bg-card")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGridView("compact")}
                  className={cn(gridView === "compact" && "bg-card")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredFlowers.length} products
            </p>

            {/* Products Grid */}
            <div className={cn(
              "grid gap-6",
              gridView === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            )}>
              {filteredFlowers.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredFlowers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No flowers found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FlowersPage;
