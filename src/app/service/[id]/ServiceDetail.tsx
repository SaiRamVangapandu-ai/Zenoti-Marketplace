"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import services from "@/data/services.json";
import businesses from "@/data/businesses.json";
import reviews from "@/data/reviews.json";

const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM"];

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const service = services.find((s) => s.id === id);
  if (!service) {
    return <p className="py-20 text-center text-gray-400">Service not found.</p>;
  }

  const business = businesses.find((b) => b.id === service.businessId)!;
  const serviceReviews = reviews.filter((r) => r.serviceId === service.id).slice(0, 3);

  // Fake urgency numbers derived from service id for consistency
  const seed = parseInt(service.id.replace("s", ""), 10);
  const slotsLeft = (seed % 3) + 1;
  const bookedThisWeek = 12 + ((seed * 7) % 20);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6 sm:pb-8">
      {/* Hero image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[2.4/1]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1100px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Left column */}
        <div className="lg:col-span-2">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              {service.category}
            </span>
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {service.name}
          </h1>

          {/* Trust indicators */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span className="font-semibold text-gray-900">{service.rating}</span>
              <span>({service.reviews} reviews)</span>
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>{service.duration}</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-gray-600">Top-rated in {business.city}</span>
          </div>
          <p className="mt-1.5 text-xs text-gray-400">
            Trusted by {400 + bookedThisWeek * 5}+ customers this month
          </p>

          {/* Description */}
          <p className="mt-5 text-base leading-relaxed text-gray-600">
            {service.shortDescription}
          </p>

          {/* Business card */}
          <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Offered by</p>
            <p className="mt-1.5 text-base font-semibold text-gray-900">{business.name}</p>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {business.neighborhood}, {business.city}, {business.state}
            </div>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <span className="text-amber-500">★</span> {business.rating} ({business.totalReviews} business reviews)
            </div>
          </div>

          {/* Reviews */}
          {serviceReviews.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">What customers say</h3>
              <div className="mt-4 space-y-3">
                {serviceReviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                          {r.userName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{r.userName}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{r.comment}</p>
                    <p className="mt-2 text-xs text-gray-400">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column — booking sidebar */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-gray-900">${service.price}</span>
              <span className="text-sm text-gray-400">/ session</span>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">{service.duration}</p>

            {/* Urgency badges */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-medium text-red-700">
                  Only {slotsLeft} {slotsLeft === 1 ? "slot" : "slots"} left today
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                <svg className="h-3.5 w-3.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
                <span className="text-xs font-medium text-amber-700">
                  High demand — booked {bookedThisWeek} times this week
                </span>
              </div>
            </div>

            {/* Time slots */}
            <div className="mt-5">
              <p className="text-sm font-medium text-gray-700">Select a time</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedSlot(t)}
                    className={`cursor-pointer rounded-lg py-2.5 text-center text-sm font-medium transition-all duration-150 ${
                      selectedSlot === t
                        ? "bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/booking/${service.id}${selectedSlot ? `?time=${encodeURIComponent(selectedSlot)}` : ""}`}
              className="mt-5 block w-full rounded-full bg-gray-900 py-3.5 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-100 active:shadow-md"
            >
              Book Appointment
            </Link>

            {/* Microcopy */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instant confirmation
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free cancellation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200/60 bg-white/90 p-4 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-gray-900">${service.price}</span>
            <span className="ml-1 text-xs text-gray-400">/ session</span>
          </div>
          <Link
            href={`/booking/${service.id}${selectedSlot ? `?time=${encodeURIComponent(selectedSlot)}` : ""}`}
            className="flex-1 rounded-full bg-gray-900 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 sm:flex-none sm:px-8"
          >
            Book Appointment — ${service.price}
          </Link>
        </div>
      </div>
    </div>
  );
}
