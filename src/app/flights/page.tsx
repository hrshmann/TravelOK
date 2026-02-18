// src/app/flights/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Plane,
    Calendar,
    Users,
    ArrowRightLeft,
    Search,
    Clock,
    Briefcase,
    Wifi,
    UtensilsCrossed,
    ChevronRight,
    Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getActiveFlights, type Flight } from "@/data/flights";

export default function FlightsPage() {
    const [flightType, setFlightType] = useState<"one-way" | "round-trip" | "multi-city">("round-trip");
    const [fromCity, setFromCity] = useState("Dubai (DXB)");
    const [toCity, setToCity] = useState("London (LHR)");
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState("1");
    const [cabinClass, setCabinClass] = useState("economy");
    const [sortBy, setSortBy] = useState("price-asc");
    const [flights, setFlights] = useState<Flight[]>([]);

    // Load flights from localStorage
    useEffect(() => {
        setFlights(getActiveFlights());

        // Listen for storage changes (e.g. from admin panel in another tab)
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "oktravel_flights") {
                setFlights(getActiveFlights());
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    // Sort flights
    const sortedFlights = useMemo(() => {
        const sorted = [...flights];
        switch (sortBy) {
            case "price-asc":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "duration":
                sorted.sort((a, b) => {
                    const parseDur = (d: string) => {
                        const h = parseInt(d.match(/(\d+)h/)?.[1] || "0");
                        const m = parseInt(d.match(/(\d+)m/)?.[1] || "0");
                        return h * 60 + m;
                    };
                    return parseDur(a.duration) - parseDur(b.duration);
                });
                break;
            case "departure":
                sorted.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
                break;
        }
        return sorted;
    }, [flights, sortBy]);

    const swapCities = () => {
        const temp = fromCity;
        setFromCity(toCity);
        setToCity(temp);
    };

    return (
        <>
            {/* Hero Section with Search */}
            <section className="relative pt-32 pb-24 bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-6">
                            <Plane size={16} />
                            Best Flight Deals
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Search Flights
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Compare prices from 500+ airlines and book your perfect flight.
                        </p>
                    </div>

                    {/* Search Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 md:p-8">
                        {/* Flight Type Toggle */}
                        <div className="flex gap-2 mb-6">
                            {(["one-way", "round-trip", "multi-city"] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFlightType(type)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        flightType === type
                                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                                            : "bg-slate-100 text-slate-600 hover:bg-amber-50"
                                    )}
                                >
                                    {type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                                </button>
                            ))}
                        </div>

                        {/* Search Form */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            {/* From */}
                            <div className="md:col-span-3 relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    From
                                </label>
                                <div className="relative">
                                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        value={fromCity}
                                        onChange={(e) => setFromCity(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Swap Button */}
                            <div className="hidden md:flex items-end pb-2 justify-center">
                                <button
                                    onClick={swapCities}
                                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <ArrowRightLeft size={18} className="text-blue-600" />
                                </button>
                            </div>

                            {/* To */}
                            <div className="md:col-span-3 relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    To
                                </label>
                                <div className="relative">
                                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={20} />
                                    <input
                                        type="text"
                                        value={toCity}
                                        onChange={(e) => setToCity(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Departure */}
                            <div className="md:col-span-2 relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Departure
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="date"
                                        value={departDate}
                                        onChange={(e) => setDepartDate(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Return */}
                            {flightType === "round-trip" && (
                                <div className="md:col-span-2 relative">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Return
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="date"
                                            value={returnDate}
                                            onChange={(e) => setReturnDate(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            {/* Passengers */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Passengers
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <select
                                        value={passengers}
                                        onChange={(e) => setPassengers(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="1">1 Passenger</option>
                                        <option value="2">2 Passengers</option>
                                        <option value="3">3 Passengers</option>
                                        <option value="4">4 Passengers</option>
                                        <option value="5">5+ Passengers</option>
                                    </select>
                                </div>
                            </div>

                            {/* Cabin Class */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Cabin Class
                                </label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <select
                                        value={cabinClass}
                                        onChange={(e) => setCabinClass(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="economy">Economy</option>
                                        <option value="premium">Premium Economy</option>
                                        <option value="business">Business</option>
                                        <option value="first">First Class</option>
                                    </select>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="md:col-span-2 flex items-end">
                                <button className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                                    <Search size={20} />
                                    Search Flights
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flight Results */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Available Flights</h2>
                            <p className="text-slate-600">{sortedFlights.length} flights found</p>
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="price-asc">Sort by: Price (Low to High)</option>
                            <option value="price-desc">Sort by: Price (High to Low)</option>
                            <option value="duration">Sort by: Duration (Shortest)</option>
                            <option value="departure">Sort by: Departure Time</option>
                        </select>
                    </div>

                    {/* Flight Cards */}
                    <div className="space-y-4">
                        {sortedFlights.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <Plane size={48} className="mx-auto mb-4 text-slate-200" />
                                <p className="text-slate-400 text-lg">No flights available</p>
                                <p className="text-slate-300 text-sm mt-1">Check back soon for new flight listings</p>
                            </div>
                        ) : (
                            sortedFlights.map((flight, i) => (
                                <ScrollReveal key={flight.id} delay={i * 0.1}>
                                    <div
                                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            {/* Airline Info */}
                                            <div className="flex items-center gap-4 md:w-48">
                                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                                                    {flight.airlineLogo}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{flight.airline}</p>
                                                    <p className="text-sm text-slate-500">{flight.flightNumber}</p>
                                                </div>
                                            </div>

                                            {/* Flight Times */}
                                            <div className="flex-1 flex items-center gap-4">
                                                {/* Departure */}
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-slate-900">{flight.departure.time}</p>
                                                    <p className="text-sm text-slate-500">{flight.departure.airport}</p>
                                                </div>

                                                {/* Duration */}
                                                <div className="flex-1 flex flex-col items-center">
                                                    <span className="text-xs text-slate-400 mb-1">{flight.duration}</span>
                                                    <div className="w-full h-0.5 bg-slate-200 relative">
                                                        <Plane
                                                            size={16}
                                                            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-blue-500 rotate-90"
                                                        />
                                                    </div>
                                                    <span className="text-xs text-slate-400 mt-1">
                                                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                                                    </span>
                                                </div>

                                                {/* Arrival */}
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-slate-900">{flight.arrival.time}</p>
                                                    <p className="text-sm text-slate-500">{flight.arrival.airport}</p>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div className="flex items-center gap-2 md:w-24">
                                                {flight.amenities.includes("wifi") && (
                                                    <Wifi size={16} className="text-slate-400" />
                                                )}
                                                {flight.amenities.includes("meals") && (
                                                    <UtensilsCrossed size={16} className="text-slate-400" />
                                                )}
                                            </div>

                                            {/* Price & Book */}
                                            <div className="flex items-center gap-4 md:w-48">
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-slate-900">
                                                        AED {flight.price.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-slate-500">per person</p>
                                                </div>
                                                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1">
                                                    Select
                                                    <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Why Book With Us */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
                        Why Book Flights With Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Star size={24} className="text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Best Prices</h3>
                            <p className="text-slate-600 text-sm">
                                Compare prices from 500+ airlines to find the best deals.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock size={24} className="text-green-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">24/7 Support</h3>
                            <p className="text-slate-600 text-sm">
                                Round-the-clock assistance for all your booking needs.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Briefcase size={24} className="text-purple-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Easy Booking</h3>
                            <p className="text-slate-600 text-sm">
                                Simple and secure booking process in just a few clicks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
