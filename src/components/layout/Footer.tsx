import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";
import kozyLogo from "@/assets/kozy-logo.png";

const footerLinks = {
  shop: [
    { name: "Flowers", path: "/flowers" },
    { name: "Keychains", path: "/keychains" },
    { name: "Custom Orders", path: "/custom" },
    { name: "Gift Sets", path: "/gifts" },
  ],
  support: [
    { name: "Contact Us", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Shipping Info", path: "/shipping" },
    { name: "Returns", path: "/returns" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Behind the Scenes", path: "/tutorials" },
    { name: "Our Story", path: "/story" },
    { name: "Sustainability", path: "/sustainability" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="kozy-container kozy-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={kozyLogo} 
                alt="Kozy Logo" 
                className="h-24 w-auto"
              />
            </Link>
            <p className="kozy-body text-muted-foreground mb-6 max-w-sm">
              Every piece is crafted with love and care, bringing warmth and beauty to your special moments.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/20 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/20 transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hello@kozy.com" 
                className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/20 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                <span>Handmade with love, Shipped worldwide</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span>hello@kozy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © 2026 Kozy. Made with <Heart className="h-4 w-4 text-accent fill-accent" /> in every stitch.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
