// src/components/packages/PackageCard.tsx
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { HolidayPackage } from "@/types/package";
import { cn } from "@/lib/utils";

interface PackageCardProps {
    package_: HolidayPackage;
    className?: string;
}

export default function PackageCard({ package_, className }: PackageCardProps) {
    return (
        <Link
            href={`/package/${package_.slug}`}
            className={cn(
                "group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2",
                className
            )}
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={package_.images[0]?.url || "/placeholder.jpg"}
                    alt={package_.images[0]?.alt || package_.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Featured Badge */}
                {package_.isFeatured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        ✨ Featured
                    </div>
                )}

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Clock size={12} />
                    {package_.durationDays} Days
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4">
                    <div className="px-4 py-2 bg-white rounded-xl shadow-lg">
                        <span className="text-xs text-slate-400 block">From</span>
                        <span className="text-xl font-bold text-orange-600">
                            ${package_.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
                    <MapPin size={14} className="text-orange-500" />
                    <span>{package_.destination}, {package_.country}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {package_.title}
                </h3>

                {/* Rating */}
                {package_.rating && (
                    <div className="flex items-center gap-1 mb-3">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-slate-700">{package_.rating}</span>
                        <span className="text-slate-400 text-sm">(128 reviews)</span>
                    </div>
                )}

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {package_.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                        >
                            {amenity}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-500">View Details</span>
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                        <ArrowRight
                            size={16}
                            className="text-orange-600 group-hover:text-white transition-colors"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}
