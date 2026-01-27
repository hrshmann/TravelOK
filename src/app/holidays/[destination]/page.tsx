// src/app/holidays/[destination]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { featuredPackages } from "@/data/packages";
import { notFound } from "next/navigation";

// Destination data with metadata
const destinationInfo: Record<string, {
    name: string;
    country: string;
    description: string;
    heroImage: string;
    highlights: string[];
}> = {
    uae: {
        name: "United Arab Emirates",
        country: "UAE",
        description: "Experience the perfect blend of modern luxury and ancient traditions in the UAE. From the towering Burj Khalifa to the serene deserts, discover a land of endless possibilities.",
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920",
        highlights: ["Desert Safari", "Burj Khalifa", "Dubai Mall", "Abu Dhabi Mosques", "Palm Jumeirah"],
    },
    maldives: {
        name: "Maldives",
        country: "Maldives",
        description: "Escape to paradise in the Maldives. Crystal-clear waters, pristine beaches, and overwater villas await you in this tropical haven.",
        heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920",
        highlights: ["Overwater Villas", "Snorkeling", "Private Islands", "Sunset Cruises", "Spa Retreats"],
    },
    thailand: {
        name: "Thailand",
        country: "Thailand",
        description: "Discover the Land of Smiles with its ancient temples, vibrant street markets, stunning beaches, and world-renowned cuisine.",
        heroImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920",
        highlights: ["Bangkok Temples", "Phuket Beaches", "Thai Cuisine", "Floating Markets", "Elephant Sanctuaries"],
    },
    indonesia: {
        name: "Indonesia",
        country: "Indonesia",
        description: "Explore the magical island of Bali and beyond. From lush rice terraces to volcanic landscapes, Indonesia offers unforgettable adventures.",
        heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920",
        highlights: ["Rice Terraces", "Hindu Temples", "Yoga Retreats", "Surfing", "Komodo Dragons"],
    },
    singapore: {
        name: "Singapore",
        country: "Singapore",
        description: "The Lion City blends futuristic architecture with rich cultural heritage. Experience world-class dining, shopping, and attractions.",
        heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920",
        highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island", "Hawker Centers", "Universal Studios"],
    },
};

interface Props {
    params: Promise<{ destination: string }>;
}

export default async function DestinationPage({ params }: Props) {
    const { destination } = await params;
    const info = destinationInfo[destination.toLowerCase()];

    if (!info) {
        notFound();
    }

    // Filter packages by country
    const packages = featuredPackages.filter(
        (pkg) => pkg.country.toLowerCase() === info.country.toLowerCase()
    );

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px]">
                <Image
                    src={info.heroImage}
                    alt={info.name}
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
                    <span>All Destinations</span>
                </Link>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {info.name}
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl">
                            {info.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Popular Highlights</h2>
                    <div className="flex flex-wrap gap-3">
                        {info.highlights.map((highlight) => (
                            <span
                                key={highlight}
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                        {info.name} Packages
                    </h2>

                    {packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <Link
                                    key={pkg.id}
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
                                            <span>{pkg.destination}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
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
                                            <span className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                                View <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl">
                            <div className="text-5xl mb-4">✈️</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Coming Soon!
                            </h3>
                            <p className="text-slate-600 mb-6">
                                We&apos;re currently curating amazing packages for {info.name}.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Contact Us for Custom Package
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Can&apos;t find what you&apos;re looking for?
                    </h2>
                    <p className="text-white/80 mb-8">
                        Let us create a custom package tailored to your preferences.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Get Custom Quote
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </>
    );
}

// Generate static params for all destinations
export async function generateStaticParams() {
    return Object.keys(destinationInfo).map((destination) => ({
        destination,
    }));
}
