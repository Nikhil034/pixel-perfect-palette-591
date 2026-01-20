import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

import flowerRose from "@/assets/flower-rose.jpg";
import flowerSunflower from "@/assets/flower-sunflower.jpg";
import keychainHeart from "@/assets/keychain-heart.jpg";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Pink Rose Bloom",
    price: 24.99,
    image: flowerRose,
    size: "M",
    quantity: 2,
  },
  {
    id: "2",
    name: "Golden Sunflower",
    price: 29.99,
    image: flowerSunflower,
    size: "L",
    quantity: 1,
  },
  {
    id: "k2",
    name: "Heart Charm Keychain",
    price: 10.99,
    image: keychainHeart,
    size: "S",
    quantity: 3,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "kozy10") {
      setDiscount(10);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <section className="kozy-section">
          <div className="kozy-container">
            <h1 className="kozy-heading-xl text-foreground mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="kozy-heading-md text-foreground mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
                <Link to="/flowers">
                  <Button variant="rose" size="lg" className="gap-2">
                    Start Shopping
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-card rounded-2xl p-4 shadow-soft animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-lg"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-lg"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <span className="font-display text-lg font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      Order Summary
                    </h2>

                    {/* Promo Code */}
                    <div className="flex gap-2 mb-6">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>

                    {/* Summary lines */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-kozy-sage">
                          <span>Discount ({discount}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-kozy-sage">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      {shipping > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Free shipping on orders over $50
                        </p>
                      )}
                    </div>

                    <div className="kozy-divider my-6" />

                    {/* Total */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-display text-lg font-semibold">Total</span>
                      <span className="font-display text-2xl font-bold text-foreground">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    {/* Checkout button */}
                    <Link to="/checkout">
                      <Button variant="hero" size="xl" className="w-full gap-2">
                        Proceed to Checkout
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>

                    {/* Continue shopping */}
                    <Link to="/flowers" className="block mt-4">
                      <Button variant="ghost" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
