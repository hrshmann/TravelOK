// src/app/package/[slug]/page.tsx
"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Calendar,
    MapPin,
    Users,
    Star,
    Clock,
    CheckCircle,
    XCircle,
    Plane,
    Hotel,
    Utensils,
    Camera,
    Car,
    ShieldCheck,
    ArrowLeft,
    ChevronRight,
} from "lucide-react";
import { featuredPackages } from "@/data/packages";
import EnquiryModal from "@/components/ui/EnquiryModal";

interface Props {
    params: Promise<{ slug: string }>;
}

export default function PackageDetailPage({ params }: Props) {
    const { slug } = use(params);
    const pkg = featuredPackages.find((p) => p.slug === slug);
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    if (!pkg) {
        notFound();
    }

    // Helper to format duration
    const duration = `${pkg.durationDays} Days / ${pkg.durationDays - 1} Nights`;
    const mainImage = pkg.images[0]?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";
    const altText = pkg.images[0]?.alt || pkg.title;

    const defaultInclusions = [
        { icon: Plane, text: "Return Flights" },
        { icon: Hotel, text: `${pkg.durationDays}-Night Hotel Stay` },
        { icon: Utensils, text: "Daily Breakfast" },
        { icon: Camera, text: "Guided Tours" },
        { icon: Car, text: "Airport Transfers" },
        { icon: ShieldCheck, text: "Travel Insurance" },
    ];

    const defaultItinerary = [
        {
            day: 1,
            title: "Arrival & Welcome",
            description:
                "Arrive at the destination, airport pickup, and transfer to your hotel. Evening at leisure to explore the surroundings.",
        },
        {
            day: 2,
            title: "City Exploration",
            description:
                "Full day guided city tour covering major attractions, landmarks, and hidden gems. Includes lunch at a local restaurant.",
        },
        {
            day: 3,
            title: "Adventure Day",
            description:
                "Choose from various adventure activities or relax at the hotel. Optional excursions available.",
        },
        {
            day: Math.floor(pkg.durationDays / 2) + 1,
            title: "Cultural Experience",
            description:
                "Visit cultural sites, museums, and local markets. Experience authentic local cuisine and traditions.",
        },
        {
            day: pkg.durationDays,
            title: "Departure",
            description:
                "Enjoy a leisurely breakfast, check out, and transfer to the airport for your return flight.",
        },
    ];

    // Use dynamic data if available, otherwise fallback to defaults
    const itinerary = (pkg as { itinerary?: typeof defaultItinerary }).itinerary || defaultItinerary;
    const inclusions = (pkg as { inclusions?: string[] }).inclusions;
    const exclusions = (pkg as { exclusions?: string[] }).exclusions;
    const description = (pkg as { description?: string }).description;

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px]">
                <Image
                    src={mainImage}
                    alt={altText}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Back Button */}
                <Link
                    href="/holidays"
                    className="absolute top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Packages</span>
                </Link>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {pkg.isFeatured && (
                                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                                    FEATURED
                                </span>
                            )}
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                {pkg.country}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {pkg.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>{pkg.destination}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={18} className="text-amber-400 fill-amber-400" />
                                <span>{pkg.rating} (120+ reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left: Details */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                    About This Package
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    {description ||
                                        `Experience the best of ${pkg.destination} with our carefully curated ${duration} package.
                                    From breathtaking landscapes to rich cultural experiences, this journey offers the perfect
                                    blend of adventure and relaxation.`}
                                </p>
                                {!description && (
                                    <p className="text-slate-600 leading-relaxed mt-4">
                                        Our expert guides will ensure you discover hidden gems
                                        and create memories that last a lifetime. This package includes stays at premium accommodations
                                        with amenities like {pkg.amenities.slice(0, 3).join(", ")}.
                                    </p>
                                )}
                            </div>

                            {/* Inclusions */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    What&apos;s Included
                                </h2>
                                {inclusions ? (
                                    <div className="space-y-2">
                                        {inclusions.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                                                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                                <span className="text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {defaultInclusions.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl"
                                            >
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <item.icon size={20} className="text-blue-600" />
                                                </div>
                                                <span className="text-slate-700 font-medium">
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Amenities */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {pkg.amenities.map((amenity, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                                        >
                                            ✓ {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Exclusions */}
                            {exclusions && exclusions.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                        Not Included
                                    </h2>
                                    <div className="space-y-2">
                                        {exclusions.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                                                <XCircle size={18} className="text-red-400 flex-shrink-0" />
                                                <span className="text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Itinerary */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    Itinerary
                                </h2>
                                <div className="space-y-4">
                                    {itinerary.map((day) => (
                                        <div
                                            key={day.day}
                                            className="relative pl-8 pb-8 border-l-2 border-blue-200 last:pb-0 last:border-l-0"
                                        >
                                            {/* Day Circle */}
                                            <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {day.day}
                                            </div>

                                            {/* Content */}
                                            <div className="bg-slate-50 rounded-xl p-6 ml-4">
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                                    Day {day.day}: {day.title}
                                                </h3>
                                                <p className="text-slate-600">{day.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-white rounded-2xl border-2 border-slate-100 shadow-xl p-6">
                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-slate-900">
                                            {pkg.currency} {pkg.price.toLocaleString()}
                                        </span>
                                        <span className="text-slate-500">/ person</span>
                                    </div>
                                </div>

                                {/* Quick Info */}
                                <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                                    <div className="flex items-center justify-between text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            <span>Duration</span>
                                        </div>
                                        <span className="font-semibold text-slate-900">
                                            {duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>Group Size</span>
                                        </div>
                                        <span className="font-semibold text-slate-900">
                                            2-10 People
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>Availability</span>
                                        </div>
                                        <span className="font-semibold text-green-600">
                                            Available
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsEnquiryOpen(true)}
                                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                    >
                                        Enquire Now
                                        <ChevronRight size={18} />
                                    </button>
                                    <a
                                        href="https://wa.me/971585255484"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        WhatsApp Us
                                    </a>
                                </div>

                                {/* Features */}
                                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Free Cancellation up to 7 days</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Instant Confirmation</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span>Secure Payment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enquiry Modal */}
            <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                packageName={pkg.title}
                destination={pkg.destination}
            />
        </>
    );
}
