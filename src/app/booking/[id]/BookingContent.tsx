"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import services from "@/data/services.json";
import businesses from "@/data/businesses.json";

const dates = [
  { label: "Today", value: "Mar 18" },
  { label: "Wed", value: "Mar 19" },
  { label: "Thu", value: "Mar 20" },
  { label: "Fri", value: "Mar 21" },
  { label: "Sat", value: "Mar 22" },
];

function BookingContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedTime = searchParams.get("time");

  const service = services.find((s) => s.id === id);
  const business = service ? businesses.find((b) => b.id === service.businessId) : null;

  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(preselectedTime);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!service || !business) {
    return <p className="py-20 text-center text-gray-400">Service not found.</p>;
  }

  const canConfirm = selectedSlot && name.trim() && phone.trim() && email.trim();

  const handleConfirm = () => {
    if (!canConfirm) return;
    setLoading(true);
    setTimeout(() => {
      const params = new URLSearchParams({
        service: service.name,
        business: business.name,
        location: `${business.neighborhood}, ${business.city}, ${business.state}`,
        date: selectedDate,
        time: selectedSlot!,
        price: String(service.price),
        name,
      });
      router.push(`/confirmation?${params.toString()}`);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-32 sm:px-6 sm:pb-8">
      <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>

      {/* Service summary */}
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          <Image src={service.image} alt={service.name} fill className="object-cover" sizes="80px" />
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900">{service.name}</h2>
          <p className="text-sm text-gray-500">{business.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {business.neighborhood}, {business.city}, {business.state}
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">${service.price}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500">{service.duration}</span>
            {selectedSlot && (
              <>
                <span className="text-gray-300">·</span>
                <span className="font-medium text-gray-700">{selectedSlot}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Date */}
      <section className="mt-8">
        <h3 className="text-base font-semibold text-gray-900">Select a date</h3>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => { setSelectedDate(d.value); setSelectedSlot(null); }}
              className={`shrink-0 rounded-xl px-5 py-3 text-center transition-all ${
                selectedDate === d.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="block text-xs opacity-70">{d.label}</span>
              <span className="block text-sm font-medium">{d.value.split(" ")[1]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Time */}
      <section className="mt-8">
        <h3 className="text-base font-semibold text-gray-900">Pick a time</h3>
        {!selectedSlot && (
          <p className="mt-1 text-xs text-amber-600">Please select a time to continue</p>
        )}
        <div className="mt-3">
          <TimeSlotSelector selected={selectedSlot} onSelect={setSelectedSlot} />
        </div>
      </section>

      {/* Form */}
      <section className="mt-8">
        <h3 className="text-base font-semibold text-gray-900">Your details</h3>
        <div className="mt-3 space-y-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
        </div>
      </section>

      {/* Confirm */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/95 p-4 backdrop-blur-sm sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="mx-auto max-w-6xl">
          <button
            disabled={!canConfirm || loading}
            onClick={handleConfirm}
            className="w-full rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none active:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Confirming...
              </span>
            ) : canConfirm ? (
              `Confirm Booking · $${service.price}`
            ) : !selectedSlot ? (
              "Select a time to continue"
            ) : (
              "Complete all fields to continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-gray-400">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
