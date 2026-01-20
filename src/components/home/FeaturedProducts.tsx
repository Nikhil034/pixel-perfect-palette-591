import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

// Import flower images
import flowerRose from "@/assets/flower-rose.jpg";
import flowerSunflower from "@/assets/flower-sunflower.jpg";
import flowerLavender from "@/assets/flower-lavender.jpg";
import flowerTulip from "@/assets/flower-tulip.jpg";
import flowerDaisy from "@/assets/flower-daisy.jpg";

const featuredFlowers = [
  {
    id: "1",
    name: "Pink Rose Bloom",
    description: "A classic handcrafted crochet rose in beautiful pink",
    price: 24.99,
    image: flowerRose,
    category: "Flowers",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: "2",
    name: "Golden Sunflower",
    description: "Bright and cheerful sunflower to brighten any space",
    price: 29.99,
    image: flowerSunflower,
    category: "Flowers",
    sizes: ["S", "M", "L"],
    isBestseller: true,
  },
  {
    id: "3",
    name: "Lavender Bouquet",
    description: "Elegant lavender stems bundled with love",
    price: 34.99,
    image: flowerLavender,
    category: "Flowers",
    sizes: ["S", "M", "L"],
  },
  {
    id: "4",
    name: "Spring Tulip",
    description: "Delicate tulip in soft pink and white hues",
    price: 22.99,
    image: flowerTulip,
    category: "Flowers",
    sizes: ["S", "M", "L"],
    isNew: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="kozy-section bg-background">
      <div className="kozy-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="kozy-label text-accent mb-2 block">Our Collection</span>
            <h2 className="kozy-heading-lg text-foreground">
              Featured Flowers
            </h2>
            <p className="kozy-body text-muted-foreground mt-2 max-w-lg">
              Each flower is meticulously crafted by hand, ensuring every petal is perfect.
            </p>
          </div>
          <Link to="/flowers">
            <Button variant="outline" className="group">
              View All Flowers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFlowers.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
