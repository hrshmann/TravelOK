// src/components/home/FlashDeals.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Flame, Users, ChevronRight, Zap, ArrowRight } from "lucide-react";

interface FlashDeal {
    id: string;
    title: string;
    destination: string;
    image: string;
    originalPrice: number;
    salePrice: number;
    endsAt: Date;
    seatsLeft: number;
    totalSeats: number;
    slug: string;
}

const flashDeals: FlashDeal[] = [
    {
        id: "1",
        title: "Maldives Overwater Villa",
        destination: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        originalPrice: 3499,
        salePrice: 2199,
        endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
        seatsLeft: 4,
        totalSeats: 20,
        slug: "maldives-overwater-villa",
    },
    {
        id: "2",
        title: "Dubai Premium Package",
        destination: "UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        originalPrice: 1899,
        salePrice: 999,
        endsAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
        seatsLeft: 7,
        totalSeats: 30,
        slug: "dubai-premium-package",
    },
    {
        id: "3",
        title: "Thailand Beach Escape",
        destination: "Thailand",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
        originalPrice: 1299,
        salePrice: 749,
        endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        seatsLeft: 12,
        totalSeats: 25,
        slug: "thailand-beach-escape",
    },
    {
        id: "4",
        title: "Singapore City Explorer",
        destination: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
        originalPrice: 1599,
        salePrice: 899,
        endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days
        seatsLeft: 9,
        totalSeats: 20,
        slug: "singapore-city-explorer",
    },
];

function CountdownTimer({ endsAt }: { endsAt: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const end = endsAt.getTime();
            const diff = end - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [endsAt]);

    return (
        <div className="flex gap-1.5">
            {[
                { value: timeLeft.days, label: "D" },
                { value: timeLeft.hours, label: "H" },
                { value: timeLeft.minutes, label: "M" },
                { value: timeLeft.seconds, label: "S" },
            ].map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center bg-slate-900 text-white rounded-lg px-2 py-1 min-w-[36px]"
                >
                    <span className="text-sm font-bold">{String(item.value).padStart(2, "0")}</span>
                    <span className="text-[10px] text-slate-400">{item.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function FlashDeals() {
    return (
        <section className="py-16 relative overflow-hidden">
            {/* Rich Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920"
                    alt="Luxury resort background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900/95" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-sm font-bold mb-4">
                            <Flame size={18} className="animate-pulse" />
                            FLASH DEALS
                            <Zap size={18} />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                            Limited Time Offers
                        </h2>
                        <p className="text-slate-400 max-w-xl">
                            Grab these exclusive deals before they expire. Limited seats available!
                        </p>
                    </div>
                    <Link
                        href="/holidays?filter=deals"
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all group"
                    >
                        View All Deals
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {flashDeals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Discount Badge */}
                                <div className="absolute top-3 left-3">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-bold">
                                        <Flame size={12} />
                                        {Math.round((1 - deal.salePrice / deal.originalPrice) * 100)}% OFF
                                    </div>
                                </div>
                                {/* Seats Left */}
                                <div className="absolute top-3 right-3">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                        <Users size={12} />
                                        {deal.seatsLeft} left
                                    </div>
                                </div>
                                {/* Gradient Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Destination */}
                                <span className="text-xs font-semibold text-orange-500 uppercase">
                                    {deal.destination}
                                </span>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3 group-hover:text-orange-500 transition-colors line-clamp-1">
                                    {deal.title}
                                </h3>

                                {/* Countdown */}
                                <div className="mb-4">
                                    <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                                        <Clock size={12} />
                                        Offer ends in:
                                    </p>
                                    <CountdownTimer endsAt={deal.endsAt} />
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                                        <span>Booked</span>
                                        <span>{Math.round(((deal.totalSeats - deal.seatsLeft) / deal.totalSeats) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${((deal.totalSeats - deal.seatsLeft) / deal.totalSeats) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-sm text-slate-400 line-through">
                                            ${deal.originalPrice}
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-slate-900">
                                                ${deal.salePrice}
                                            </span>
                                            <span className="text-sm text-slate-500">/person</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/package/${deal.slug}`}
                                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                                    >
                                        Book
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
