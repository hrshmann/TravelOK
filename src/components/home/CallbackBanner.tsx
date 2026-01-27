// src/components/home/CallbackBanner.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Clock, CheckCircle, Loader2 } from "lucide-react";

const countryCodes = [
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+966", country: "Saudi", flag: "🇸🇦" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
];

export default function CallbackBanner() {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber.trim()) return;

        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                setIsOpen(false);
                setStatus("idle");
                setPhoneNumber("");
            }, 3000);
        }, 1500);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all group"
            >
                <div className="relative">
                    <Phone size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <span className="font-semibold">Get a Callback</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    ~2 min
                </span>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => status === "idle" && setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white relative">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                            <Phone size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Request a Callback</h3>
                                            <p className="text-orange-100 flex items-center gap-2 mt-1">
                                                <Clock size={14} />
                                                We&apos;ll call you within 2 minutes
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    {status === "success" ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle size={40} className="text-green-500" />
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">
                                                We&apos;re Calling You!
                                            </h4>
                                            <p className="text-slate-600">
                                                Please keep your phone ready. Our travel expert will call you at{" "}
                                                <span className="font-semibold">
                                                    {selectedCode.code} {phoneNumber}
                                                </span>
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Your Phone Number
                                            </label>

                                            <div className="flex gap-2 mb-4">
                                                {/* Country Code Selector */}
                                                <select
                                                    value={selectedCode.code}
                                                    onChange={(e) => {
                                                        const found = countryCodes.find(
                                                            (c) => c.code === e.target.value
                                                        );
                                                        if (found) setSelectedCode(found);
                                                    }}
                                                    className="w-32 px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-slate-50"
                                                >
                                                    {countryCodes.map((c) => (
                                                        <option key={c.code} value={c.code}>
                                                            {c.flag} {c.code}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Phone Input */}
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder="Enter your number"
                                                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                                    required
                                                />
                                            </div>

                                            {/* Benefits */}
                                            <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                                <p className="text-sm font-medium text-slate-700 mb-2">
                                                    What you&apos;ll get:
                                                </p>
                                                <ul className="space-y-2 text-sm text-slate-600">
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle size={14} className="text-green-500" />
                                                        Personalized travel recommendations
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle size={14} className="text-green-500" />
                                                        Exclusive deals not listed online
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle size={14} className="text-green-500" />
                                                        Free trip planning assistance
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === "loading" ? (
                                                    <>
                                                        <Loader2 size={20} className="animate-spin" />
                                                        Connecting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Phone size={20} />
                                                        Call Me Now
                                                    </>
                                                )}
                                            </button>

                                            <p className="text-xs text-slate-500 text-center mt-4">
                                                By requesting a callback, you agree to our{" "}
                                                <a href="/privacy" className="text-orange-600 hover:underline">
                                                    Privacy Policy
                                                </a>
                                            </p>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
