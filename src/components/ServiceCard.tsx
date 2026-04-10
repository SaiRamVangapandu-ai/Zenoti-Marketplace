import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  id: string;
  name: string;
  businessName: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  image: string;
  category: string;
  location: string;
  badge?: string;
}

export default function ServiceCard({
  id, name, businessName, price, rating, reviews, duration, image, category, location, badge,
}: ServiceCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/service/${id}`} className="relative block aspect-[3/2] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
          {category}
        </span>
        {badge && (
          <span className="absolute top-3 right-3 rounded-full bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {badge}
          </span>
        )}
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
          {name}
        </h3>
        <p className="mt-0.5 text-sm text-gray-500">{businessName}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {location} · {duration}
        </p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className="text-amber-500">★</span>
          <span className="font-medium text-gray-800">{rating}</span>
          <span className="text-gray-400">({reviews})</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <Link
            href={`/service/${id}`}
            className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
