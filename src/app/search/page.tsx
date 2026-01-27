// src/app/search/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import PackageCard from "@/components/packages/PackageCard";
import { featuredPackages } from "@/data/packages";
import { TripType } from "@/types/package";

interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = (params.q as string) || "";
    const type = (params.type as TripType) || "holiday";

    // Filter packages based on search query
    const filteredPackages = featuredPackages.filter((pkg) => {
        if (!query) return true;
        const searchLower = query.toLowerCase();
        return (
            pkg.title.toLowerCase().includes(searchLower) ||
            pkg.destination.toLowerCase().includes(searchLower) ||
            pkg.country.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                                {query ? `Search Results for "${query}"` : "All Packages"}
                            </h1>
                            <p className="text-slate-600 mt-2">
                                {filteredPackages.length} {type} packages found
                            </p>
                        </div>

                        {/* Filter Controls */}
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors">
                                <Filter size={18} />
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors">
                                <SlidersHorizontal size={18} />
                                Sort By
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-96 bg-slate-200 rounded-2xl animate-pulse"
                                />
                            ))}
                        </div>
                    }
                >
                    {filteredPackages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPackages.map((pkg) => (
                                <PackageCard key={pkg.id} package_={pkg} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                No packages found
                            </h2>
                            <p className="text-slate-600 mb-6">
                                Try searching for a different destination or browse our featured packages.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Browse All Packages
                            </Link>
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}
