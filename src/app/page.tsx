// src/app/page.tsx
"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Headphones, Zap, Award, Sparkles } from "lucide-react";

// Awwwards-style components
import HeroAwwwards from "@/components/home/HeroAwwwards";
import DestinationsShowcase from "@/components/home/DestinationsShowcase";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsAwwwards from "@/components/home/TestimonialsAwwwards";

// Existing premium components
import SearchWidget from "@/components/search/SearchWidget";
import PackageCard from "@/components/packages/PackageCard";
import VisaCards from "@/components/visa/VisaCards";
import BlogSection from "@/components/home/BlogSection";
import FlashDeals from "@/components/home/FlashDeals";
import TrustBadges from "@/components/ui/TrustBadges";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import TripPlannerModal from "@/components/home/TripPlannerModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { featuredPackages } from "@/data/packages";

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "100% secure payment gateway with encrypted transactions.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your travel needs.",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get immediate booking confirmations via email & SMS.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "We match any competitor price or refund the difference.",
  },
];

export default function HomePage() {
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);

  return (
    <>
      {/* ========== CINEMATIC HERO ========== */}
      <HeroAwwwards />

      {/* ========== QUICK SEARCH WIDGET ========== */}
      <ScrollReveal>
        <section className="relative z-30 -mt-20 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6">
              <Suspense fallback={<div className="h-[400px] w-full bg-slate-100/50 rounded-3xl animate-pulse" />}>
                <SearchWidget />
              </Suspense>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== DESTINATIONS SHOWCASE (BENTO GRID) ========== */}
      <ScrollReveal delay={0.2}>
        <DestinationsShowcase />
      </ScrollReveal>

      {/* ========== FLASH DEALS ========== */}
      <ScrollReveal delay={0.1}>
        <FlashDeals />
      </ScrollReveal>

      {/* ========== STATS SECTION ========== */}
      <ScrollReveal delay={0.15}>
        <StatsSection />
      </ScrollReveal>

      {/* ========== VISA SERVICES ========== */}
      <ScrollReveal delay={0.1}>
        <VisaCards />
      </ScrollReveal>

      {/* ========== FEATURED PACKAGES ========== */}
      <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block">
                Handpicked For You
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-sora), serif" }}
              >
                Featured Holiday Packages
              </h2>
            </div>
            <Link
              href="/holidays"
              className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              View All
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.slice(0, 6).map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 0.1}>
                <PackageCard package_={pkg} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <TestimonialsAwwwards />

      {/* ========== TRUST BADGES ========== */}
      <TrustBadges variant="full" />

      {/* ========== PARTNERS ========== */}
      <PartnersMarquee />

      {/* ========== BLOG ========== */}
      <BlogSection />

      {/* ========== NEWSLETTER CTA ========== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920"
            alt="Adventure awaits"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-sora), serif" }}
          >
            Ready for your next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
              adventure?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive deals,
            new destinations, and travel inspiration.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-orange-400 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-orange-400 transition-colors"
            >
              Subscribe
            </button>
          </form>

          <p className="text-white/40 text-sm mt-4">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Trip Planner Modal */}
      <TripPlannerModal
        isOpen={isTripPlannerOpen}
        onClose={() => setIsTripPlannerOpen(false)}
      />
    </>
  );
}
