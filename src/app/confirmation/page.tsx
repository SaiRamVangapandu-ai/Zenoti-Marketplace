"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const params = useSearchParams();
  const service = params.get("service") ?? "—";
  const business = params.get("business") ?? "—";
  const location = params.get("location") ?? "—";
  const date = params.get("date") ?? "—";
  const time = params.get("time") ?? "—";
  const price = params.get("price") ?? "—";
  const name = params.get("name") ?? "—";

  return (
    <div className="mx-auto flex max-w-6xl min-h-[65vh] flex-col items-center justify-center px-4 py-6 text-center sm:px-6">
      {/* Success icon */}
      <div className="animate-scale-in flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg className="h-10 w-10 text-green-600 animate-check-draw" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 animate-fade-in-up">Booking Confirmed!</h1>
      <p className="mt-2 text-sm text-gray-500 animate-fade-in-up delay-100">Thanks, {name}. Your appointment is all set.</p>

      {/* Details card */}
      <div className="mt-8 w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm animate-fade-in-up delay-200">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-400">Service</dt>
            <dd className="font-medium text-gray-900 text-right">{service}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Business</dt>
            <dd className="font-medium text-gray-900 text-right">{business}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Location</dt>
            <dd className="font-medium text-gray-900 text-right">{location}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Date</dt>
            <dd className="font-medium text-gray-900">{date}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Time</dt>
            <dd className="font-medium text-gray-900">{time}</dd>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-3">
            <dt className="font-medium text-gray-500">Total</dt>
            <dd className="text-xl font-bold text-gray-900">${price}</dd>
          </div>
        </dl>
      </div>

      {/* What happens next */}
      <div className="mt-8 w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 text-left animate-fade-in-up delay-300">
        <h3 className="text-sm font-semibold text-gray-900">What happens next</h3>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600">1</span>
            Confirmation sent to your email and phone
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600">2</span>
            Your appointment is reserved with {business}
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-600">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600">3</span>
            Arrive 10 minutes early for check-in
          </li>
        </ul>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors"
        >
          Explore More Services
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[65vh] items-center justify-center text-gray-400">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
