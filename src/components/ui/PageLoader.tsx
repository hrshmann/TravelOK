// src/components/ui/PageLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if loader has been shown before
        const loaderShown = sessionStorage.getItem("loaderShown");
        if (loaderShown === "true") {
            setIsLoading(false);
            setHasShown(true);
            return;
        }

        // Animate progress from 0 to 100
        const duration = 2500; // 2.5 seconds
        const steps = 100;
        const interval = duration / steps;

        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(timer);
                // Wait a bit before hiding
                setTimeout(() => {
                    setIsLoading(false);
                    sessionStorage.setItem("loaderShown", "true");
                }, 500);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    if (hasShown) return null;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                    }}
                >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: "50px 50px",
                            }}
                            initial={{ y: 0 }}
                            animate={{ y: -50 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

                    {/* Main Content */}
                    <div className="relative z-10 flex flex-col items-center gap-12">
                        {/* Logo/Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-3">
                                OK TRAVELS
                            </h1>
                            <p className="text-white/60 text-lg tracking-wider">
                                Your Journey Begins Here
                            </p>
                        </motion.div>

                        {/* Flight Path SVG */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-80 h-40"
                        >
                            <svg
                                viewBox="0 0 400 200"
                                className="w-full h-full"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Dotted Path */}
                                <motion.path
                                    d="M 20 180 Q 100 120, 200 100 T 380 20"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="2"
                                    strokeDasharray="5,5"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: progress / 100 }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />

                                {/* Solid Trail */}
                                <motion.path
                                    d="M 20 180 Q 100 120, 200 100 T 380 20"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: progress / 100 }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />

                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#fb923c" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Animated Plane */}
                            <motion.div
                                className="absolute top-0 left-0"
                                style={{
                                    offsetPath: "path('M 20 180 Q 100 120, 200 100 T 380 20')",
                                    offsetDistance: `${progress}%`,
                                }}
                                initial={{ offsetDistance: "0%" }}
                                animate={{ offsetDistance: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            >
                                <div className="relative -translate-x-1/2 -translate-y-1/2">
                                    <div className="absolute inset-0 bg-orange-400/40 rounded-full blur-xl scale-150 animate-pulse" />
                                    <div className="relative w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50">
                                        <Plane className="text-white rotate-45" size={24} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Start & End Markers */}
                            <div className="absolute bottom-0 left-0 w-3 h-3 bg-white/40 rounded-full" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        </motion.div>

                        {/* Progress Counter */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="text-6xl font-bold text-white tabular-nums">
                                {progress}
                                <span className="text-3xl text-white/50">%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />
                            </div>

                            <motion.p
                                className="text-white/40 text-sm tracking-wider"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {progress < 30
                                    ? "Preparing your journey..."
                                    : progress < 70
                                        ? "Loading destinations..."
                                        : "Almost ready..."}
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
