// src/app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Plane,
    LayoutDashboard,
    Menu,
    X,
    ChevronRight,
    Globe,
    Package,
    MapPin,
    FileText,
    Inbox,
    LayoutGrid,
    LogOut,
    Bell,
    User,
} from "lucide-react";
import { isAuthenticated, logout } from "@/data/auth";
import { getNewBookingsCount } from "@/data/bookings";

const navGroups = [
    {
        label: "Overview",
        items: [
            { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { label: "Bookings", href: "/admin/bookings", icon: Inbox, badge: true },
        ],
    },
    {
        label: "Content",
        items: [
            { label: "Flights", href: "/admin/flights", icon: Plane },
            { label: "Packages", href: "/admin/packages", icon: Package },
            { label: "Tours", href: "/admin/tours", icon: MapPin },
            { label: "Visa", href: "/admin/visa", icon: FileText },
        ],
    },
    {
        label: "Settings",
        items: [
            { label: "Content Control", href: "/admin/content", icon: LayoutGrid },
        ],
    },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [newBookings, setNewBookings] = useState(0);

    useEffect(() => {
        if (pathname === "/admin/login") { setAuthChecked(true); return; }
        if (!isAuthenticated()) { router.replace("/admin/login"); }
        else { setAuthChecked(true); setNewBookings(getNewBookingsCount()); }
    }, [pathname, router]);

    const handleLogout = () => { logout(); router.push("/admin/login"); };

    if (!authChecked && pathname !== "/admin/login") {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                    <p className="text-white/30 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (pathname === "/admin/login") return <>{children}</>;

    const currentPage = navGroups.flatMap(g => g.items).find(n => n.href === pathname);

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#0f0f17] border-r border-white/[0.06] transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06] flex-shrink-0">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                            <Plane size={15} className="text-white" />
                        </div>
                        <div>
                            <span className="text-white font-bold text-sm tracking-tight">OK Travel</span>
                            <span className="block text-[9px] text-amber-400/60 font-semibold tracking-widest uppercase -mt-0.5">Admin Panel</span>
                        </div>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="px-3 mb-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.15em]">{group.label}</p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
                                                ${isActive
                                                    ? "bg-gradient-to-r from-amber-500/15 to-transparent text-amber-400 border border-amber-500/15"
                                                    : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-400 rounded-full" />}
                                            <item.icon size={16} className={isActive ? "text-amber-400" : "text-white/25 group-hover:text-white/50"} />
                                            <span className="flex-1">{item.label}</span>
                                            {item.badge && newBookings > 0 && (
                                                <span className="w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                    {newBookings > 9 ? "9+" : newBookings}
                                                </span>
                                            )}
                                            {isActive && <ChevronRight size={12} className="text-amber-400/40" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User Footer */}
                <div className="flex-shrink-0 p-3 border-t border-white/[0.06] space-y-1">
                    <Link href="/" target="_blank"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-white/70 hover:bg-white/[0.04] transition-all">
                        <Globe size={15} />
                        <span>View Live Site</span>
                    </Link>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                            <User size={13} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white/80 text-xs font-semibold truncate">Misbah</p>
                            <p className="text-white/30 text-[10px] truncate">Administrator</p>
                        </div>
                        <button onClick={handleLogout} title="Sign Out"
                            className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0">
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-[#0f0f17]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-4 lg:px-6 sticky top-0 z-30 gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/40 hover:text-white transition-colors">
                        <Menu size={20} />
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm flex-1">
                        <Link href="/admin" className="text-white/30 hover:text-white/60 transition-colors font-medium">Admin</Link>
                        {pathname !== "/admin" && (
                            <>
                                <ChevronRight size={14} className="text-white/20" />
                                <span className="text-white/70 font-semibold">{currentPage?.label || "Page"}</span>
                            </>
                        )}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        <Link href="/admin/bookings" className="relative w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/80 transition-all">
                            <Bell size={16} />
                            {newBookings > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                    {newBookings > 9 ? "9+" : newBookings}
                                </span>
                            )}
                        </Link>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <User size={15} className="text-white" />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 lg:p-7 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
