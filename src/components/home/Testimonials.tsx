import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Happy Customer",
    content: "The roses I ordered for my mom's birthday were absolutely stunning! You can really tell they're made with so much love and care. She cried happy tears!",
    rating: 5,
    avatar: "S",
  },
  {
    id: 2,
    name: "Priya K.",
    role: "Repeat Customer",
    content: "I've ordered from Kozy three times now and each piece is more beautiful than the last. The quality is unmatched and the customization options are amazing.",
    rating: 5,
    avatar: "P",
  },
  {
    id: 3,
    name: "Emma L.",
    role: "Gift Recipient",
    content: "My friend gifted me a custom keychain with my dog's name on it. It's the cutest thing ever! I carry it everywhere and always get compliments.",
    rating: 5,
    avatar: "E",
  },
];

export function Testimonials() {
  return (
    <section className="kozy-section bg-card">
      <div className="kozy-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="kozy-label text-accent mb-2 block">Testimonials</span>
          <h2 className="kozy-heading-lg text-foreground">What Our Customers Say</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="relative bg-background rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-accent/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-display text-lg font-semibold text-accent">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
