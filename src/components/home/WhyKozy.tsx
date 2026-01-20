import { Heart, Paintbrush, Truck, Shield } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every single piece is handmade with attention to detail and genuine care.",
  },
  {
    icon: Paintbrush,
    title: "Fully Customizable",
    description: "Choose colors, sizes, and add personal touches to make it uniquely yours.",
  },
  {
    icon: Truck,
    title: "Fast & Safe Delivery",
    description: "Carefully packaged and shipped quickly to ensure your gift arrives perfect.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "We use premium materials that are durable and beautiful for years to come.",
  },
];

export function WhyKozy() {
  return (
    <section className="kozy-section bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-kozy-rose/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kozy-sage/5 rounded-full blur-3xl" />
      
      <div className="kozy-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="kozy-label text-accent mb-2 block">Why Choose Us</span>
          <h2 className="kozy-heading-lg text-foreground">The Kozy Difference</h2>
          <p className="kozy-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            We believe in creating pieces that bring warmth and joy to your life. 
            Here's what makes Kozy special.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center p-8 rounded-2xl bg-card hover:bg-gradient-card transition-all duration-500 shadow-soft hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:scale-110">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
