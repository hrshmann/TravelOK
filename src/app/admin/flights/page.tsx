// src/app/admin/flights/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Plane,
    RotateCcw,
    ToggleLeft,
    ToggleRight,
    Search,
    AlertTriangle,
} from "lucide-react";
import {
    getFlights,
    addFlight,
    updateFlight,
    deleteFlight,
    resetFlights,
    type Flight,
} from "@/data/flights";
import FlightFormModal from "@/components/admin/FlightFormModal";

export default function AdminFlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    useEffect(() => {
        setFlights(getFlights());
    }, []);

    const refreshFlights = () => setFlights(getFlights());

    const handleAddFlight = (flightData: Omit<Flight, "id">) => {
        addFlight(flightData);
        refreshFlights();
    };

    const handleUpdateFlight = (flightData: Omit<Flight, "id">) => {
        if (editingFlight) {
            updateFlight(editingFlight.id, flightData);
            setEditingFlight(null);
            refreshFlights();
        }
    };

    const handleDeleteFlight = (id: string) => {
        deleteFlight(id);
        setDeleteConfirmId(null);
        refreshFlights();
    };

    const handleToggleActive = (flight: Flight) => {
        updateFlight(flight.id, { isActive: !flight.isActive });
        refreshFlights();
    };

    const handleReset = () => {
        resetFlights();
        setShowResetConfirm(false);
        refreshFlights();
    };

    const filteredFlights = flights.filter(
        (f) =>
            f.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.departure.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.arrival.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Plane className="text-amber-400" size={28} />
                        Flight Management
                    </h1>
                    <p className="text-white/50 mt-1">
                        Add, edit, and manage all flight listings in real-time
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 text-sm"
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <button
                        onClick={() => {
                            setEditingFlight(null);
                            setIsModalOpen(true);
                        }}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Flight
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by airline, flight number, or city..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                />
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 mb-6 text-sm">
                <span className="text-white/40">
                    Total:{" "}
                    <span className="text-white font-semibold">{flights.length}</span>
                </span>
                <span className="text-white/40">
                    Active:{" "}
                    <span className="text-emerald-400 font-semibold">
                        {flights.filter((f) => f.isActive).length}
                    </span>
                </span>
                <span className="text-white/40">
                    Inactive:{" "}
                    <span className="text-red-400 font-semibold">
                        {flights.filter((f) => !f.isActive).length}
                    </span>
                </span>
            </div>

            {/* Flight Table */}
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs font-bold text-white/30 uppercase tracking-wider">
                    <div className="col-span-2">Airline</div>
                    <div className="col-span-1">Flight #</div>
                    <div className="col-span-2">Departure</div>
                    <div className="col-span-2">Arrival</div>
                    <div className="col-span-1">Duration</div>
                    <div className="col-span-1">Price</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Flight Rows */}
                {filteredFlights.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <Plane size={48} className="mx-auto mb-4 text-white/10" />
                        <p className="text-white/30 text-lg">No flights found</p>
                        <p className="text-white/20 text-sm mt-1">
                            {searchQuery
                                ? "Try a different search term"
                                : "Click 'Add Flight' to get started"}
                        </p>
                    </div>
                ) : (
                    filteredFlights.map((flight) => (
                        <div
                            key={flight.id}
                            className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors ${!flight.isActive ? "opacity-50" : ""
                                }`}
                        >
                            {/* Airline */}
                            <div className="col-span-2 flex items-center gap-3">
                                <span className="text-xl">{flight.airlineLogo}</span>
                                <span className="text-white font-medium text-sm truncate">
                                    {flight.airline}
                                </span>
                            </div>

                            {/* Flight Number */}
                            <div className="col-span-1 flex items-center">
                                <span className="text-white/70 text-sm font-mono">
                                    {flight.flightNumber}
                                </span>
                            </div>

                            {/* Departure */}
                            <div className="col-span-2 flex items-center gap-2">
                                <div>
                                    <p className="text-white font-semibold text-sm">
                                        {flight.departure.time}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        {flight.departure.city} ({flight.departure.airport})
                                    </p>
                                </div>
                            </div>

                            {/* Arrival */}
                            <div className="col-span-2 flex items-center gap-2">
                                <div>
                                    <p className="text-white font-semibold text-sm">
                                        {flight.arrival.time}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        {flight.arrival.city} ({flight.arrival.airport})
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="col-span-1 flex items-center">
                                <span className="text-white/60 text-sm">{flight.duration}</span>
                            </div>

                            {/* Price */}
                            <div className="col-span-1 flex items-center">
                                <span className="text-amber-400 font-bold text-sm">
                                    AED {flight.price.toLocaleString()}
                                </span>
                            </div>

                            {/* Status Toggle */}
                            <div className="col-span-1 flex items-center">
                                <button
                                    onClick={() => handleToggleActive(flight)}
                                    className="transition-all"
                                    title={flight.isActive ? "Click to deactivate" : "Click to activate"}
                                >
                                    {flight.isActive ? (
                                        <ToggleRight size={28} className="text-emerald-400" />
                                    ) : (
                                        <ToggleLeft size={28} className="text-white/20" />
                                    )}
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="col-span-2 flex items-center justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setEditingFlight(flight);
                                        setIsModalOpen(true);
                                    }}
                                    className="w-9 h-9 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all"
                                    title="Edit flight"
                                >
                                    <Pencil size={14} />
                                </button>
                                {deleteConfirmId === flight.id ? (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleDeleteFlight(flight.id)}
                                            className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-xs font-semibold transition-all"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirmId(null)}
                                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 text-xs transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDeleteConfirmId(flight.id)}
                                        className="w-9 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
                                        title="Delete flight"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Reset Confirmation */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowResetConfirm(false)}
                    />
                    <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <AlertTriangle size={20} className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">Reset All Flights</h3>
                                <p className="text-white/40 text-sm">
                                    This will restore default flights
                                </p>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm mb-6">
                            All your custom flight data will be lost and replaced with the
                            default 4 sample flights. This action cannot be undone.
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleReset}
                                className="flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl transition-all"
                            >
                                Reset All
                            </button>
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 font-medium rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Flight Form Modal */}
            <FlightFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingFlight(null);
                }}
                onSubmit={editingFlight ? handleUpdateFlight : handleAddFlight}
                editFlight={editingFlight}
            />
        </div>
    );
}
