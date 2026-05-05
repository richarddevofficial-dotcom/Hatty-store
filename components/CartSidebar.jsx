"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

export default function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getTotalPrice,
    clearCart,
    generateWhatsAppMessage,
    saveOrderToDatabase,
    isSaving,
  } = useCart();

  const { isAuthenticated, user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // 'success', 'error', 'saving'
  const [orderMessage, setOrderMessage] = useState("");

  // THIS IS THE PROTECTED ORDER FUNCTION
  const handleWhatsAppOrder = async () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      setShowSignIn(true);
      return;
    }

    // Start saving order
    setOrderStatus("saving");
    setOrderMessage("Saving your order...");

    try {
      // Save order to database first
      const orderData = await saveOrderToDatabase();

      // Order saved successfully
      setOrderStatus("success");
      setOrderMessage(
        `Order #${orderData.order.orderNumber} saved! Opening WhatsApp...`,
      );

      // Generate WhatsApp message
      const url = generateWhatsAppMessage();

      // Small delay so user sees success message
      setTimeout(() => {
        window.open(url, "_blank");
        clearCart();
        setIsCartOpen(false);
        setOrderStatus(null);
      }, 1500);
    } catch (error) {
      setOrderStatus("error");
      setOrderMessage(
        error.message || "Failed to save order. Please try again.",
      );

      // Clear error after 5 seconds
      setTimeout(() => {
        setOrderStatus(null);
      }, 5000);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold">Your Cart</h2>
            <span className="bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ maxHeight: "calc(100vh - 250px)" }}
        >
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-orange-500 font-medium">
                      {item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors self-start group"
                  >
                    <Trash2
                      size={16}
                      className="text-gray-400 group-hover:text-red-500 transition-colors"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-white">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal ({getCartCount()} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Status Messages */}
            {orderStatus === "saving" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                <p className="text-sm text-blue-800">{orderMessage}</p>
              </div>
            )}

            {orderStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-800">{orderMessage}</p>
              </div>
            )}

            {orderStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-800">{orderMessage}</p>
              </div>
            )}

            {/* Sign in prompt */}
            {!isAuthenticated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  ⚠️ Please sign in to place your order
                </p>
              </div>
            )}

            {/* Logged in user info */}
            {isAuthenticated && user && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Ordering as</p>
                <p className="text-sm font-semibold text-gray-900">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppOrder}
                disabled={orderStatus === "saving"}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderStatus === "saving" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving Order...
                  </>
                ) : (
                  <>
                    <Phone size={18} />
                    {isAuthenticated
                      ? "Order via WhatsApp"
                      : "Sign In to Order"}
                  </>
                )}
              </button>

              <button
                onClick={clearCart}
                disabled={orderStatus === "saving"}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </>
  );
}
