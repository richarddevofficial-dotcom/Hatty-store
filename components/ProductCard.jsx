"use client";

import Image from "next/image";
import { ShoppingCart, Star, Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import SignInModal from "./SignInModal";

export default function ProductCard({ product }) {
  const { addToCart, cartItems, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdded, setIsAdded] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Check if product is in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);

    // Open cart sidebar when adding item
    setIsCartOpen(true);

    // Reset the animation after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // THIS IS THE PROTECTED ORDER FUNCTION (Step 8)
  const handleWhatsAppOrder = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      // User is NOT logged in - show sign in modal
      setShowSignIn(true);
      return; // Stop here, don't proceed with order
    }

    // User IS logged in - proceed with WhatsApp order
    const phoneNumber = "211928661250"; // Your WhatsApp number
    const message = `Hello Hatty Store! I'm interested in ordering:\n\n*${product.name}*\n\nProduct Details:\n- Name: ${product.name}\n- Price: ${product.price}\n- Category: ${product.category}\n- Description: ${product.description}\n\nCould you provide more information about sizing and availability?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white flex items-center gap-2"
            >
              {isAdded ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : isInCart ? (
                <>
                  <Plus size={18} />
                  Add More
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-500">4.8</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              {product.price}
            </span>

            <div className="flex gap-2">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                  isInCart
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                <ShoppingCart size={16} />
                {isInCart ? "Add More" : "Cart"}
              </button>

              {/* WhatsApp Order Button (Protected) */}
              <button
                onClick={handleWhatsAppOrder}
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal - Shows when user tries to order without being logged in */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          // You'll need to add a SignUp state too
          // setShowSignUp(true);
        }}
      />
    </>
  );
}
