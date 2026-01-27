// src/components/visa/VisaCards.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, Clock, CheckCircle, ArrowRight, Sparkles, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisaCard {
    title: string;
    duration: string;
    price: string;
    processingTime: string;
    features: string[];
    popular?: boolean;
    href: string;
    image: string;
}

const visaCards: VisaCard[] = [
    {
        title: "UAE Tourist Visa",
        duration: "30 Days",
        price: "AED 350",
        processingTime: "2-3 Working Days",
        features: ["Single Entry", "Valid for 60 days", "Fast Processing"],
        href: "/visa?type=uae-30",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
    },
    {
        title: "UAE Tourist Visa",
        duration: "60 Days",
        price: "AED 650",
        processingTime: "2-3 Working Days",
        features: ["Single Entry", "Valid for 90 days", "Airport Pickup"],
        popular: true,
        href: "/visa?type=uae-60",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400",
    },
    {
        title: "UAE Tourist Visa",
        duration: "90 Days",
        price: "AED 1200",
        processingTime: "3-5 Working Days",
        features: ["Multiple Entry", "Valid for 180 days", "Premium Support"],
        href: "/visa?type=uae-90",
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400",
    },
    {
        title: "Visa Change",
        duration: "Inside UAE",
        price: "AED 900",
        processingTime: "Same Day",
        features: ["No exit required", "All nationalities", "Express Service"],
        href: "/visa?type=change",
        image: "https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=400",
    },
];

export default function VisaCards() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Premium Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920"
                    alt="UAE skyline"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-600 text-white text-sm font-semibold rounded-full mb-4 shadow-lg">
                        <Shield size={16} />
                        Trusted by 10,000+ Travelers
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        UAE Visa Services
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Get your UAE visa processed quickly with our hassle-free service.
                        We handle all the paperwork for you.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visaCards.map((card, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative bg-white rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden",
                                card.popular
                                    ? "ring-2 ring-orange-500 shadow-xl shadow-orange-500/20"
                                    : "shadow-lg hover:shadow-orange-500/10"
                            )}
                        >
                            {/* Card Image Header */}
                            <div className="relative h-32 overflow-hidden">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                {/* Popular Badge */}
                                {card.popular && (
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                            <Sparkles size={12} />
                                            BEST VALUE
                                        </div>
                                    </div>
                                )}

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 left-3">
                                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                                        {card.duration}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {card.title}
                                </h3>

                                {/* Price */}
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-3xl font-bold text-orange-600">
                                        {card.price.split(" ")[1]}
                                    </span>
                                    <span className="text-slate-500">
                                        {card.price.split(" ")[0]}
                                    </span>
                                </div>

                                {/* Processing Time */}
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 bg-slate-50 px-3 py-2 rounded-lg">
                                    <Clock size={16} className="text-orange-500" />
                                    <span>{card.processingTime}</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {card.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2 text-sm text-slate-600"
                                        >
                                            <CheckCircle
                                                size={16}
                                                className="text-green-500 flex-shrink-0"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link
                                    href={card.href}
                                    className={cn(
                                        "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all",
                                        card.popular
                                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/30"
                                            : "bg-slate-900 text-white hover:bg-orange-600"
                                    )}
                                >
                                    Apply Now
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                        <Globe size={24} className="text-orange-600" />
                        <p className="text-slate-700">
                            Need a visa for other countries? We process <span className="font-bold">worldwide visas!</span>
                        </p>
                        <Link
                            href="/visa"
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            Explore
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
