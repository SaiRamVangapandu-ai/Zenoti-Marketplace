"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import FilterBar from "@/components/FilterBar";
import SectionHeader from "@/components/SectionHeader";
import services from "@/data/services.json";
import businesses from "@/data/businesses.json";

const categoryList = ["All", "Barbershop", "Salon", "Medspa", "Waxing", "Nail Studio", "Wellness"];
const browseCategories = [
  { name: "Salon", icon: "✂️" },
  { name: "Barbershop", icon: "💈" },
  { name: "Medspa", icon: "✨" },
  { name: "Waxing", icon: "🌸" },
  { name: "Nail Studio", icon: "💅" },
  { name: "Wellness", icon: "🧘" },
];

function getBiz(businessId: string) {
  return businesses.find((b) => b.id === businessId);
}

function locationLabel(businessId: string) {
  const b = getBiz(businessId);
  return b ? `${b.neighborhood}, ${b.city}, ${b.state}` : "";
}

function cityLabel(businessId: string) {
  const b = getBiz(businessId);
  return b ? `${b.city}, ${b.state}` : "";
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const cities = useMemo(() => {
    const set = new Set(businesses.map((b) => `${b.city}, ${b.state}`));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const recommended = [...services].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const popular = [...services].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  const filtered = services.filter((s) => {
    if (category !== "All" && s.category !== category) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !(getBiz(s.businessId)?.name.toLowerCase().includes(search.toLowerCase()))) return false;
    if (city !== "All" && cityLabel(s.businessId) !== city) return false;
    if (ratingFilter !== "all" && s.rating < parseFloat(ratingFilter)) return false;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (max ? (s.price < min || s.price > max) : s.price < min) return false;
    }
    return true;
  });

  return (
    <>
      {/* ── Hero ── full-bleed, extends behind fixed header ── */}
      <section className="-mt-16 md:-mt-20 relative flex min-h-[60vh] items-end overflow-hidden bg-gray-900 sm:min-h-[65vh]">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&h=1080&fit=crop"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.15]">
            Book premium beauty and wellness services near you
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            Discover top-rated salons, medspas, and wellness brands powered by Zenoti.
          </p>

          {/* Search bar */}
          <div className="relative mt-8 max-w-xl">
            <svg className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search services, locations..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value.length === 1) {
                  document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative w-full rounded-full border-0 bg-white py-4 pl-14 pr-5 text-sm text-gray-800 placeholder-gray-400 shadow-xl outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#listings"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-100"
            >
              Explore Services
            </Link>
            <Link
              href="#recommended"
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              View Top Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Page content ── constrained container ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Recommended for You */}
        <section className="mt-14" id="recommended">
          <SectionHeader title="Recommended for You" subtitle="Top-rated services hand-picked for quality" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((s) => {
              const biz = getBiz(s.businessId);
              return (
                <ServiceCard
                  key={s.id} id={s.id} name={s.name}
                  businessName={biz?.name ?? ""}
                  price={s.price} rating={s.rating} reviews={s.reviews}
                  duration={s.duration} image={s.image} category={s.category}
                  location={locationLabel(s.businessId)}
                />
              );
            })}
          </div>
        </section>

        {/* Popular Near You */}
        <section className="mt-14">
          <SectionHeader title="Popular Near You" subtitle="Most booked services this week" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((s) => {
              const biz = getBiz(s.businessId);
              return (
                <ServiceCard
                  key={s.id} id={s.id} name={s.name}
                  businessName={biz?.name ?? ""}
                  price={s.price} rating={s.rating} reviews={s.reviews}
                  duration={s.duration} image={s.image} category={s.category}
                  location={locationLabel(s.businessId)}
                />
              );
            })}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mt-14">
          <SectionHeader title="Browse by Category" />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {browseCategories.map((c) => (
              <button
                key={c.name}
                onClick={() => { setCategory(c.name); document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-xs font-medium text-gray-700">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* All Listings */}
        <section className="mt-14" id="listings">
          <SectionHeader title="All Services" subtitle="Browse the full marketplace" />
          <FilterBar
            categories={categoryList}
            selectedCategory={category}
            onCategoryChange={setCategory}
            cities={cities}
            selectedCity={city}
            onCityChange={setCity}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            ratingFilter={ratingFilter}
            onRatingChange={setRatingFilter}
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => {
              const biz = getBiz(s.businessId);
              return (
                <ServiceCard
                  key={s.id} id={s.id} name={s.name}
                  businessName={biz?.name ?? ""}
                  price={s.price} rating={s.rating} reviews={s.reviews}
                  duration={s.duration} image={s.image} category={s.category}
                  location={locationLabel(s.businessId)}
                />
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="mt-16 text-center text-gray-400">No services match your filters.</p>
          )}
        </section>
      </div>
    </>
  );
}
