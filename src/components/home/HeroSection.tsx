import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-flowers.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-texture-linen opacity-30" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-kozy-rose/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-kozy-sage/10 via-transparent to-transparent" />
      
      <div className="kozy-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-24">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-soft animate-fade-up">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Handcrafted with Love</span>
            </div>

            {/* Main Heading */}
            <h1 className="kozy-heading-xl text-foreground animate-fade-up stagger-1">
              Warmth in Every{" "}
              <span className="text-primary relative">
                Stitch
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/40" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 100 2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="kozy-body text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-up stagger-2">
              Discover our collection of beautifully handcrafted crochet flowers, keychains, and personalized gifts. 
              Each piece tells a story of care, creativity, and timeless elegance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up stagger-3">
              <Link to="/flowers">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Shop Flowers
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/custom">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Customize Yours
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4 animate-fade-up stagger-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-kozy-sage" />
                Handmade with Care
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-kozy-rose" />
                Premium Materials
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-kozy-tan" />
                Fast Delivery
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative animate-fade-up">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-accent/20 -rotate-3" />
              <div className="absolute -inset-4 rounded-3xl border-2 border-primary/20 rotate-2" />
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroImage}
                  alt="Beautiful handcrafted crochet flower bouquet"
                  className="w-full h-auto object-cover aspect-[4/3] lg:aspect-square"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-card border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">500+</p>
                    <p className="text-xs text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </div>

              {/* Another floating element */}
              <div className="absolute -top-4 -right-4 bg-card rounded-xl p-3 shadow-card border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {["⭐", "⭐", "⭐", "⭐", "⭐"].map((star, i) => (
                      <span key={i} className="text-sm">{star}</span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-foreground">5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
