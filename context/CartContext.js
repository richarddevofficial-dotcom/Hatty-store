"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user, isAuthenticated, token } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("hattyCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("hattyCart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("hattyCart");
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Get total number of items in cart
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("hattyCart");
  };

  // Save order to database
  const saveOrderToDatabase = async () => {
    if (!isAuthenticated || !token) {
      throw new Error("You must be logged in to place an order");
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            description: item.description,
            category: item.category,
          })),
          totalAmount: getTotalPrice(),
          cartCount: getCartCount(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save order");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to save order:", error);
      throw error;
    }
  };

  // Generate WhatsApp message for all cart items
  const generateWhatsAppMessage = () => {
    const phoneNumber = "211928661250"; // Your WhatsApp number
    let message = "Hello Hatty Store! I would like to order:\n\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* - ${item.price}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Description: ${item.description}\n\n`;
    });

    message += `\n*Total Items:* ${getCartCount()}\n`;
    message += `*Total Price:* $${getTotalPrice().toFixed(2)}\n\n`;
    message += "Please confirm my order and provide payment details.";

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getTotalPrice,
    clearCart,
    generateWhatsAppMessage,
    saveOrderToDatabase,
    isSaving,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
