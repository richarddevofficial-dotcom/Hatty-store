"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Shop", href: "#shop" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const categories = [
    { name: "Men", href: "#shop" },
    { name: "Women", href: "#shop" },
    { name: "Shoes", href: "#shop" },
    { name: "Accessories", href: "#shop" },
  ];

  const policies = [
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400">
                Get 10% off your first order and stay updated on new arrivals
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-500 flex-1 min-w-[250px]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Hatty Store"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <span className="text-xl font-serif font-bold tracking-wider text-white">
                  HATTY
                </span>
                <span className="block text-xs tracking-[0.3em] font-semibold text-orange-500">
                  STORE
                </span>
              </div>
            </Link>
            <p className="mt-4 text-gray-400 max-w-sm">
              Elevating everyday style with premium fashion pieces. Quality,
              affordability, and timeless design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Policies</h4>
            <ul className="space-y-2">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <Link
                    href={policy.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Hatty store. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs">
                  Visa
                </div>
                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs">
                  MasterCard
                </div>
                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs">
                  Mobile Money - MTN
                </div>
                <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs">
                  PayPal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
