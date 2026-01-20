import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="kozy-section bg-gradient-sage relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-texture-linen opacity-10" />
      
      <div className="kozy-container relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background/20 mb-6">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>

          {/* Content */}
          <h2 className="kozy-heading-lg text-primary-foreground mb-4">
            Join the Kozy Family
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Subscribe to get exclusive offers, early access to new products, and heartwarming updates delivered straight to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background/90 border-0 placeholder:text-muted-foreground rounded-xl"
              required
            />
            <Button 
              type="submit" 
              variant="rose"
              size="lg"
              className="gap-2 rounded-xl"
            >
              Subscribe
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-primary-foreground/60 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
