"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const slides = [
    {
      id: 1,
      image: "/img-hero/hero-fashion-1.jpg", // Changed from /images/ to /img-hero/
      headline: "Elevate Your Style",
      subtext:
        "Discover the latest trends in fashion with our curated collection",
      buttonText: "Shop Now",
      overlayColor: "from-black/70 to-black/40",
    },
    {
      id: 2,
      image: "/img-hero/hero-fashion-2.jpg", // Changed
      headline: "New Season Arrivals",
      subtext: "Fresh styles just dropped. Be the first to wear them",
      buttonText: "Explore New",
      overlayColor: "from-black/60 to-orange-900/30",
    },
    {
      id: 3,
      image: "/img-hero/hero-fashion-3.jpg", // Changed
      headline: "Modern Elegance",
      subtext: "Timeless pieces that define your unique style statement",
      buttonText: "View Collection",
      overlayColor: "from-black/70 to-purple-900/30",
    },
    {
      id: 4,
      image: "/img-hero/hero-fashion-4.jpg", // Changed
      headline: "Street Style Ready",
      subtext: "Urban fashion that makes you stand out from the crowd",
      buttonText: "Shop Streetwear",
      overlayColor: "from-black/50 to-black/30",
    },
    {
      id: 5,
      image: "/img-hero/hero-fashion-5.jpg", // Changed
      headline: "Accessorize Perfectly",
      subtext: "Complete your look with our premium accessories collection",
      buttonText: "Shop Accessories",
      overlayColor: "from-black/80 to-amber-900/40",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-rotate slides every 30 seconds
  useEffect(() => {
    const slideDuration = 30000; // 30 seconds
    const progressInterval = 100; // Update progress every 100ms

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (slideDuration / progressInterval);
      });
    }, progressInterval);

    const slideTimer = setInterval(() => {
      setIsTransitioning(true);
      setProgress(0);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, slideDuration);

    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [slides.length]);

  // Manual navigation
  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const goToPrev = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden"
    >
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${s.overlayColor} z-10`}
            />
            <Image
              src={s.image}
              alt={s.headline}
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div key={currentSlide} className="max-w-2xl animate-fade-in">
            {/* Slide Number Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-orange-500 font-semibold text-sm">
                0{currentSlide + 1}
              </span>
              <span className="w-8 h-0.5 bg-orange-500/50" />
              <span className="text-white/50 text-sm">05</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {slide.headline}
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
              {slide.subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#shop"
                className="group inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
              >
                {slide.buttonText}
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              >
                Explore Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-orange-500">
                  2k+
                </div>
                <div className="text-sm text-gray-300 mt-1">Products</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-orange-500">
                  500+
                </div>
                <div className="text-sm text-gray-300 mt-1">Brands</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-orange-500">
                  50k+
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all duration-300 group z-20"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all duration-300 group z-20"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-2 bg-orange-500 rounded-full"
                : "w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
