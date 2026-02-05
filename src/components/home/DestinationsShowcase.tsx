// src/components/home/DestinationsShowcase.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star, Users } from "lucide-react";

const destinations = [
    {
        id: 1,
        name: "Dubai",
        country: "United Arab Emirates",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        packages: 24,
        rating: 4.9,
        reviews: 1247,
        tagline: "City of Gold",
        color: "from-amber-500 to-orange-600",
    },
    {
        id: 2,
        name: "Maldives",
        country: "Republic of Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        packages: 18,
        rating: 4.9,
        reviews: 892,
        tagline: "Paradise on Earth",
        color: "from-orange-400 to-orange-600",
    },
    {
        id: 3,
        name: "Thailand",
        country: "Kingdom of Thailand",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
        packages: 32,
        rating: 4.8,
        reviews: 2103,
        tagline: "Land of Smiles",
        color: "from-emerald-400 to-teal-600",
    },
    {
        id: 4,
        name: "Bali",
        country: "Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        packages: 21,
        rating: 4.8,
        reviews: 1567,
        tagline: "Island of Gods",
        color: "from-purple-500 to-pink-600",
    },
];

export default function DestinationsShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-slate-950 overflow-hidden"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header - Asymmetric */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-orange-400 text-sm tracking-[0.3em] uppercase mb-4"
                        >
                            Curated Destinations
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
                            style={{ fontFamily: "var(--font-sora)" }}
                        >
                            Where will your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                                story begin?
                            </span>
                        </motion.h2>
                    </div>
                    <div className="flex items-end lg:justify-end">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-white/50 text-lg max-w-md"
                        >
                            Discover handpicked destinations that offer extraordinary
                            experiences. From pristine beaches to bustling cities,
                            we've got your next adventure covered.
                        </motion.p>
                    </div>
                </div>

                {/* Destinations Grid - Asymmetric Bento Layout */}
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {destinations.map((dest, index) => {
                        // Asymmetric sizing based on index
                        const sizes = [
                            "col-span-12 md:col-span-7 row-span-2", // Large
                            "col-span-12 md:col-span-5",            // Medium
                            "col-span-12 md:col-span-5",            // Medium  
                            "col-span-12 md:col-span-7",            // Large
                        ];

                        return (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className={`group relative ${sizes[index]} ${index < 2 ? 'h-[400px] md:h-[500px]' : 'h-[300px] md:h-[350px]'} rounded-3xl overflow-hidden cursor-pointer`}
                            >
                                <Link href={`/holidays/${dest.name.toLowerCase()}`} data-cursor="View">
                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={dest.image}
                                            alt={dest.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                                        {/* Top - Rating & Reviews */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                                                <Star size={14} className="text-amber-400 fill-amber-400" />
                                                <span className="text-white text-sm font-medium">{dest.rating}</span>
                                                <span className="text-white/50 text-sm">({dest.reviews})</span>
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, rotate: -45 }}
                                                whileHover={{ opacity: 1, rotate: 0 }}
                                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <ArrowUpRight size={20} className="text-slate-900" />
                                            </motion.div>
                                        </div>

                                        {/* Bottom - Info */}
                                        <div>
                                            {/* Tagline */}
                                            <p className={`text-sm font-medium bg-gradient-to-r ${dest.color} bg-clip-text text-transparent mb-2`}>
                                                {dest.tagline}
                                            </p>

                                            {/* Name */}
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                                                {dest.name}
                                            </h3>

                                            {/* Country */}
                                            <p className="text-white/50 text-sm mb-4">{dest.country}</p>

                                            {/* Packages Count */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Users size={16} className="text-white/50" />
                                                    <span className="text-white/70 text-sm">{dest.packages} packages</span>
                                                </div>
                                                <div className="h-4 w-px bg-white/20" />
                                                <span className="text-white/70 text-sm">From $899</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/20 transition-colors duration-300" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-16"
                >
                    <Link
                        href="/holidays"
                        className="group flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
                        data-cursor="All"
                    >
                        <span className="font-medium">View All Destinations</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
