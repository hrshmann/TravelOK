// src/components/home/PartnersMarquee.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
    { name: "Emirates", image: "https://images.unsplash.com/photo-1540339832862-474599807836?w=200" },
    { name: "Etihad", image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=200" },
    { name: "Qatar Airways", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=200" },
    { name: "Marriott", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200" },
    { name: "Hilton", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200" },
    { name: "Booking.com", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=200" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export default function PartnersMarquee() {
    return (
        <section className="py-16 relative overflow-hidden">
            {/* Premium Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920"
                    alt="Luxury hotel"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Our Trusted Partners
                    </h3>
                    <p className="text-white/60">
                        We work with the world&apos;s leading airlines and hotels
                    </p>
                </div>

                {/* Partners Grid with Images */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-24 rounded-xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={partner.image}
                                alt={partner.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-bold text-sm px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    {partner.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-10">
                    {[
                        { number: "200+", label: "Partner Hotels" },
                        { number: "50+", label: "Airlines" },
                        { number: "180+", label: "Countries" },
                        { number: "24/7", label: "Support" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-2xl font-bold text-white">{stat.number}</div>
                            <div className="text-xs text-white/60">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
