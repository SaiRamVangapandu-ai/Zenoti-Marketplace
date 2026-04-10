"use client";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  priceRange: string;
  onPriceChange: (range: string) => void;
  ratingFilter: string;
  onRatingChange: (rating: string) => void;
  resultCount: number;
}

export default function FilterBar({
  categories, selectedCategory, onCategoryChange,
  cities, selectedCity, onCityChange,
  priceRange, onPriceChange,
  ratingFilter, onRatingChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-violet-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Dropdowns row + result count */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>
          ))}
        </select>
        <select
          value={priceRange}
          onChange={(e) => onPriceChange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
        >
          <option value="all">Any Price</option>
          <option value="0-50">Under $50</option>
          <option value="50-100">$50 – $100</option>
          <option value="100-200">$100 – $200</option>
          <option value="200-500">$200+</option>
        </select>
        <select
          value={ratingFilter}
          onChange={(e) => onRatingChange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
        >
          <option value="all">Any Rating</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="4.7">4.7+ Stars</option>
          <option value="4.9">4.9+ Stars</option>
        </select>
        <span className="ml-auto text-sm text-gray-400">
          {resultCount} {resultCount === 1 ? "service" : "services"} found
        </span>
      </div>
    </div>
  );
}
