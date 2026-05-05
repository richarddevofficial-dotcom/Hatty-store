import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ name, image, slug }) {
  return (
    <Link href={`#shop?category=${slug}`} className="group relative block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-serif font-bold text-white mb-2 transform group-hover:translate-y-0 group-hover:scale-105 transition-transform duration-300">
            {name}
          </h3>
          <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Shop Collection →
          </p>
        </div>

        {/* Border Animation */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-2xl transition-all duration-300" />
      </div>
    </Link>
  );
}
