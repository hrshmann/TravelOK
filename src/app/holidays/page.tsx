// src/app/holidays/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Star, Filter, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { featuredPackages } from "@/data/packages";

const destinations = [
    { name: "All Destinations", count: 50 },
    { name: "UAE", count: 12 },
    { name: "Maldives", count: 8 },
    { name: "Thailand", count: 10 },
    { name: "Indonesia", count: 6 },
    { name: "Singapore", count: 5 },
    { name: "Egypt", count: 4 },
    { name: "Europe", count: 5 },
];

const durations = [
    "Any Duration",
    "3-4 Days",
    "5-7 Days",
    "8-14 Days",
    "15+ Days",
];

export default function HolidaysPage() {
    return (
        <>
            {/* Hero Section */}
            {/* Premium Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2000"
                    alt="Holiday Destinations"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in-up">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="text-white text-sm font-medium tracking-wide">Premium Holiday Selection</span>
                    </div>

                    <h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up delay-100"
                        style={{ fontFamily: 'var(--font-sora)' }}
                    >
                        Curated Global <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-400 font-italic">
                            Escapes
                        </span>
                    </h1>

                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        Discover our handpicked collection of extraordinary journeys,
                        designed to create memories that last vivid forever.
                    </p>
                </div>
            </section>

            {/* Filters & Content */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-72 shrink-0">
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/60 sticky top-24 hover:shadow-2xl transition-shadow">
                                {/* Header with gradient */}
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gradient-to-r from-orange-200 via-amber-200 to-orange-200">
                                    <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
                                        <Filter size={20} className="text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg">Refine Search</h3>
                                </div>

                                {/* Destinations */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                        <MapPin size={16} className="text-amber-600" />
                                        Destination
                                    </h4>
                                    <div className="space-y-2.5">
                                        {destinations.map((dest) => (
                                            <label
                                                key={dest.name}
                                                className="flex items-center gap-3 cursor-pointer group px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all"
                                            >
                                                <input
                                                    type="radio"
                                                    name="destination"
                                                    defaultChecked={dest.name === "All Destinations"}
                                                    className="w-4 h-4 text-amber-600 border-slate-300 focus:ring-amber-500 focus:ring-offset-2"
                                                />
                                                <span className="text-slate-600 group-hover:text-amber-700 transition-colors font-medium flex-1">
                                                    {dest.name}
                                                </span>
                                                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded-full font-semibold group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                                                    {dest.count}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                        <Calendar size={16} className="text-amber-600" />
                                        Duration
                                    </h4>
                                    <select className="w-full px-4 py-3.5 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-400 outline-none transition-all font-medium text-slate-700 hover:border-amber-300 cursor-pointer">
                                        {durations.map((duration) => (
                                            <option key={duration}>{duration}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                        <span className="text-amber-600">$</span>
                                        Price Range
                                    </h4>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="w-full px-3 py-3 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-400 outline-none transition-all hover:border-amber-300"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="w-full px-3 py-3 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-400 outline-none transition-all hover:border-amber-300"
                                        />
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    <Filter size={18} />
                                    Apply Filters
                                </button>
                            </div>
                        </aside>

                        {/* Package Grid */}
                        <div className="flex-1">
                            {/* Sort Bar */}
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-slate-600">
                                    Showing <span className="font-semibold text-slate-900">{featuredPackages.length}</span> packages
                                </p>
                                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Rating: Highest</option>
                                    <option>Duration: Shortest</option>
                                </select>
                            </div>

                            {/* Packages */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {featuredPackages.map((pkg, i) => (
                                    <ScrollReveal key={pkg.id} delay={i * 0.1}>
                                        <Link
                                            href={`/package/${pkg.slug}`}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {/* Image */}
                                            <div className="relative h-52 overflow-hidden">
                                                <Image
                                                    src={pkg.images[0]?.url || ""}
                                                    alt={pkg.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                {pkg.isFeatured && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                                                            FEATURED
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                                    <MapPin size={14} />
                                                    <span>{pkg.destination}, {pkg.country}</span>
                                                </div>

                                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                    {pkg.title}
                                                </h3>

                                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>{pkg.durationDays} Days</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                                        <span>{pkg.rating}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-2xl font-bold text-slate-900">
                                                            {pkg.currency} {pkg.price.toLocaleString()}
                                                        </span>
                                                        <span className="text-slate-500 text-sm"> / person</span>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                                        View <ArrowRight size={16} />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Load More */}
                            <div className="text-center mt-12">
                                <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors">
                                    Load More Packages
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
