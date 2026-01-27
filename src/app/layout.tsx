// src/app/layout.tsx
import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActionHub from "@/components/ui/FloatingActionHub";
import SocialSidebar from "@/components/ui/SocialSidebar";
import LiveBookingToast from "@/components/ui/LiveBookingToast";
import CallbackBanner from "@/components/home/CallbackBanner";
import CompareDrawer, { CompareProvider } from "@/components/packages/CompareDrawer";
import { CurrencyProvider } from "@/components/ui/CurrencySelector";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "OKTravels | Your Gateway to Unforgettable Journeys",
  description:
    "Discover curated holiday packages, flight deals, and visa services. Experience world-class destinations with OKTravels - your trusted travel partner.",
  keywords: [
    "travel agency",
    "holiday packages",
    "flights",
    "visa services",
    "Dubai tours",
    "Maldives vacation",
    "Thailand holidays",
  ],
  openGraph: {
    title: "OKTravels | Your Gateway to Unforgettable Journeys",
    description:
      "Discover curated holiday packages, flight deals, and visa services.",
    type: "website",
    locale: "en_US",
    siteName: "OKTravels",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sora.variable}`}>
      <body className="antialiased">
        {/* Premium Page Loader */}
        <PageLoader />

        <CurrencyProvider>
          <CompareProvider>
            {/* Custom Cursor - Disabled for performance */}
            {/* <CustomCursor /> */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />

            {/* Premium Floating Components */}
            <FloatingActionHub />
            <SocialSidebar />
            <LiveBookingToast />
            <CallbackBanner />
            <CompareDrawer />
          </CompareProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

