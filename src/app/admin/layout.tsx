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
    Settings,
    Package,
    MapPin,
    FileText,
    Inbox,
    LayoutGrid,
    LogOut,
} from "lucide-react";
import { isAuthenticated, logout } from "@/data/auth";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Bookings", href: "/admin/bookings", icon: Inbox },
    { label: "Flight Management", href: "/admin/flights", icon: Plane },
    { label: "Package Management", href: "/admin/packages", icon: Package },
    { label: "Tour Management", href: "/admin/tours", icon: MapPin },
    { label: "Visa Management", href: "/admin/visa", icon: FileText },
    { label: "Content Control", href: "/admin/content", icon: LayoutGrid },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === "/admin/login") {
            setAuthChecked(true);
            return;
        }
        if (!isAuthenticated()) {
            router.replace("/admin/login");
        } else {
            setAuthChecked(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    // Show nothing while checking auth (prevents flash)
    if (!authChecked && pathname !== "/admin/login") {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            </div>
        );
    }

    // Login page gets no sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/5 transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Settings size={18} className="text-white" />
                        </div>
                        <div>
                            <span className="text-white font-bold text-lg tracking-tight">OK Admin</span>
                            <span className="block text-[10px] text-amber-400/70 font-medium -mt-0.5 tracking-wider uppercase">
                                Control Panel
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white/50 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="px-3 py-6 space-y-1 flex-1">
                    <span className="px-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        Management
                    </span>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${isActive
                                        ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 text-amber-400 shadow-inner"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon
                                    size={18}
                                    className={isActive ? "text-amber-400" : "text-white/30 group-hover:text-white/60"}
                                />
                                {item.label}
                                {isActive && <ChevronRight size={14} className="ml-auto text-amber-400/50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Globe size={16} />
                        View Public Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 lg:px-8 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden mr-4 text-white/60 hover:text-white"
                    >
                        <Menu size={22} />
                    </button>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Link href="/admin" className="hover:text-white/70 transition-colors">
                            Admin
                        </Link>
                        {pathname !== "/admin" && (
                            <>
                                <ChevronRight size={14} />
                                <span className="text-white/70 font-medium">
                                    {navItems.find((n) => n.href === pathname)?.label || "Page"}
                                </span>
                            </>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
