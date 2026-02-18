// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Plane, Package, MapPin, Globe, FileText, Inbox,
    LayoutGrid, TrendingUp, ArrowUpRight, Clock, CheckCircle2,
} from "lucide-react";
import { getFlights, getActiveFlights, type Flight } from "@/data/flights";
import { getPackages } from "@/data/packages";
import { getTours } from "@/data/tours";
import { getVisaData } from "@/data/visa";
import { getBookings, getNewBookingsCount, type Booking } from "@/data/bookings";
import type { HolidayPackage } from "@/types/package";
import type { Tour } from "@/data/tours";
import type { VisaCountry } from "@/data/visa";

export default function AdminDashboard() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [packages, setPackages] = useState<HolidayPackage[]>([]);
    const [tours, setTours] = useState<Tour[]>([]);
    const [visaData, setVisaData] = useState<VisaCountry[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [newBookings, setNewBookings] = useState(0);

    useEffect(() => {
        setFlights(getFlights());
        setPackages(getPackages());
        setTours(getTours());
        setVisaData(getVisaData());
        const b = getBookings();
        setBookings(b);
        setNewBookings(getNewBookingsCount());
    }, []);

    const stats = [
        {
            label: "Enquiries",
            value: bookings.length,
            sub: `${newBookings} new`,
            subColor: "text-amber-400",
            icon: Inbox,
            gradient: "from-amber-500 to-orange-500",
            glow: "shadow-amber-500/20",
            href: "/admin/bookings",
        },
        {
            label: "Flights",
            value: flights.length,
            sub: `${getActiveFlights().length} active`,
            subColor: "text-blue-400",
            icon: Plane,
            gradient: "from-blue-500 to-cyan-500",
            glow: "shadow-blue-500/20",
            href: "/admin/flights",
        },
        {
            label: "Packages",
            value: packages.length,
            sub: `${packages.filter(p => p.isFeatured).length} featured`,
            subColor: "text-emerald-400",
            icon: Package,
            gradient: "from-emerald-500 to-green-500",
            glow: "shadow-emerald-500/20",
            href: "/admin/packages",
        },
        {
            label: "Tours",
            value: tours.length,
            sub: `${tours.filter(t => t.isActive !== false).length} active`,
            subColor: "text-orange-400",
            icon: MapPin,
            gradient: "from-orange-500 to-red-500",
            glow: "shadow-orange-500/20",
            href: "/admin/tours",
        },
        {
            label: "Visa Countries",
            value: visaData.length,
            sub: `${visaData.filter(v => v.isActive !== false).length} active`,
            subColor: "text-purple-400",
            icon: Globe,
            gradient: "from-purple-500 to-pink-500",
            glow: "shadow-purple-500/20",
            href: "/admin/visa",
        },
    ];

    const quickActions = [
        { label: "Bookings", desc: "View enquiries", href: "/admin/bookings", icon: Inbox, gradient: "from-amber-500 to-orange-500" },
        { label: "Flights", desc: "Manage flights", href: "/admin/flights", icon: Plane, gradient: "from-blue-500 to-cyan-500" },
        { label: "Packages", desc: "Holiday packages", href: "/admin/packages", icon: Package, gradient: "from-emerald-500 to-green-500" },
        { label: "Tours", desc: "UAE tours", href: "/admin/tours", icon: MapPin, gradient: "from-orange-500 to-red-500" },
        { label: "Visa", desc: "Visa services", href: "/admin/visa", icon: FileText, gradient: "from-purple-500 to-pink-500" },
        { label: "Content", desc: "Featured items", href: "/admin/content", icon: LayoutGrid, gradient: "from-teal-500 to-cyan-500" },
    ];

    const recentBookings = bookings.slice(-5).reverse();

    const statusConfig = {
        new: { label: "New", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
        "in-progress": { label: "In Progress", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
        resolved: { label: "Resolved", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
    };

    return (
        <div className="space-y-7">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
                    <p className="text-white/35 text-sm mt-0.5">Welcome back, Misbah. Here's what's happening.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-white/50 text-xs font-medium">Live</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href}
                        className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] rounded-2xl p-5 transition-all duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-9 h-9 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg ${stat.glow}`}>
                                <stat.icon size={16} className="text-white" />
                            </div>
                            <ArrowUpRight size={14} className="text-white/15 group-hover:text-white/40 transition-colors" />
                        </div>
                        <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                        <p className="text-xs text-white/30 mt-0.5">{stat.label}</p>
                        <p className={`text-xs font-semibold mt-2 ${stat.subColor}`}>{stat.sub}</p>
                    </Link>
                ))}
            </div>

            {/* Bottom grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Quick Actions */}
                <div className="lg:col-span-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={16} className="text-amber-400" />
                        <h2 className="text-sm font-semibold text-white">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action) => (
                            <Link key={action.href} href={action.href}
                                className="flex flex-col items-center gap-2 p-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-white/[0.1] rounded-xl transition-all group text-center">
                                <div className={`w-9 h-9 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                                    <action.icon size={15} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-white/70 text-xs font-semibold group-hover:text-white transition-colors">{action.label}</p>
                                    <p className="text-white/25 text-[10px]">{action.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Enquiries */}
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-amber-400" />
                            <h2 className="text-sm font-semibold text-white">Recent Enquiries</h2>
                        </div>
                        <Link href="/admin/bookings" className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors font-medium">
                            View all →
                        </Link>
                    </div>

                    {recentBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-12 h-12 bg-white/[0.04] rounded-2xl flex items-center justify-center mb-3">
                                <Inbox size={20} className="text-white/20" />
                            </div>
                            <p className="text-white/30 text-sm">No enquiries yet</p>
                            <p className="text-white/15 text-xs mt-1">They'll appear here when customers submit forms</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentBookings.map((booking) => {
                                const cfg = statusConfig[booking.status] || statusConfig.new;
                                return (
                                    <div key={booking.id} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-all">
                                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-amber-400 text-xs font-bold">{booking.name?.charAt(0)?.toUpperCase() || "?"}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white/80 text-sm font-medium truncate">{booking.name || "Anonymous"}</p>
                                            <p className="text-white/30 text-xs truncate">{booking.packageName}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${cfg.color}`}>
                                                {cfg.label}
                                            </span>
                                            {booking.status === "resolved" && <CheckCircle2 size={13} className="text-emerald-400" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
