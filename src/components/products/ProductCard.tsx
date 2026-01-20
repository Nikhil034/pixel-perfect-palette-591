import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || "M");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-foreground/20 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Quick action buttons */}
        <div className={cn(
          "absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        )}>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-soft"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-accent text-accent")} />
          </Button>
          <Link to={`/product/${product.id}`}>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-soft"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              Bestseller
            </span>
          )}
        </div>

        {/* Add to cart button - appears on hover */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button 
            variant="rose" 
            className="w-full gap-2 rounded-xl"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-foreground mt-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Size selector */}
        {product.sizes && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs text-muted-foreground">Size:</span>
            <div className="flex gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "h-7 w-7 rounded-md text-xs font-medium transition-all duration-200",
                    selectedSize === size
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-semibold text-foreground font-display">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
