// src/app/admin/bookings/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Inbox,
    Search,
    Trash2,
    AlertTriangle,
    ChevronDown,
    Package,
    Globe,
    MessageSquare,
    Clock,
    CheckCircle2,
    Circle,
} from "lucide-react";
import {
    getBookings,
    updateBookingStatus,
    deleteBooking,
    type Booking,
    type BookingStatus,
} from "@/data/bookings";

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: React.ElementType }> = {
    new: { label: "New", color: "text-blue-400 bg-blue-500/10", icon: Circle },
    "in-progress": { label: "In Progress", color: "text-amber-400 bg-amber-500/10", icon: Clock },
    resolved: { label: "Resolved", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle2 },
};

const typeConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    package: { label: "Package", color: "text-emerald-400", icon: Package },
    visa: { label: "Visa", color: "text-blue-400", icon: Globe },
    general: { label: "General", color: "text-purple-400", icon: MessageSquare },
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    useEffect(() => {
        setBookings(getBookings());
    }, []);

    const refresh = () => setBookings(getBookings());

    const handleStatusChange = (id: string, status: BookingStatus) => {
        updateBookingStatus(id, status);
        refresh();
    };

    const handleDelete = (id: string) => {
        deleteBooking(id);
        setDeleteConfirmId(null);
        refresh();
    };

    const filtered = bookings.filter((b) => {
        const matchesSearch =
            b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (b.packageName || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const newCount = bookings.filter((b) => b.status === "new").length;
    const inProgressCount = bookings.filter((b) => b.status === "in-progress").length;
    const resolvedCount = bookings.filter((b) => b.status === "resolved").length;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Inbox className="text-amber-400" size={28} />
                        Bookings & Enquiries
                    </h1>
                    <p className="text-white/50 mt-1">Manage customer enquiries and booking requests</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "New", count: newCount, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                    { label: "In Progress", count: inProgressCount, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                    { label: "Resolved", count: resolvedCount, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                ].map((s) => (
                    <div key={s.label} className={`${s.bg} border rounded-xl p-4 text-center`}>
                        <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
                        <p className="text-white/40 text-sm mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email, or package..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                    />
                </div>
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
                        className="appearance-none pl-4 pr-10 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs font-bold text-white/30 uppercase tracking-wider">
                    <div className="col-span-3">Customer</div>
                    <div className="col-span-2">Contact</div>
                    <div className="col-span-2">Enquiry</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {filtered.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <Inbox size={48} className="mx-auto mb-4 text-white/10" />
                        <p className="text-white/30 text-lg">No enquiries found</p>
                        <p className="text-white/20 text-sm mt-1">
                            {bookings.length === 0
                                ? "Enquiries submitted via the website will appear here"
                                : "Try adjusting your search or filter"}
                        </p>
                    </div>
                ) : (
                    filtered.map((booking) => {
                        const statusCfg = statusConfig[booking.status];
                        const typeCfg = typeConfig[booking.type] || typeConfig.general;
                        const StatusIcon = statusCfg.icon;
                        const TypeIcon = typeCfg.icon;

                        return (
                            <div
                                key={booking.id}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Customer */}
                                <div className="lg:col-span-3">
                                    <p className="text-white font-medium">{booking.name}</p>
                                    <p className="text-white/40 text-sm">{booking.email}</p>
                                </div>

                                {/* Contact */}
                                <div className="lg:col-span-2 flex items-center">
                                    <p className="text-white/60 text-sm">{booking.phone}</p>
                                </div>

                                {/* Enquiry */}
                                <div className="lg:col-span-2 flex items-center gap-2">
                                    <TypeIcon size={14} className={typeCfg.color} />
                                    <div>
                                        <p className={`text-xs font-semibold ${typeCfg.color}`}>{typeCfg.label}</p>
                                        {booking.packageName && (
                                            <p className="text-white/40 text-xs truncate max-w-[120px]">{booking.packageName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="lg:col-span-2 flex items-center">
                                    <p className="text-white/40 text-sm">
                                        {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="lg:col-span-2 flex items-center">
                                    <div className="relative">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                                            className={`appearance-none pl-7 pr-6 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-0 outline-none ${statusCfg.color}`}
                                            style={{ background: "transparent" }}
                                        >
                                            <option value="new">New</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                        <StatusIcon size={12} className={`absolute left-2 top-1/2 -translate-y-1/2 ${statusCfg.color.split(" ")[0]}`} />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="lg:col-span-1 flex items-center justify-end gap-2">
                                    {deleteConfirmId === booking.id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-xs font-semibold transition-all"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmId(null)}
                                                className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 text-xs transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirmId(booking.id)}
                                            className="w-9 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Message (full width) */}
                                {booking.message && (
                                    <div className="lg:col-span-12 pt-2 border-t border-white/5">
                                        <p className="text-white/30 text-xs">
                                            <span className="text-white/50 font-medium">Message: </span>
                                            {booking.message}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Reset confirm modal */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
                    <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <AlertTriangle size={20} className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Delete Enquiry</h3>
                                <p className="text-white/40 text-sm">This cannot be undone</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleDelete(deleteConfirmId)}
                                className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl transition-all"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 font-medium rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
