// src/components/ui/SocialSidebar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Youtube, MessageCircle, Music2, Twitter } from "lucide-react";

const socialLinks = [
    {
        name: "WhatsApp",
        icon: MessageCircle,
        href: "https://wa.me/971585255484",
        color: "bg-green-500 hover:bg-green-600",
        followers: "24/7 Support",
    },
    {
        name: "Instagram",
        icon: Instagram,
        href: "https://instagram.com/oktravel_ae",
        color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
        followers: "@oktravel_ae",
    },
    {
        name: "Facebook",
        icon: Facebook,
        href: "https://facebook.com/oktravel.ae",
        color: "bg-blue-600 hover:bg-blue-700",
        followers: "@oktravel.ae",
    },
    {
        name: "YouTube",
        icon: Youtube,
        href: "https://youtube.com/@OKTravel_ae",
        color: "bg-red-600 hover:bg-red-700",
        followers: "@OKTravel_ae",
    },
    {
        name: "TikTok",
        icon: Music2,
        href: "https://tiktok.com/@oktravel_ae",
        color: "bg-black hover:bg-slate-800",
        followers: "@oktravel_ae",
    },
    {
        name: "X (Twitter)",
        icon: Twitter,
        href: "https://x.com/OKTravel_ae",
        color: "bg-slate-800 hover:bg-slate-900",
        followers: "@OKTravel_ae",
    },
];


export default function SocialSidebar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1"
        >
            {socialLinks.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative flex items-center gap-3 ${social.color} text-white transition-all duration-300 rounded-l-xl overflow-hidden`}
                    initial={{ x: 0 }}
                    animate={{
                        x: hoveredIndex === index ? 0 : 0,
                    }}
                    whileHover={{ x: -5 }}
                >
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center">
                        <social.icon size={22} />
                    </div>

                    {/* Expanded Label */}
                    <AnimatePresence>
                        {hoveredIndex === index && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="flex flex-col pr-4 whitespace-nowrap overflow-hidden"
                            >
                                <span className="text-sm font-semibold">{social.name}</span>
                                <span className="text-xs text-white/80">{social.followers}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.a>
            ))}

            {/* Decorative Badge */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 whitespace-nowrap hidden lg:block"
            >
                💬 Connect with us!
            </motion.div>
        </motion.div>
    );
}
