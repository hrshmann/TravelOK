// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Plane,
    Package,
    MapPin,
    Globe,
    FileText,
    Inbox,
    LayoutGrid,
} from "lucide-react";
import { getFlights, getActiveFlights, type Flight } from "@/data/flights";
import { getPackages } from "@/data/packages";
import { getTours } from "@/data/tours";
import { getVisaData } from "@/data/visa";
import { getBookings, getNewBookingsCount } from "@/data/bookings";
import type { HolidayPackage } from "@/types/package";
import type { Tour } from "@/data/tours";
import type { VisaCountry } from "@/data/visa";

export default function AdminDashboard() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [packages, setPackages] = useState<HolidayPackage[]>([]);
    const [tours, setTours] = useState<Tour[]>([]);
    const [visaData, setVisaData] = useState<VisaCountry[]>([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [newBookings, setNewBookings] = useState(0);

    useEffect(() => {
        setFlights(getFlights());
        setPackages(getPackages());
        setTours(getTours());
        setVisaData(getVisaData());
        setTotalBookings(getBookings().length);
        setNewBookings(getNewBookingsCount());
    }, []);

    const stats = [
        {
            label: "Bookings",
            value: totalBookings,
            active: newBookings,
            activeLabel: "new",
            icon: Inbox,
            color: "from-amber-500 to-orange-500",
            shadow: "shadow-amber-500/20",
            href: "/admin/bookings",
        },
        {
            label: "Flights",
            value: flights.length,
            active: getActiveFlights().length,
            activeLabel: "active",
            icon: Plane,
            color: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/20",
            href: "/admin/flights",
        },
        {
            label: "Packages",
            value: packages.length,
            active: packages.filter((p) => p.isFeatured).length,
            activeLabel: "featured",
            icon: Package,
            color: "from-emerald-500 to-green-500",
            shadow: "shadow-emerald-500/20",
            href: "/admin/packages",
        },
        {
            label: "Tours",
            value: tours.length,
            active: tours.filter((t) => t.isActive !== false).length,
            activeLabel: "active",
            icon: MapPin,
            color: "from-orange-500 to-red-500",
            shadow: "shadow-orange-500/20",
            href: "/admin/tours",
        },
        {
            label: "Visa Countries",
            value: visaData.length,
            active: visaData.filter((v) => v.isActive !== false).length,
            activeLabel: "active",
            icon: Globe,
            color: "from-purple-500 to-pink-500",
            shadow: "shadow-purple-500/20",
            href: "/admin/visa",
        },
    ];

    const quickActions = [
        { label: "View Bookings", desc: "Manage customer enquiries", href: "/admin/bookings", icon: Inbox, gradient: "from-amber-500 to-orange-500" },
        { label: "Manage Flights", desc: "Add, edit, or remove flights", href: "/admin/flights", icon: Plane, gradient: "from-blue-500 to-cyan-500" },
        { label: "Manage Packages", desc: "Holiday packages & pricing", href: "/admin/packages", icon: Package, gradient: "from-emerald-500 to-green-500" },
        { label: "Manage Tours", desc: "UAE tours & activities", href: "/admin/tours", icon: MapPin, gradient: "from-orange-500 to-red-500" },
        { label: "Manage Visas", desc: "Visa types & processing", href: "/admin/visa", icon: FileText, gradient: "from-purple-500 to-pink-500" },
        { label: "Content Control", desc: "Featured packages & sections", href: "/admin/content", icon: LayoutGrid, gradient: "from-teal-500 to-cyan-500" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-white/50 mt-1">Welcome to OK Travel Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-slate-900/80 border border-white/5 rounded-2xl p-5 hover:bg-slate-900 hover:border-white/10 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white/40 text-sm">{stat.label}</span>
                            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg ${stat.shadow}`}>
                                <stat.icon size={18} className="text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-emerald-400 text-xs mt-1">
                            {stat.active} {stat.activeLabel}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {quickActions.map((action) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                        >
                            <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center`}>
                                <action.icon size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white font-medium">{action.label}</p>
                                <p className="text-white/40 text-sm">{action.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
