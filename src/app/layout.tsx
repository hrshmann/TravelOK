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
  title: "OK Travel & Tourism | Your Gateway to Unforgettable Journeys",
  description:
    "Discover curated holiday packages, flight deals, and visa services. Experience world-class destinations with OK Travel & Tourism - your trusted travel partner. Every Journey is OK!",
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
    title: "OK Travel & Tourism | Your Gateway to Unforgettable Journeys",
    description:
      "Discover curated holiday packages, flight deals, and visa services.",
    type: "website",
    locale: "en_US",
    siteName: "OK Travel & Tourism",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "OK Travel & Tourism",
              url: "https://www.oktravels.ae",
              logo: "https://www.oktravels.ae/logo.png",
              description:
                "OK Travel & Tourism offers curated holiday packages, flight deals, UAE tours, and visa services. Your trusted travel partner in the UAE.",
              telephone: "+971585255484",
              email: "info@oktravels.ae",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dubai",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
              sameAs: [
                "https://www.instagram.com/oktravels",
                "https://www.facebook.com/oktravels",
              ],
              openingHours: "Mo-Su 09:00-21:00",
              priceRange: "$$",
            }),
          }}
        />
      </head>
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

