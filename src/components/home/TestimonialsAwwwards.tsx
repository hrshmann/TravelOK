// src/components/home/TestimonialsAwwwards.tsx
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "Travel Blogger",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        rating: 5,
        text: "OK Travels transformed our honeymoon into an unforgettable adventure. Every detail was perfectly planned, from the overwater villa in Maldives to the private dinners on the beach. They truly understand luxury travel.",
        destination: "Maldives",
        tripImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
    },
    {
        id: 2,
        name: "James Chen",
        role: "CEO, Tech Startup",
        location: "Singapore",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        rating: 5,
        text: "As someone who values time and efficiency, I was impressed by how seamlessly they handled our corporate retreat. 50 executives, zero issues. Their attention to detail is remarkable.",
        destination: "Dubai",
        tripImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "Family Traveler",
        location: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
        rating: 5,
        text: "Traveling with three kids can be chaotic, but OK Travels made it absolutely magical. They thought of everything - kid-friendly activities, family suites, and even surprise birthday cake for my daughter!",
        destination: "Thailand",
        tripImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600",
    },
];

export default function TestimonialsAwwwards() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="relative py-32 bg-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber-100 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="order-2 lg:order-1">
                        {/* Section Header */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4"
                        >
                            Testimonials
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-12"
                            style={{ fontFamily: "var(--font-sora)" }}
                        >
                            What our travelers
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                                say about us
                            </span>
                        </motion.h2>

                        {/* Testimonial Content */}
                        <div className="relative min-h-[300px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Quote Icon */}
                                    <Quote size={48} className="text-orange-500/20 mb-6" />

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                                            <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>

                                    {/* Text */}
                                    <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8">
                                        "{activeTestimonial.text}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                                            <Image
                                                src={activeTestimonial.image}
                                                alt={activeTestimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900">
                                                {activeTestimonial.name}
                                            </h4>
                                            <p className="text-slate-500 text-sm">{activeTestimonial.role}</p>
                                            <p className="text-orange-500 text-sm">{activeTestimonial.location}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-4 mt-8">
                            <button
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                            >
                                <ChevronLeft size={20} className="text-slate-600" />
                            </button>
                            <button
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                            >
                                <ChevronRight size={20} className="text-slate-600" />
                            </button>
                            <div className="ml-4 text-slate-400">
                                <span className="text-slate-900 font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                                <span className="mx-2">/</span>
                                <span>{String(testimonials.length).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative aspect-[4/5] max-w-lg mx-auto lg:ml-auto">
                            {/* Main Image */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative h-full rounded-3xl overflow-hidden shadow-2xl"
                                >
                                    <Image
                                        src={activeTestimonial.tripImage}
                                        alt={activeTestimonial.destination}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                                    {/* Destination Tag */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white/70 text-sm mb-1">Traveled to</p>
                                        <p className="text-3xl font-bold text-white">
                                            {activeTestimonial.destination}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -left-8 top-8 bg-white p-4 rounded-2xl shadow-xl hidden lg:block"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                        <Star size={24} className="text-white fill-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">4.9</p>
                                        <p className="text-slate-500 text-sm">2,340 reviews</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Progress Dots */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? 'w-8 bg-orange-500'
                                            : 'bg-slate-300 hover:bg-slate-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
