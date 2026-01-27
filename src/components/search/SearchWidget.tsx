// src/components/search/SearchWidget.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Plane,
    Calendar,
    FileText,
    MapPin,
    Search,
    Users,
    Hotel,
    Palmtree,
    Shield,
    Tag,
    ArrowRightLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TripType } from "@/types/package";

type ExtendedTripType = TripType | "hotel" | "uae-tours" | "insurance" | "offers";

interface TabButtonProps {
    isActive: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}

const TabButton = ({ isActive, onClick, icon: Icon, label }: TabButtonProps) => (
    <button
        onClick={onClick}
        type="button"
        className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-t-xl relative whitespace-nowrap",
            "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:transition-all before:duration-300",
            isActive
                ? "bg-white text-orange-600 shadow-lg before:bg-gradient-to-r before:from-orange-500 before:to-orange-400"
                : "bg-white/60 text-slate-500 hover:bg-white/80 hover:text-orange-500 before:bg-transparent"
        )}
    >
        <Icon size={18} className={cn(isActive && "animate-pulse")} />
        <span className="hidden sm:inline">{label}</span>
    </button>
);

export default function SearchWidget() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState<ExtendedTripType>(
        (searchParams.get("type") as ExtendedTripType) || "holiday"
    );

    // Common fields
    const [destination, setDestination] = useState(searchParams.get("q") || "");
    const [date, setDate] = useState(searchParams.get("date") || "");
    const [guests, setGuests] = useState(searchParams.get("guests") || "2");

    // Flight specific
    const [flightType, setFlightType] = useState<"one-way" | "round-trip" | "multi-city">("round-trip");
    const [fromCity, setFromCity] = useState("Dubai (DXB)");
    const [returnDate, setReturnDate] = useState("");
    const [cabinClass, setCabinClass] = useState("economy");

    // Hotel specific
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [rooms, setRooms] = useState("1");

    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const params = new URLSearchParams();
            if (destination) params.set("q", destination);
            params.set("type", activeTab);
            if (date) params.set("date", date);
            if (guests) params.set("guests", guests);

            if (activeTab === "flight") {
                params.set("flightType", flightType);
                params.set("from", fromCity);
                if (returnDate) params.set("returnDate", returnDate);
                params.set("class", cabinClass);
            }

            if (activeTab === "hotel") {
                if (checkIn) params.set("checkIn", checkIn);
                if (checkOut) params.set("checkOut", checkOut);
                params.set("rooms", rooms);
            }

            router.push(`/search?${params.toString()}`);
        },
        [destination, activeTab, date, guests, flightType, fromCity, returnDate, cabinClass, checkIn, checkOut, rooms, router]
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "flight":
                return (
                    <>
                        {/* Flight Type Toggle */}
                        <div className="col-span-full flex gap-2 mb-2">
                            {(["one-way", "round-trip", "multi-city"] as const).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFlightType(type)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        flightType === type
                                            ? "bg-orange-600 text-white"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    )}
                                >
                                    {type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                                </button>
                            ))}
                        </div>

                        {/* From */}
                        <div className="md:col-span-3 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                From
                            </label>
                            <div className="relative">
                                <Plane className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={fromCity}
                                    onChange={(e) => setFromCity(e.target.value)}
                                    placeholder="Departure city"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Swap Button */}
                        <div className="hidden md:flex items-end pb-2 justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    const temp = fromCity;
                                    setFromCity(destination);
                                    setDestination(temp);
                                }}
                                className="w-10 h-10 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors"
                            >
                                <ArrowRightLeft size={18} className="text-orange-600" />
                            </button>
                        </div>

                        {/* To */}
                        <div className="md:col-span-3 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                To
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Destination city"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Departure Date */}
                        <div className="md:col-span-2 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Departure
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Return Date */}
                        {flightType === "round-trip" && (
                            <div className="md:col-span-2 relative group">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Return
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                    <input
                                        type="date"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Travelers & Class */}
                        <div className={cn("relative group", flightType === "round-trip" ? "md:col-span-full" : "md:col-span-2")}>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Travelers & Class
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                    >
                                        <option value="1">1 Traveler</option>
                                        <option value="2">2 Travelers</option>
                                        <option value="3">3 Travelers</option>
                                        <option value="4">4 Travelers</option>
                                        <option value="5">5+ Travelers</option>
                                    </select>
                                </div>
                                <select
                                    value={cabinClass}
                                    onChange={(e) => setCabinClass(e.target.value)}
                                    className="px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="economy">Economy</option>
                                    <option value="premium">Premium Economy</option>
                                    <option value="business">Business</option>
                                    <option value="first">First Class</option>
                                </select>
                            </div>
                        </div>
                    </>
                );

            case "hotel":
                return (
                    <>
                        {/* Destination */}
                        <div className="md:col-span-4 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Destination
                            </label>
                            <div className="relative">
                                <Hotel className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="City or hotel name"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Check-in */}
                        <div className="md:col-span-2 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Check-in
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className="md:col-span-2 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Check-out
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Rooms & Guests */}
                        <div className="md:col-span-4 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Rooms & Guests
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}
                                    className="flex-1 px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="1">1 Room</option>
                                    <option value="2">2 Rooms</option>
                                    <option value="3">3 Rooms</option>
                                    <option value="4">4+ Rooms</option>
                                </select>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="flex-1 px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                    <option value="5">5+ Guests</option>
                                </select>
                            </div>
                        </div>
                    </>
                );

            case "uae-tours":
                return (
                    <>
                        {/* Tour Type */}
                        <div className="md:col-span-6 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Tour
                            </label>
                            <div className="relative">
                                <Palmtree className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="">Select a tour...</option>
                                    <option value="desert-safari">Desert Safari Adventure</option>
                                    <option value="dhow-cruise">Dhow Cruise Dinner</option>
                                    <option value="abu-dhabi">Abu Dhabi City Tour</option>
                                    <option value="dubai-city">Dubai City Tour</option>
                                    <option value="musandam">Musandam Day Trip</option>
                                    <option value="yacht">Private Yacht Charter</option>
                                    <option value="burj-khalifa">Burj Khalifa Experience</option>
                                </select>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="md:col-span-3 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Tour Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="md:col-span-3 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Participants
                            </label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5">5+ People</option>
                                </select>
                            </div>
                        </div>
                    </>
                );

            case "insurance":
                return (
                    <>
                        {/* Coverage Type */}
                        <div className="md:col-span-4 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Coverage Type
                            </label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="">Select coverage...</option>
                                    <option value="single">Single Trip</option>
                                    <option value="annual">Annual Multi-Trip</option>
                                    <option value="family">Family Coverage</option>
                                    <option value="business">Business Travel</option>
                                    <option value="schengen">Schengen Visa Insurance</option>
                                </select>
                            </div>
                        </div>

                        {/* Travel Dates */}
                        <div className="md:col-span-4 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Travel Dates
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder="Start Date"
                                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                    />
                                </div>
                                <div className="relative flex-1">
                                    <input
                                        type="date"
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        placeholder="End Date"
                                        className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Travelers */}
                        <div className="md:col-span-4 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Travelers
                            </label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="1">1 Traveler</option>
                                    <option value="2">2 Travelers</option>
                                    <option value="3">3 Travelers</option>
                                    <option value="4">4 Travelers</option>
                                    <option value="5">5+ Travelers</option>
                                </select>
                            </div>
                        </div>
                    </>
                );

            case "visa":
                return (
                    <div className="md:col-span-12 relative group">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Country / Visa Type
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Enter country e.g. UAE, Schengen, UK, USA"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                            />
                        </div>
                    </div>
                );

            case "offers":
                return (
                    <div className="md:col-span-12 text-center py-6">
                        <Tag size={48} className="mx-auto text-orange-500 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Hot Deals & Offers</h3>
                        <p className="text-slate-600 mb-4">Check out our latest promotions and special discounts!</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold">Up to 40% Off Holidays</span>
                            <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold">Free Visa Processing</span>
                            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">Kids Stay Free</span>
                        </div>
                    </div>
                );

            default: // holiday
                return (
                    <>
                        {/* Destination */}
                        <div className="md:col-span-5 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Destination
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Where do you want to go?"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="md:col-span-4 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Travel Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium"
                                />
                            </div>
                        </div>

                        {/* Travelers */}
                        <div className="md:col-span-3 relative group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Travelers
                            </label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                                >
                                    <option value="1">1 Adult</option>
                                    <option value="2">2 Adults</option>
                                    <option value="3">3 Adults</option>
                                    <option value="4">Family (2+2)</option>
                                    <option value="5">Group (5+)</option>
                                </select>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Glass Card Container */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 backdrop-blur-xl bg-white/10 border border-white/20">
                {/* Tabs Header */}
                <div className="flex bg-gradient-to-r from-slate-100/80 to-slate-50/80 p-2 pb-0 gap-1 overflow-x-auto scrollbar-hide">
                    <TabButton
                        isActive={activeTab === "flight"}
                        onClick={() => setActiveTab("flight")}
                        icon={Plane}
                        label="Flights"
                    />
                    <TabButton
                        isActive={activeTab === "holiday"}
                        onClick={() => setActiveTab("holiday")}
                        icon={MapPin}
                        label="Holidays"
                    />
                    <TabButton
                        isActive={activeTab === "hotel"}
                        onClick={() => setActiveTab("hotel")}
                        icon={Hotel}
                        label="Hotels"
                    />
                    <TabButton
                        isActive={activeTab === "uae-tours"}
                        onClick={() => setActiveTab("uae-tours")}
                        icon={Palmtree}
                        label="UAE Tours"
                    />
                    <TabButton
                        isActive={activeTab === "insurance"}
                        onClick={() => setActiveTab("insurance")}
                        icon={Shield}
                        label="Insurance"
                    />
                    <TabButton
                        isActive={activeTab === "visa"}
                        onClick={() => setActiveTab("visa")}
                        icon={FileText}
                        label="Visa"
                    />
                    <TabButton
                        isActive={activeTab === "offers"}
                        onClick={() => setActiveTab("offers")}
                        icon={Tag}
                        label="Offers"
                    />
                </div>

                {/* Search Body */}
                <div className="bg-white p-6 md:p-8">
                    <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                        {/* Input Fields Grid */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                            {renderTabContent()}
                        </div>

                        {/* Search Button */}
                        {activeTab !== "offers" && (
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full lg:w-auto px-10 py-4 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 group"
                                >
                                    <Search size={20} className="group-hover:rotate-12 transition-transform" />
                                    <span>Search</span>
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Quick Stats / Trust Indicators */}
                    <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>50,000+ Happy Travelers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500">★★★★★</span>
                            <span>4.9 Average Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-orange-600">24/7</span>
                            <span>Support Available</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
