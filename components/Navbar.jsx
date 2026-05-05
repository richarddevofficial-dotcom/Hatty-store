"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hoveredLink, setHoveredLink] = useState(null);
  const { getCartCount, setIsCartOpen } = useCart();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active link based on scroll position
      const sections = ["home", "shop", "categories", "about", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home", icon: "🏠" },
    { href: "#shop", label: "Shop", icon: "🛍️" },
    { href: "#categories", label: "Categories", icon: "📂" },
    { href: "#about", label: "About", icon: "ℹ️" },
    { href: "#contact", label: "Contact", icon: "📞" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt="Hatty Store"
              width={45}
              height={45}
              className="w-10 h-10 lg:w-12 lg:h-12 transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span
                className={`text-lg lg:text-xl font-serif font-bold tracking-wider leading-tight transition-all duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                HATTY
              </span>
              <span
                className={`text-[10px] lg:text-xs tracking-[0.3em] font-semibold transition-all duration-300 ${
                  isScrolled ? "text-orange-500" : "text-orange-400"
                }`}
              >
                STORE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label.toLowerCase())}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                  isScrolled
                    ? activeLink === link.label.toLowerCase()
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                    : activeLink === link.label.toLowerCase()
                      ? "text-orange-400"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {/* Link Text */}
                <span className="relative z-10">{link.label}</span>

                {/* Active/Hover Background */}
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    activeLink === link.label.toLowerCase()
                      ? isScrolled
                        ? "bg-orange-50 scale-100"
                        : "bg-white/10 scale-100"
                      : hoveredLink === link.label
                        ? isScrolled
                          ? "bg-gray-100 scale-100"
                          : "bg-white/10 scale-100"
                        : "scale-0"
                  }`}
                />

                {/* Active Indicator Dot */}
                {activeLink === link.label.toLowerCase() && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                )}

                {/* Hover Underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`relative p-2.5 rounded-full transition-all duration-300 group ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white/90 hover:bg-white/10"
              }`}
              aria-label="Search"
            >
              <Search size={20} />
              <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-current opacity-50 transition-all duration-300" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-full transition-all duration-300 group ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white/90 hover:bg-white/10"
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-current opacity-50 transition-all duration-300" />

              {/* Cart Badge */}
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse shadow-lg">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Sign In Button (Optional) */}
            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isScrolled
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <User size={18} />
                  <span className="hidden sm:inline">
                    {user?.fullName?.split(" ")[0]}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "bg-gray-900 text-white hover:bg-orange-500 hover:shadow-lg"
                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 border border-white/20 hover:border-transparent"
                }`}
              >
                Sign In
              </button>
            )}

            {/* Add the modals at the bottom of the component, before the closing tag */}
            <SignInModal
              isOpen={showSignIn}
              onClose={() => setShowSignIn(false)}
              onSwitchToSignUp={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }}
            />

            <SignUpModal
              isOpen={showSignUp}
              onClose={() => setShowSignUp(false)}
              onSwitchToSignIn={() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white/90 hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div
          className={`hidden lg:block absolute top-full left-0 right-0 transition-all duration-300 overflow-hidden ${
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white shadow-lg border-t border-gray-100">
            <div className="max-w-3xl mx-auto p-4">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search for products, categories, brands..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } ${isScrolled ? "bg-white shadow-xl" : "bg-black/95 backdrop-blur-md"}`}
      >
        <div className="px-4 py-6 space-y-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.label.toLowerCase());
                setIsMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } ${
                isScrolled
                  ? activeLink === link.label.toLowerCase()
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                  : activeLink === link.label.toLowerCase()
                    ? "bg-white/10 text-orange-400"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              style={{
                transitionDelay: `${index * 75}ms`,
              }}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>

              {/* Arrow indicator for active */}
              {activeLink === link.label.toLowerCase() && (
                <ChevronDown className="ml-auto w-4 h-4" />
              )}
            </Link>
          ))}

          {/* Mobile Actions */}
          <div className="grid grid-cols-2 gap-3 pt-6 mt-4 border-t border-gray-700/20">
            <button
              onClick={() => {
                setIsCartOpen(true);
                setIsMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              <ShoppingCart size={18} />
              Cart ({getCartCount()})
            </button>
            <Link
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Search size={18} />
              Search
            </Link>
          </div>

          {/* Mobile Sign In */}
          <Link
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center justify-center gap-2 mt-3 py-3 rounded-xl font-medium transition-all duration-300 border ${
              isScrolled
                ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
        style={{
          width: `${
            activeLink === "home"
              ? "20%"
              : activeLink === "shop"
                ? "40%"
                : activeLink === "categories"
                  ? "60%"
                  : activeLink === "about"
                    ? "80%"
                    : activeLink === "contact"
                      ? "100%"
                      : "0%"
          }`,
        }}
      />
    </nav>
  );
}
