// src/app/visa/VisaPageContent.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    FileText,
    Clock,
    CheckCircle,
    Search,
    ArrowRight,
    Globe,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisaType {
    id: string;
    country: string;
    flag: string;
    types: {
        name: string;
        duration: string;
        price: string;
        processingTime: string;
        features: string[];
    }[];
}

const visaData: VisaType[] = [
    {
        id: "uae",
        country: "United Arab Emirates",
        flag: "🇦🇪",
        types: [
            {
                name: "Tourist Visa",
                duration: "30 Days",
                price: "AED 350",
                processingTime: "2-3 Working Days",
                features: ["Single Entry", "Valid for 60 days from issue"],
            },
            {
                name: "Tourist Visa",
                duration: "60 Days",
                price: "AED 650",
                processingTime: "2-3 Working Days",
                features: ["Single Entry", "Valid for 90 days from issue"],
            },
            {
                name: "Tourist Visa",
                duration: "90 Days",
                price: "AED 1200",
                processingTime: "3-5 Working Days",
                features: ["Multiple Entry", "Valid for 180 days from issue"],
            },
            {
                name: "Visa Change",
                duration: "Inside UAE",
                price: "AED 900",
                processingTime: "Same Day",
                features: ["No exit required", "All nationalities accepted"],
            },
        ],
    },
    {
        id: "schengen",
        country: "Schengen Countries",
        flag: "🇪🇺",
        types: [
            {
                name: "Tourist Visa",
                duration: "Short Stay",
                price: "AED 1500",
                processingTime: "15-20 Working Days",
                features: ["Up to 90 days", "26 European countries"],
            },
            {
                name: "Business Visa",
                duration: "Short Stay",
                price: "AED 2000",
                processingTime: "15-20 Working Days",
                features: ["Business meetings", "Conferences"],
            },
        ],
    },
    {
        id: "uk",
        country: "United Kingdom",
        flag: "🇬🇧",
        types: [
            {
                name: "Standard Visitor",
                duration: "6 Months",
                price: "AED 1200",
                processingTime: "15-20 Working Days",
                features: ["Multiple Entry", "Tourism & Business"],
            },
            {
                name: "Standard Visitor",
                duration: "2 Years",
                price: "AED 2500",
                processingTime: "15-20 Working Days",
                features: ["Multiple Entry", "Long validity"],
            },
        ],
    },
    {
        id: "usa",
        country: "United States",
        flag: "🇺🇸",
        types: [
            {
                name: "B1/B2 Visa",
                duration: "10 Years",
                price: "AED 1500",
                processingTime: "Interview Required",
                features: ["Multiple Entry", "Tourism & Business"],
            },
        ],
    },
];

export default function VisaPageContent() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(
        searchParams.get("type")?.split("-")[0] || null
    );

    const filteredVisa = visaData.filter((v) =>
        v.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
                        <Sparkles size={16} />
                        Fast & Hassle-Free
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Visa Services
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        Get your visa processed quickly with our professional service.
                        We handle 50+ countries worldwide.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search
                            size={20}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by country..."
                            className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-xl text-slate-800 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-blue-500/30"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 p-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Clock size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Fast Processing</h3>
                                <p className="text-sm text-slate-600">Same day for UAE visas</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <ShieldCheck size={24} className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">99% Success Rate</h3>
                                <p className="text-sm text-slate-600">Trusted by thousands</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Globe size={24} className="text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">50+ Countries</h3>
                                <p className="text-sm text-slate-600">Worldwide coverage</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visa Cards */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredVisa.map((country) => (
                        <div key={country.id} className="mb-12">
                            {/* Country Header */}
                            <button
                                onClick={() =>
                                    setSelectedCountry(
                                        selectedCountry === country.id ? null : country.id
                                    )
                                }
                                className="w-full flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all mb-4"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{country.flag}</span>
                                    <div className="text-left">
                                        <h2 className="text-xl font-bold text-slate-900">
                                            {country.country}
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            {country.types.length} visa types available
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight
                                    size={20}
                                    className={cn(
                                        "text-slate-400 transition-transform",
                                        selectedCountry === country.id && "rotate-90"
                                    )}
                                />
                            </button>

                            {/* Visa Types */}
                            <div
                                className={cn(
                                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden transition-all duration-500",
                                    selectedCountry === country.id
                                        ? "max-h-[1000px] opacity-100"
                                        : "max-h-0 opacity-0"
                                )}
                            >
                                {country.types.map((visa, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl p-6 border-2 border-slate-100 hover:border-blue-500 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <FileText size={20} className="text-blue-600" />
                                            <span className="font-semibold text-slate-900">
                                                {visa.name}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-600 mb-1">
                                            {visa.duration}
                                        </p>
                                        <p className="text-3xl font-bold text-slate-900 mb-4">
                                            {visa.price}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                                            <Clock size={14} />
                                            <span>{visa.processingTime}</span>
                                        </div>

                                        <ul className="space-y-2 mb-6">
                                            {visa.features.map((feature, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-2 text-sm text-slate-600"
                                                >
                                                    <CheckCircle
                                                        size={14}
                                                        className="text-green-500"
                                                    />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                                            Apply Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
