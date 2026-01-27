// src/components/home/DestinationMap.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plane, MapPin, Star, ArrowRight } from "lucide-react";

interface Destination {
    id: string;
    name: string;
    country: string;
    image: string;
    packages: number;
    startingPrice: number;
    rating: number;
    position: { x: number; y: number }; // Percentage positions on map
    slug: string;
}

const destinations: Destination[] = [
    {
        id: "1",
        name: "Dubai",
        country: "UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
        packages: 15,
        startingPrice: 999,
        rating: 4.9,
        position: { x: 58, y: 42 },
        slug: "uae",
    },
    {
        id: "2",
        name: "Maldives",
        country: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400",
        packages: 8,
        startingPrice: 1499,
        rating: 4.9,
        position: { x: 62, y: 58 },
        slug: "maldives",
    },
    {
        id: "3",
        name: "Thailand",
        country: "Thailand",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400",
        packages: 12,
        startingPrice: 749,
        rating: 4.7,
        position: { x: 72, y: 48 },
        slug: "thailand",
    },
    {
        id: "4",
        name: "Bali",
        country: "Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
        packages: 10,
        startingPrice: 1199,
        rating: 4.8,
        position: { x: 78, y: 60 },
        slug: "indonesia",
    },
    {
        id: "5",
        name: "Singapore",
        country: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400",
        packages: 6,
        startingPrice: 899,
        rating: 4.6,
        position: { x: 75, y: 56 },
        slug: "singapore",
    },
    {
        id: "6",
        name: "Egypt",
        country: "Egypt",
        image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400",
        packages: 7,
        startingPrice: 799,
        rating: 4.5,
        position: { x: 52, y: 40 },
        slug: "egypt",
    },
];

// Flight path animation component
function FlightPath({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
    return (
        <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6600" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FF6600" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF8533" stopOpacity="0" />
                </linearGradient>
            </defs>
            <motion.path
                d={`M ${from.x}% ${from.y}% Q ${(from.x + to.x) / 2}% ${Math.min(from.y, to.y) - 15}% ${to.x}% ${to.y}%`}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle
                r="4"
                fill="#FF6600"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{
                    offsetPath: `path("M ${from.x}% ${from.y}% Q ${(from.x + to.x) / 2}% ${Math.min(from.y, to.y) - 15}% ${to.x}% ${to.y}%")`,
                }}
            />
        </motion.svg>
    );
}

export default function DestinationMap() {
    const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    // Dubai as origin for flight paths
    const origin = { x: 58, y: 42 };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Premium Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920"
                    alt="Road trip destination"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/95" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-4">
                        <Plane size={16} />
                        Explore Destinations
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Where Will You Go Next?
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Click on any destination to discover amazing holiday packages. We fly you to the world&apos;s most beautiful places.
                    </p>
                </div>

                {/* Interactive Map */}
                <div className="relative aspect-[2/1] bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50">
                    {/* World Map Background */}
                    <div className="absolute inset-0 opacity-30">
                        <Image
                            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600"
                            alt="World map"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900/80" />
                    </div>

                    {/* Flight Paths */}
                    <AnimatePresence>
                        {hoveredDestination && hoveredDestination.id !== "1" && (
                            <FlightPath from={origin} to={hoveredDestination.position} />
                        )}
                    </AnimatePresence>

                    {/* Destination Markers */}
                    {destinations.map((dest) => (
                        <motion.div
                            key={dest.id}
                            className="absolute cursor-pointer"
                            style={{
                                left: `${dest.position.x}%`,
                                top: `${dest.position.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: parseFloat(dest.id) * 0.1, type: "spring" }}
                            onMouseEnter={() => setHoveredDestination(dest)}
                            onMouseLeave={() => setHoveredDestination(null)}
                            onClick={() => setSelectedDestination(dest)}
                        >
                            {/* Pulse Ring */}
                            <div className="absolute inset-0 w-8 h-8 -m-1 bg-orange-500/30 rounded-full animate-ping" />

                            {/* Marker */}
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="relative w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50"
                            >
                                <MapPin size={14} className="text-white" />
                            </motion.div>

                            {/* Hover Card */}
                            <AnimatePresence>
                                {hoveredDestination?.id === dest.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-10"
                                    >
                                        <div className="relative h-24">
                                            <Image
                                                src={dest.image}
                                                alt={dest.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-bold text-slate-900">{dest.name}</h4>
                                            <p className="text-xs text-slate-500">{dest.country}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm font-bold text-orange-600">
                                                    From ${dest.startingPrice}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                                    {dest.rating}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
                            <span>Destinations</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-6 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600" style={{ backgroundImage: "repeating-linear-gradient(90deg, #FF6600, #FF6600 4px, transparent 4px, transparent 8px)" }} />
                            <span>Flight Path</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {destinations.map((dest) => (
                        <Link
                            key={dest.id}
                            href={`/holidays/${dest.slug}`}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-orange-500/50 rounded-full text-white text-sm transition-all group"
                        >
                            <span>{dest.name}</span>
                            <span className="text-xs text-slate-500 group-hover:text-orange-400">
                                {dest.packages} packages
                            </span>
                            <ArrowRight size={14} className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
