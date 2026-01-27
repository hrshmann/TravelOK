// src/app/uae-tours/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Clock,
    Users,
    Star,
    MapPin,
    Calendar,
    CheckCircle,
    ChevronRight,
    Sunrise,
    Sunset,
    Moon,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import EnquiryModal from "@/components/ui/EnquiryModal";

// Modal state hook for tour bookings


interface Tour {
    id: string;
    title: string;
    image: string;
    duration: string;
    timing: "morning" | "afternoon" | "evening";
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    highlights: string[];
    category: string;
    popular?: boolean;
}

const tours: Tour[] = [
    {
        id: "1",
        title: "Desert Safari with BBQ Dinner",
        image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
        duration: "6 Hours",
        timing: "evening",
        rating: 4.9,
        reviewCount: 2340,
        price: 150,
        originalPrice: 220,
        highlights: ["Dune Bashing", "Camel Ride", "BBQ Dinner", "Belly Dance"],
        category: "Adventure",
        popular: true,
    },
    {
        id: "2",
        title: "Abu Dhabi City Tour",
        image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800",
        duration: "10 Hours",
        timing: "morning",
        rating: 4.8,
        reviewCount: 1256,
        price: 180,
        highlights: ["Sheikh Zayed Mosque", "Emirates Palace", "Heritage Village"],
        category: "City Tours",
    },
    {
        id: "3",
        title: "Dubai City Tour",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        duration: "6 Hours",
        timing: "morning",
        rating: 4.7,
        reviewCount: 1890,
        price: 120,
        highlights: ["Burj Khalifa View", "Dubai Mall", "Old Dubai", "Gold Souk"],
        category: "City Tours",
    },
    {
        id: "4",
        title: "Dhow Cruise Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        duration: "3 Hours",
        timing: "evening",
        rating: 4.8,
        reviewCount: 987,
        price: 99,
        originalPrice: 150,
        highlights: ["Marina Views", "Buffet Dinner", "Live Entertainment"],
        category: "Cruises",
        popular: true,
    },
    {
        id: "5",
        title: "Musandam Day Trip",
        image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800",
        duration: "Full Day",
        timing: "morning",
        rating: 4.9,
        reviewCount: 543,
        price: 350,
        highlights: ["Fjords Cruise", "Swimming", "Snorkeling", "Lunch"],
        category: "Day Trips",
    },
    {
        id: "6",
        title: "Burj Khalifa At The Top",
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
        duration: "2 Hours",
        timing: "afternoon",
        rating: 4.9,
        reviewCount: 3200,
        price: 180,
        highlights: ["124th Floor", "Panoramic Views", "Interactive Displays"],
        category: "Attractions",
    },
    {
        id: "7",
        title: "Private Yacht Charter",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
        duration: "3 Hours",
        timing: "afternoon",
        rating: 5.0,
        reviewCount: 234,
        price: 800,
        highlights: ["Private Yacht", "Swimming", "Refreshments", "Marina Views"],
        category: "Luxury",
    },
    {
        id: "8",
        title: "Hot Air Balloon Ride",
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800",
        duration: "4 Hours",
        timing: "morning",
        rating: 4.9,
        reviewCount: 678,
        price: 950,
        highlights: ["Sunrise Flight", "Desert Views", "Falcon Show", "Breakfast"],
        category: "Adventure",
    },
];

const categories = ["All", "Adventure", "City Tours", "Cruises", "Day Trips", "Attractions", "Luxury"];
const timings = [
    { id: "all", label: "Any Time", icon: Sparkles },
    { id: "morning", label: "Morning", icon: Sunrise },
    { id: "afternoon", label: "Afternoon", icon: Sunset },
    { id: "evening", label: "Evening", icon: Moon },
];

export default function UAEToursPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTiming, setSelectedTiming] = useState("all");

    const filteredTours = tours.filter((tour) => {
        const categoryMatch = selectedCategory === "All" || tour.category === selectedCategory;
        const timingMatch = selectedTiming === "all" || tour.timing === selectedTiming;
        return categoryMatch && timingMatch;
    });

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
                        <Sparkles size={16} />
                        Explore the UAE
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        UAE Tours & Activities
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Discover the best experiences in Dubai, Abu Dhabi, and beyond.
                        From desert safaris to luxury yacht cruises.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white border-b sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedCategory === category
                                        ? "bg-orange-500 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Timing Filter */}
                    <div className="flex justify-center gap-4">
                        {timings.map((timing) => (
                            <button
                                key={timing.id}
                                onClick={() => setSelectedTiming(timing.id)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                    selectedTiming === timing.id
                                        ? "bg-slate-900 text-white"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                <timing.icon size={16} />
                                {timing.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTours.map((tour) => (
                            <div
                                key={tour.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={tour.image}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {tour.popular && (
                                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                                POPULAR
                                            </span>
                                        )}
                                        {tour.originalPrice && (
                                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                                {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                                            </span>
                                        )}
                                    </div>
                                    {/* Timing Badge */}
                                    <div className="absolute bottom-3 right-3">
                                        <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                                            {tour.timing === "morning" && <Sunrise size={12} />}
                                            {tour.timing === "afternoon" && <Sunset size={12} />}
                                            {tour.timing === "evening" && <Moon size={12} />}
                                            {tour.timing.charAt(0).toUpperCase() + tour.timing.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Category */}
                                    <span className="text-xs font-semibold text-orange-500 uppercase">
                                        {tour.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-orange-500 transition-colors">
                                        {tour.title}
                                    </h3>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{tour.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="text-amber-400 fill-amber-400" />
                                            <span>{tour.rating} ({tour.reviewCount})</span>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {tour.highlights.slice(0, 3).map((highlight, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {tour.originalPrice && (
                                                <span className="text-sm text-slate-400 line-through">
                                                    AED {tour.originalPrice}
                                                </span>
                                            )}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold text-slate-900">
                                                    AED {tour.price}
                                                </span>
                                                <span className="text-sm text-slate-500">/ person</span>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-1">
                                            Book
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTours.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-slate-500 text-lg">No tours found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedTiming("all");
                                }}
                                className="mt-4 text-orange-500 font-semibold hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Can&apos;t find what you&apos;re looking for?
                    </h2>
                    <p className="text-xl text-white/80 mb-8">
                        Contact us for customized tour packages tailored to your preferences.
                    </p>
                    <button className="px-8 py-4 bg-white text-orange-500 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Contact Us for Custom Tours
                    </button>
                </div>
            </section>
        </>
    );
}
