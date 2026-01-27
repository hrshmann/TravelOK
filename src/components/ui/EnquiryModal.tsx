// src/components/ui/EnquiryModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageName?: string;
    destination?: string;
}

export default function EnquiryModal({
    isOpen,
    onClose,
    packageName,
    destination,
}: EnquiryModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setFormData({ name: "", email: "", phone: "", message: "" });
                setIsSuccess(false);
            }, 300);
        }
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Auto close after success
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={cn(
                    "fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-300",
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div
                    className={cn(
                        "bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300",
                        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl p-6 text-white">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-1">Get a Free Quote</h2>
                        <p className="text-white/80">
                            {packageName || destination
                                ? `Enquiry for ${packageName || destination}`
                                : "Our travel experts will get back to you within 24 hours"}
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {isSuccess ? (
                            // Success State
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    Thank You!
                                </h3>
                                <p className="text-slate-600">
                                    Your enquiry has been submitted successfully. Our team will
                                    contact you shortly.
                                </p>
                            </div>
                        ) : (
                            // Form
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name *"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address *"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                    <Phone
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number *"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Message */}
                                <div className="relative">
                                    <MessageSquare
                                        size={18}
                                        className="absolute left-4 top-4 text-slate-400"
                                    />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your travel plans..."
                                        rows={4}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
                                        isSubmitting
                                            ? "opacity-70 cursor-not-allowed"
                                            : "hover:shadow-xl hover:-translate-y-0.5"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Submit Enquiry
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-slate-500">
                                    By submitting, you agree to our Terms of Service and Privacy
                                    Policy
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
