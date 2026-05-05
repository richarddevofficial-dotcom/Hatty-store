export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-serif font-bold mb-4">
                    Hatty store
                  </div>
                  <p className="text-xl">Since 2020</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500 rounded-2xl opacity-20" />
          </div>

          {/* Content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-orange-500 mb-8" />

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hatty store was born from a simple belief: that fashion should
                be accessible, sustainable, and expressive. We curate
                collections that celebrate individuality while maintaining
                timeless elegance.
              </p>
              <p>
                Every piece in our collection is carefully selected for its
                quality, design, and versatility. We work directly with artisans
                and manufacturers to ensure fair practices and exceptional
                craftsmanship.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Quality</h4>
                <p className="text-xs text-gray-500 mt-1">Premium materials</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Affordable</h4>
                <p className="text-xs text-gray-500 mt-1">Fair prices</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Style</h4>
                <p className="text-xs text-gray-500 mt-1">Modern designs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
