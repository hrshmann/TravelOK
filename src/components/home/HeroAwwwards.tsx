// src/components/home/HeroAwwwards.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown, MapPin, Star, Calendar } from "lucide-react";
import { MagneticButton } from "../ui/SmoothScroll";
import { useCurrency } from "@/components/ui/CurrencySelector";

const destinations = [
    {
        id: 1,
        name: "Maldives",
        tagline: "Paradise Found",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920",
        price: 1499,
        duration: "5 Days",
        rating: 4.9,
    },
    {
        id: 2,
        name: "Santorini",
        tagline: "Greek Dreams",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920",
        price: 2199,
        duration: "7 Days",
        rating: 4.8,
    },
    {
        id: 3,
        name: "Bali",
        tagline: "Island Magic",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920",
        price: 899,
        duration: "6 Days",
        rating: 4.9,
    },
];

export default function HeroAwwwards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { formatPrice } = useCurrency();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    // Auto-rotate destinations
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % destinations.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const activeDestination = destinations[activeIndex];

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-slate-950"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Images with Crossfade */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{ y, scale }}
                >
                    <Image
                        src={activeDestination.image}
                        alt={activeDestination.name}
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Cinematic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
                </motion.div>
            </AnimatePresence>

            {/* Grain Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 min-h-screen flex flex-col"
            >
                {/* Main Hero Content */}
                <div className="flex-1 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Typography */}
                            <div className="space-y-8">
                                {/* Destination Tag */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2"
                                >
                                    <span className="w-12 h-[1px] bg-white/50" />
                                    <span className="text-white/70 text-sm tracking-[0.3em] uppercase font-light">
                                        Featured Destination
                                    </span>
                                </motion.div>

                                {/* Main Heading - Split Design */}
                                <div className="space-y-2">
                                    <AnimatePresence mode="wait">
                                        <motion.h1
                                            key={activeDestination.name}
                                            initial={{ opacity: 0, y: 60, rotateX: -15 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            exit={{ opacity: 0, y: -40 }}
                                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.0] md:leading-[0.9] tracking-tight"
                                            style={{ fontFamily: "var(--font-sora)" }}
                                        >
                                            {activeDestination.name}
                                        </motion.h1>
                                    </AnimatePresence>

                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeDestination.tagline}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="text-lg sm:text-xl md:text-3xl text-white/60 font-light italic"
                                            style={{ fontFamily: "var(--font-sora)" }}
                                        >
                                            {activeDestination.tagline}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                {/* Stats Row */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex gap-8 pt-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} className="text-orange-400" />
                                        <span className="text-white/80">{activeDestination.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star size={18} className="text-amber-400 fill-amber-400" />
                                        <span className="text-white/80">{activeDestination.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-rose-400" />
                                        <span className="text-white/80">All Inclusive</span>
                                    </div>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-4 pt-4"
                                >
                                    <Link
                                        href="/holidays"
                                        className="group relative flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                        data-cursor="Explore"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Explore Packages
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            Explore Packages
                                            <ArrowRight size={18} />
                                        </span>
                                    </Link>

                                    <button
                                        className="group flex items-center gap-3 px-6 py-4 text-white font-medium"
                                        data-cursor="Play"
                                    >
                                        <span className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/30 group-hover:border-white/60 transition-colors">
                                            <Play size={18} fill="white" className="ml-1" />
                                            <span className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                                        </span>
                                        <span className="text-white/80 group-hover:text-white transition-colors">
                                            Watch Film
                                        </span>
                                    </button>
                                </motion.div>

                                {/* Price Tag */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="pt-8"
                                >
                                    <p className="text-white/50 text-sm mb-1">Starting from</p>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeDestination.price}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-4xl font-bold text-white"
                                        >
                                            {formatPrice(activeDestination.price)}
                                            <span className="text-lg font-normal text-white/50 ml-2">/ person</span>
                                        </motion.p>
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Right Side - Destination Selector */}
                            <div className="hidden lg:block">
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    {destinations.map((dest, index) => (
                                        <button
                                            key={dest.id}
                                            onClick={() => setActiveIndex(index)}
                                            className={`group w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${index === activeIndex
                                                ? 'bg-white/10 backdrop-blur-sm'
                                                : 'hover:bg-white/5'
                                                }`}
                                        >
                                            {/* Thumbnail */}
                                            <div className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${index === activeIndex ? 'ring-2 ring-white' : ''
                                                }`}>
                                                <Image
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 text-left">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {dest.name}
                                                </h3>
                                                <p className="text-white/50 text-sm">{dest.tagline}</p>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-white">{formatPrice(dest.price)}</p>
                                                <p className="text-white/50 text-xs">{dest.duration}</p>
                                            </div>

                                            {/* Active Indicator */}
                                            <div className={`w-1 h-12 rounded-full transition-all ${index === activeIndex
                                                ? 'bg-gradient-to-b from-orange-400 to-orange-600'
                                                : 'bg-white/10'
                                                }`} />
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    {destinations.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative h-1 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'
                                }`}
                        >
                            {index === activeIndex && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/50"
                >
                    <span className="text-xs tracking-widest uppercase rotate-90 origin-center translate-x-6">Scroll</span>
                    <ChevronDown size={20} className="animate-bounce" />
                </motion.div>
            </motion.div>
        </div>
    );
}
