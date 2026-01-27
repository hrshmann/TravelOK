// src/components/home/TripPlannerModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    X,
    Sparkles,
    MapPin,
    Calendar,
    DollarSign,
    Heart,
    Plane,
    ChevronRight,
    ChevronLeft,
    Check,
    Users,
    Star,
} from "lucide-react";

interface TripPlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const destinations = [
    { id: "uae", name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400", emoji: "🇦🇪" },
    { id: "maldives", name: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400", emoji: "🇲🇻" },
    { id: "thailand", name: "Thailand", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400", emoji: "🇹🇭" },
    { id: "bali", name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", emoji: "🇮🇩" },
    { id: "singapore", name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400", emoji: "🇸🇬" },
    { id: "egypt", name: "Egypt", image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400", emoji: "🇪🇬" },
];

const travelStyles = [
    { id: "adventure", name: "Adventure", icon: "🏔️", desc: "Thrilling activities & exploration" },
    { id: "relaxation", name: "Relaxation", icon: "🏖️", desc: "Beaches, spas & wellness" },
    { id: "cultural", name: "Cultural", icon: "🏛️", desc: "History, art & local traditions" },
    { id: "romantic", name: "Romantic", icon: "💕", desc: "Couples getaways & honeymoons" },
    { id: "family", name: "Family", icon: "👨‍👩‍👧‍👦", desc: "Kid-friendly activities" },
    { id: "luxury", name: "Luxury", icon: "👑", desc: "Premium experiences" },
];

const budgetRanges = [
    { id: "budget", label: "$500 - $1,000", value: 750 },
    { id: "mid", label: "$1,000 - $2,000", value: 1500 },
    { id: "premium", label: "$2,000 - $3,500", value: 2750 },
    { id: "luxury", label: "$3,500+", value: 4000 },
];

export default function TripPlannerModal({ isOpen, onClose }: TripPlannerModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        destination: "",
        dates: { start: "", end: "" },
        travelers: 2,
        budget: "",
        travelStyle: [] as string[],
    });

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const toggleTravelStyle = (id: string) => {
        setFormData((prev) => ({
            ...prev,
            travelStyle: prev.travelStyle.includes(id)
                ? prev.travelStyle.filter((s) => s !== id)
                : [...prev.travelStyle, id],
        }));
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return formData.destination !== "";
            case 2:
                return formData.dates.start && formData.dates.end;
            case 3:
                return formData.budget !== "";
            case 4:
                return formData.travelStyle.length > 0;
            default:
                return true;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-6 text-white relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">AI Trip Planner</h2>
                                        <p className="text-white/80 text-sm">Let us craft your perfect vacation</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex gap-2">
                                    {[...Array(totalSteps)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 h-1.5 rounded-full transition-all ${i < step ? "bg-white" : "bg-white/30"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                <AnimatePresence mode="wait">
                                    {/* Step 1: Destination */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                <MapPin size={20} className="text-blue-600" />
                                                Where do you want to go?
                                            </h3>
                                            <p className="text-slate-500 mb-6">Select your dream destination</p>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {destinations.map((dest) => (
                                                    <button
                                                        key={dest.id}
                                                        onClick={() => setFormData({ ...formData, destination: dest.id })}
                                                        className={`relative h-32 rounded-xl overflow-hidden group transition-all ${formData.destination === dest.id
                                                                ? "ring-4 ring-blue-500 scale-105"
                                                                : "hover:scale-105"
                                                            }`}
                                                    >
                                                        <Image
                                                            src={dest.image}
                                                            alt={dest.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                        <div className="absolute bottom-3 left-3 right-3">
                                                            <span className="text-2xl mb-1 block">{dest.emoji}</span>
                                                            <span className="text-white font-semibold">{dest.name}</span>
                                                        </div>
                                                        {formData.destination === dest.id && (
                                                            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <Check size={14} className="text-white" />
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Dates & Travelers */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                <Calendar size={20} className="text-blue-600" />
                                                When are you traveling?
                                            </h3>
                                            <p className="text-slate-500 mb-6">Select your travel dates</p>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                                        Departure Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={formData.dates.start}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                dates: { ...formData.dates, start: e.target.value },
                                                            })
                                                        }
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                                        Return Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={formData.dates.end}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                dates: { ...formData.dates, end: e.target.value },
                                                            })
                                                        }
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                                    <Users size={16} />
                                                    Number of Travelers
                                                </label>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                travelers: Math.max(1, formData.travelers - 1),
                                                            })
                                                        }
                                                        className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xl font-bold transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-3xl font-bold text-slate-900 w-12 text-center">
                                                        {formData.travelers}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                travelers: Math.min(10, formData.travelers + 1),
                                                            })
                                                        }
                                                        className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xl font-bold transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Budget */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                <DollarSign size={20} className="text-blue-600" />
                                                What&apos;s your budget?
                                            </h3>
                                            <p className="text-slate-500 mb-6">Per person, including flights & accommodation</p>

                                            <div className="grid grid-cols-2 gap-4">
                                                {budgetRanges.map((range) => (
                                                    <button
                                                        key={range.id}
                                                        onClick={() => setFormData({ ...formData, budget: range.id })}
                                                        className={`p-4 rounded-xl border-2 transition-all ${formData.budget === range.id
                                                                ? "border-blue-500 bg-blue-50"
                                                                : "border-slate-200 hover:border-blue-300"
                                                            }`}
                                                    >
                                                        <span className="text-lg font-bold text-slate-900">{range.label}</span>
                                                        {formData.budget === range.id && (
                                                            <Check size={18} className="text-blue-600 ml-2 inline" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Travel Style */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                <Heart size={20} className="text-blue-600" />
                                                What&apos;s your travel style?
                                            </h3>
                                            <p className="text-slate-500 mb-6">Select all that apply</p>

                                            <div className="grid grid-cols-2 gap-4">
                                                {travelStyles.map((style) => (
                                                    <button
                                                        key={style.id}
                                                        onClick={() => toggleTravelStyle(style.id)}
                                                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.travelStyle.includes(style.id)
                                                                ? "border-blue-500 bg-blue-50"
                                                                : "border-slate-200 hover:border-blue-300"
                                                            }`}
                                                    >
                                                        <span className="text-2xl mb-2 block">{style.icon}</span>
                                                        <span className="font-bold text-slate-900 block">{style.name}</span>
                                                        <span className="text-xs text-slate-500">{style.desc}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t bg-slate-50 flex items-center justify-between">
                                <button
                                    onClick={handleBack}
                                    disabled={step === 1}
                                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                    Back
                                </button>

                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    Step {step} of {totalSteps}
                                </div>

                                {step < totalSteps ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-colors disabled:cursor-not-allowed"
                                    >
                                        Continue
                                        <ChevronRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            // Submit and redirect to results
                                            onClose();
                                            alert("Finding your perfect packages! Redirecting to results...");
                                        }}
                                        disabled={!canProceed()}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-300 text-white font-semibold rounded-xl transition-colors disabled:cursor-not-allowed"
                                    >
                                        <Sparkles size={18} />
                                        Find My Trip
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
