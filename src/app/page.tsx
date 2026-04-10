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
  {
    name: "Salon",
    icon: (
      <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    name: "Barbershop",
    icon: (
      <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.499-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
      </svg>
    ),
  },
  {
    name: "Medspa",
    icon: (
      <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: "Waxing",
    icon: (
      <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    name: "Nail Studio",
    icon: (
      <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    name: "Wellness",
    icon: (
      <svg className="h-6 w-6 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
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

      {/* ── Stats trust bar ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-4 sm:gap-12 sm:px-6">
          {[
            { value: "500+", label: "Businesses" },
            { value: "8", label: "Cities" },
            { value: "50K+", label: "Bookings" },
            { value: "4.8★", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-sm">
              <span className="font-bold text-gray-900">{stat.value}</span>
              <span className="text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Page content ── constrained container ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Recommended for You */}
        <section className="mt-14" id="recommended">
          <SectionHeader title="Recommended for You" subtitle="Top-rated services hand-picked for quality" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((s, i) => {
              const biz = getBiz(s.businessId);
              return (
                <ServiceCard
                  key={s.id} id={s.id} name={s.name}
                  businessName={biz?.name ?? ""}
                  price={s.price} rating={s.rating} reviews={s.reviews}
                  duration={s.duration} image={s.image} category={s.category}
                  location={locationLabel(s.businessId)}
                  badge={i === 0 ? "Top Rated" : undefined}
                />
              );
            })}
          </div>
        </section>

        {/* Popular Near You */}
        <section className="mt-14">
          <SectionHeader title="Popular Near You" subtitle="Most booked services this week" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((s, i) => {
              const biz = getBiz(s.businessId);
              return (
                <ServiceCard
                  key={s.id} id={s.id} name={s.name}
                  businessName={biz?.name ?? ""}
                  price={s.price} rating={s.rating} reviews={s.reviews}
                  duration={s.duration} image={s.image} category={s.category}
                  location={locationLabel(s.businessId)}
                  badge={i === 0 ? "Most Booked" : undefined}
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
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-violet-100 hover:bg-violet-50/40 hover:-translate-y-0.5"
              >
                {c.icon}
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
            resultCount={filtered.length}
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
            <div className="mt-16 flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <p className="font-medium text-gray-700">No services match your filters</p>
              <p className="text-sm text-gray-400">Try adjusting the category, city, or price range</p>
              <button
                onClick={() => { setCategory("All"); setCity("All"); setPriceRange("all"); setRatingFilter("all"); setSearch(""); }}
                className="mt-1 rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
