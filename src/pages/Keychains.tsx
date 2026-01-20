import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import keychainFlower from "@/assets/keychain-flower.jpg";
import keychainHeart from "@/assets/keychain-heart.jpg";

const allKeychains = [
  {
    id: "k1",
    name: "Rose Keychain",
    description: "Cute pink rose flower charm, perfect for your keys or bag",
    price: 12.99,
    image: keychainFlower,
    category: "Flower Keychains",
    sizes: ["S", "M"],
    isNew: true,
  },
  {
    id: "k2",
    name: "Heart Charm",
    description: "Sweet pink heart keychain, a symbol of love",
    price: 10.99,
    image: keychainHeart,
    category: "Heart Keychains",
    sizes: ["S", "M"],
    isBestseller: true,
  },
  {
    id: "k3",
    name: "Daisy Chain",
    description: "Cheerful daisy keychain to brighten your day",
    price: 11.99,
    image: keychainFlower,
    category: "Flower Keychains",
    sizes: ["S", "M"],
  },
  {
    id: "k4",
    name: "Custom Name Heart",
    description: "Personalized heart with your name embroidered",
    price: 15.99,
    image: keychainHeart,
    category: "Custom Keychains",
    sizes: ["S", "M"],
    isNew: true,
  },
  {
    id: "k5",
    name: "Mini Bouquet",
    description: "Tiny bouquet keychain with multiple flowers",
    price: 14.99,
    image: keychainFlower,
    category: "Flower Keychains",
    sizes: ["S", "M"],
  },
  {
    id: "k6",
    name: "Love Heart Set",
    description: "Set of 2 matching heart keychains for couples",
    price: 19.99,
    image: keychainHeart,
    category: "Heart Keychains",
    sizes: ["S", "M"],
    isBestseller: true,
  },
];

const categories = ["All", "Flower Keychains", "Heart Keychains", "Custom Keychains"];

const KeychainsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKeychains = allKeychains.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
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
              <span className="kozy-label text-accent mb-2 block">Accessories</span>
              <h1 className="kozy-heading-xl text-foreground mb-4">
                Keychains
              </h1>
              <p className="kozy-body text-muted-foreground">
                Adorable handmade keychains that add a touch of warmth to your everyday carry.
                Customize with your name or choose from our collection.
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="kozy-section bg-background">
          <div className="kozy-container">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search keychains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

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
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredKeychains.length} products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKeychains.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KeychainsPage;
