import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zenoti Marketplace",
  description: "Discover and book premium beauty, wellness, barbershop, and medspa services across the U.S.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <footer className="border-t border-gray-100 bg-white mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 text-center">
            <p className="text-sm font-medium text-gray-400">Zenoti Marketplace</p>
            <p className="mt-2 text-xs text-gray-400 max-w-md mx-auto">
              Demo prototype using mock data inspired by publicly featured Zenoti customers. This is not a production product and does not represent actual integrations.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
