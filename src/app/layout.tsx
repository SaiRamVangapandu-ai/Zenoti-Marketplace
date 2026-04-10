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
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-sm font-semibold text-gray-700">Zenoti Marketplace</p>
                <p className="mt-0.5 text-xs text-gray-400">A consumer booking layer built on top of the Zenoti platform</p>
              </div>
              <p className="text-xs text-gray-300 sm:max-w-xs sm:text-right">
                Concept prototype · Mock data based on publicly featured Zenoti customers · Not a production product
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
