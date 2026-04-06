"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        transparent
          ? "border-transparent bg-white/0 shadow-none"
          : "border-gray-200/60 bg-white/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link
          href="/"
          className={`text-[1.1rem] font-semibold tracking-[-0.01em] transition-colors duration-300 hover:opacity-80 ${
            transparent ? "text-white" : "text-gray-900"
          }`}
        >
          Zenoti
          <span className={`ml-1 font-medium transition-colors duration-300 ${transparent ? "text-white/60" : "text-gray-400"}`}>
            Marketplace
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Contextual location indicator */}
          <span className={`hidden text-sm transition-colors duration-300 sm:block ${transparent ? "text-white/60" : "text-gray-400"}`}>
            Showing results near Los Angeles, CA
          </span>

          <Link
            href="/#listings"
            className={`rounded-full px-5 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:scale-[1.04] hover:shadow-md active:scale-100 active:shadow-sm ${
              transparent
                ? "bg-white text-gray-900"
                : "bg-gray-900 text-white"
            }`}
          >
            Explore Services
          </Link>
        </div>
      </div>
    </nav>
  );
}
