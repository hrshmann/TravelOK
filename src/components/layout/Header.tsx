// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Globe, ChevronDown, Shield, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import TrustBadges from "@/components/ui/TrustBadges";
import CurrencySelector from "@/components/ui/CurrencySelector";

const navLinks = [
    { label: "Home", href: "/" },
    {
        label: "Holidays",
        href: "/holidays",
        children: [
            { label: "Dubai", href: "/holidays/uae" },
            { label: "Maldives", href: "/holidays/maldives" },
            { label: "Thailand", href: "/holidays/thailand" },
            { label: "Bali", href: "/holidays/indonesia" },
        ],
    },
    { label: "Flights", href: "/flights" },
    {
        label: "Visa Services",
        href: "/visa",
        children: [
            { label: "UAE Visa", href: "/visa?type=uae" },
            { label: "Schengen Visa", href: "/visa?type=schengen" },
            { label: "UK Visa", href: "/visa?type=uk" },
            { label: "USA Visa", href: "/visa?type=usa" },
            { label: "Visa Change", href: "/visa?type=change" },
        ],
    },
    { label: "UAE Tours", href: "/uae-tours" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerClasses = cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        isScrolled
            ? "bg-slate-900/80 backdrop-blur-xl border-white/10 py-3"
            : "bg-transparent border-transparent py-6"
    );

    const navLinkClasses = (active: boolean) => cn(
        "relative px-4 py-2 text-sm font-medium transition-all duration-300",
        "before:absolute before:inset-0 before:bg-white/10 before:rounded-full before:scale-95 before:opacity-0 before:transition-all before:duration-300 hover:before:scale-100 hover:before:opacity-100",
        isScrolled ? "text-white/90 hover:text-white" : "text-white hover:text-white/90"
    );

    return (
        <header className={headerClasses}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3 group z-50">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-500">
                            <Globe className="text-white relative z-10" size={20} />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                        <span className={cn(
                            "text-2xl font-bold tracking-tight",
                            isScrolled ? "text-white" : "text-white"
                        )} style={{ fontFamily: 'var(--font-sora)' }}>
                            OK<span className="text-orange-400">Travels</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered Floating Pill */}
                    <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mx-auto absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative group">
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                        "text-white/80 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {link.label}
                                    {link.children && <ChevronDown size={12} className="opacity-50 group-hover:opacity-100" />}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.children && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 min-w-[220px] shadow-2xl shadow-black/50 overflow-hidden">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-6 z-50">
                        <CurrencySelector variant="header" />
                        <Link
                            href="/contact"
                            className="group relative px-6 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-full overflow-hidden transition-transform hover:scale-105"
                        >
                            <span className="relative z-10 group-hover:text-black transition-colors">Book Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Let's Go!</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white z-50 relative"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 flex flex-col justify-center px-8",
                isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}>
                <nav className="flex flex-col gap-6">
                    {navLinks.map((link, idx) => (
                        <div key={link.label} className={cn(
                            "transition-all duration-500",
                            isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                        )} style={{ transitionDelay: `${idx * 100}ms` }}>
                            <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-bold text-white hover:text-orange-400 transition-colors"
                                style={{ fontFamily: 'var(--font-sora)' }}
                            >
                                {link.label}
                            </Link>
                            {link.children && (
                                <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-white/10">
                                    {link.children.map(child => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-lg text-white/60 hover:text-white transition-colors"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className={cn(
                        "mt-8 transition-all duration-500 delay-500",
                        isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    )}>
                        <Link
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block w-full py-4 bg-white text-slate-900 text-center font-bold rounded-full"
                        >
                            Start Planning
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

