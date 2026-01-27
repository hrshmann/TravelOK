// src/components/ui/LiveBookingToast.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, CheckCircle } from "lucide-react";

interface Booking {
    id: number;
    name: string;
    location: string;
    destination: string;
    timeAgo: string;
    avatar: string;
}

const mockBookings: Booking[] = [
    { id: 1, name: "Ahmed K.", location: "Dubai", destination: "Maldives Paradise Retreat", timeAgo: "2 mins ago", avatar: "👨" },
    { id: 2, name: "Sarah M.", location: "Abu Dhabi", destination: "Thailand Adventure", timeAgo: "5 mins ago", avatar: "👩" },
    { id: 3, name: "John D.", location: "London", destination: "Dubai City Escape", timeAgo: "8 mins ago", avatar: "🧔" },
    { id: 4, name: "Maria S.", location: "New York", destination: "Bali Cultural Journey", timeAgo: "12 mins ago", avatar: "👱‍♀️" },
    { id: 5, name: "Raj P.", location: "Mumbai", destination: "Singapore City Break", timeAgo: "15 mins ago", avatar: "👨‍💼" },
    { id: 6, name: "Emma L.", location: "Sydney", destination: "Egypt Pyramids Explorer", timeAgo: "18 mins ago", avatar: "👩‍🦰" },
    { id: 7, name: "Ali H.", location: "Sharjah", destination: "Desert Safari", timeAgo: "20 mins ago", avatar: "🧑" },
    { id: 8, name: "Lisa W.", location: "Toronto", destination: "Maldives Honeymoon", timeAgo: "25 mins ago", avatar: "👩‍🦱" },
];

export default function LiveBookingToast() {
    const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [bookingIndex, setBookingIndex] = useState(0);

    useEffect(() => {
        // Show first toast after 5 seconds
        const initialDelay = setTimeout(() => {
            showNextBooking();
        }, 5000);

        return () => clearTimeout(initialDelay);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        // Hide toast after 5 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        // Show next toast after 30-60 seconds
        const nextTimer = setTimeout(() => {
            showNextBooking();
        }, 30000 + Math.random() * 30000);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(nextTimer);
        };
    }, [isVisible, bookingIndex]);

    const showNextBooking = () => {
        const nextIndex = (bookingIndex + 1) % mockBookings.length;
        setBookingIndex(nextIndex);
        setCurrentBooking(mockBookings[nextIndex]);
        setIsVisible(true);
    };

    return (
        <AnimatePresence>
            {isVisible && currentBooking && (
                <motion.div
                    initial={{ x: -400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -400, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-24 left-6 z-40 max-w-sm"
                >
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 flex items-center gap-2">
                            <CheckCircle size={16} className="text-white" />
                            <span className="text-white text-sm font-semibold">New Booking!</span>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                {currentBooking.avatar}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-slate-900">
                                    <span className="font-bold">{currentBooking.name}</span>
                                    <span className="text-slate-500"> from </span>
                                    <span className="font-medium">{currentBooking.location}</span>
                                </p>
                                <p className="text-sm text-slate-600 mt-1 truncate">
                                    Just booked <span className="font-semibold text-orange-600">{currentBooking.destination}</span>
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {currentBooking.timeAgo}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} />
                                        Verified booking
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1 bg-slate-100">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-500 text-xs transition-colors"
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
