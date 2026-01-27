// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    MessageSquare,
    User,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const contactInfo = [
    {
        icon: Phone,
        title: "Call Us",
        details: ["+971 50 123 4567", "+971 4 123 4567"],
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Mail,
        title: "Email Us",
        details: ["hello@oktravels.ae", "support@oktravels.ae"],
        color: "bg-purple-100 text-purple-600",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        details: ["Al Karama, Dubai", "United Arab Emirates"],
        color: "bg-green-100 text-green-600",
    },
    {
        icon: Clock,
        title: "Working Hours",
        details: ["Mon - Sat: 9AM - 9PM", "Sunday: 10AM - 6PM"],
        color: "bg-amber-100 text-amber-600",
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset after success
        setTimeout(() => {
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
            setIsSuccess(false);
        }, 3000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                backgroundSize: '50px 50px'
                            }}
                        />
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/30">
                        <MessageSquare size={16} />
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Have questions about your next trip? Our travel experts are here
                        to help you 24/7.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 -mt-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                                            info.color
                                        )}
                                    >
                                        <info.icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {info.title}
                                    </h3>
                                    {info.details.map((detail, i) => (
                                        <p key={i} className="text-slate-600">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-slate-600 mb-8">
                                Fill out the form below and we&apos;ll get back to you within 24 hours.
                            </p>

                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-slate-600">
                                        Thank you for contacting us. We&apos;ll respond shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
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
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                placeholder="Phone Number"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </div>

                                        {/* Subject */}
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Subject *</option>
                                            <option value="holiday">Holiday Package Enquiry</option>
                                            <option value="visa">Visa Services</option>
                                            <option value="flight">Flight Booking</option>
                                            <option value="support">Customer Support</option>
                                            <option value="other">Other</option>
                                        </select>
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
                                            placeholder="Your Message *"
                                            required
                                            rows={5}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={cn(
                                            "w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2",
                                            isSubmitting
                                                ? "opacity-70 cursor-not-allowed"
                                                : "hover:shadow-xl hover:-translate-y-0.5"
                                        )}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Right: Map Placeholder */}
                        <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.5959428389437!2d55.29608507606907!3d25.24828377708458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sAl%20Karama%20-%20Dubai!5e0!3m2!1sen!2sae!4v1705923456789!5m2!1sen!2sae"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "400px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
