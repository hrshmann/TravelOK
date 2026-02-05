// src/components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const quickLinks = [
    { label: "Holiday Packages", href: "/holidays" },
    { label: "Flight Booking", href: "/flights" },
    { label: "Visa Services", href: "/visa" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const destinations = [
    { label: "Dubai", href: "/holidays/uae" },
    { label: "Maldives", href: "/holidays/maldives" },
    { label: "Thailand", href: "/holidays/thailand" },
    { label: "Bali", href: "/holidays/indonesia" },
    { label: "Singapore", href: "/holidays/singapore" },
];

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            {/* Main Footer */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                            <Image
                                src="/logo.png"
                                alt="OK Travel & Tourism - Every Journey is OK"
                                width={160}
                                height={55}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">
                            Crafting unforgettable journeys for the modern explorer. Experience the world with unmatched luxury and comfort.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                                >
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-8 text-white" style={{ fontFamily: 'var(--font-sora)' }}>Explore</h4>
                            <ul className="space-y-4">
                                {quickLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-orange-400 transition-colors text-base block hover:translate-x-1 duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Top Destinations */}
                        <div>
                            <h4 className="text-lg font-bold mb-8 text-white" style={{ fontFamily: 'var(--font-sora)' }}>Destinations</h4>
                            <ul className="space-y-4">
                                {destinations.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-orange-400 transition-colors text-base block hover:translate-x-1 duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-8 text-white" style={{ fontFamily: 'var(--font-sora)' }}>Contact</h4>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-3 group">
                                    <MapPin size={20} className="text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-slate-400 text-base leading-relaxed">
                                        Business Bay, Dubai<br />United Arab Emirates
                                    </span>
                                </li>
                                <li>
                                    <a
                                        href="tel:+971585255484"
                                        className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-base group"
                                    >
                                        <Phone size={20} className="text-orange-500 group-hover:scale-110 transition-transform" />
                                        +971 58 525 5484
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:info@oktravels.com"
                                        className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-base group"
                                    >
                                        <Mail size={20} className="text-orange-500 group-hover:scale-110 transition-transform" />
                                        info@oktravels.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Big Text Footnote */}
                <div className="border-t border-white/5 pt-12 pb-8">
                    <p className="text-[8vw] md:text-[10vw] leading-none font-bold text-center select-none pointer-events-none bg-gradient-to-r from-orange-500/20 via-orange-400/15 to-blue-900/20 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-sora)' }}>
                        OK TRAVEL & TOURISM
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} OK Travel & Tourism. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <Link href="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/sitemap" className="text-slate-500 hover:text-white text-sm transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
