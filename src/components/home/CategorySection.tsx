import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import flowerDaisy from "@/assets/flower-daisy.jpg";
import keychainFlower from "@/assets/keychain-flower.jpg";
import keychainHeart from "@/assets/keychain-heart.jpg";

const categories = [
  {
    id: "flowers",
    name: "Crochet Flowers",
    description: "Beautiful handmade flowers that last forever",
    image: flowerDaisy,
    path: "/flowers",
    count: "50+ designs",
  },
  {
    id: "keychains",
    name: "Keychains",
    description: "Cute & customizable accessories for everyday",
    image: keychainFlower,
    path: "/keychains",
    count: "30+ styles",
  },
  {
    id: "custom",
    name: "Custom Orders",
    description: "Design your own personalized creation",
    image: keychainHeart,
    path: "/custom",
    count: "Unlimited possibilities",
  },
];

export function CategorySection() {
  return (
    <section className="kozy-section bg-card">
      <div className="kozy-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="kozy-label text-accent mb-2 block">Explore</span>
          <h2 className="kozy-heading-lg text-foreground">Shop by Category</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.path}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-sm font-medium text-kozy-rose-light mb-2">
                  {category.count}
                </span>
                <h3 className="font-display text-2xl font-semibold text-background mb-2">
                  {category.name}
                </h3>
                <p className="text-background/80 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-background font-medium group-hover:gap-4 transition-all duration-300">
                  <span>Shop Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
