// src/data/packages.ts
import { HolidayPackage, Testimonial } from "@/types/package";

export const defaultPackages: HolidayPackage[] = [
    {
        id: "1",
        slug: "dubai-city-escape-5-days",
        title: "Dubai City Escape",
        destination: "Dubai",
        country: "UAE",
        durationDays: 5,
        price: 1299,
        currency: "USD",
        rating: 4.8,
        images: [
            {
                url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
                alt: "Dubai skyline at sunset",
                width: 800,
                height: 600,
            },
        ],
        amenities: ["5-Star Hotel", "Airport Transfer", "City Tour", "Breakfast"],
        isFeatured: true,
    },
    {
        id: "2",
        slug: "maldives-paradise-retreat-7-days",
        title: "Maldives Paradise Retreat",
        destination: "Maldives",
        country: "Maldives",
        durationDays: 7,
        price: 2499,
        currency: "USD",
        rating: 4.9,
        images: [
            {
                url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
                alt: "Maldives overwater bungalow",
                width: 800,
                height: 600,
            },
        ],
        amenities: ["Water Villa", "All-Inclusive", "Spa Access", "Snorkeling"],
        isFeatured: true,
    },
    {
        id: "3",
        slug: "thailand-adventure-6-days",
        title: "Thailand Adventure",
        destination: "Phuket & Bangkok",
        country: "Thailand",
        durationDays: 6,
        price: 899,
        currency: "USD",
        rating: 4.7,
        images: [
            {
                url: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
                alt: "Thai temple at sunset",
                width: 800,
                height: 600,
            },
        ],
        amenities: ["4-Star Hotels", "Island Hopping", "Temple Tours", "Breakfast"],
        isFeatured: true,
    },
    {
        id: "4",
        slug: "bali-cultural-journey-8-days",
        title: "Bali Cultural Journey",
        destination: "Bali",
        country: "Indonesia",
        durationDays: 8,
        price: 1599,
        currency: "USD",
        rating: 4.8,
        images: [
            {
                url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
                alt: "Bali rice terraces",
                width: 800,
                height: 600,
            },
        ],
        amenities: ["Luxury Villas", "Cultural Tours", "Yoga Sessions", "Half Board"],
        isFeatured: true,
    },
    {
        id: "5",
        slug: "singapore-city-break-4-days",
        title: "Singapore City Break",
        destination: "Singapore",
        country: "Singapore",
        durationDays: 4,
        price: 1099,
        currency: "USD",
        rating: 4.6,
        images: [
            {
                url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
                alt: "Singapore Marina Bay at night",
                width: 800,
                height: 600,
            },
        ],
        amenities: ["5-Star Hotel", "Gardens by the Bay", "Universal Studios", "Breakfast"],
        isFeatured: true,
    },
    {
        id: "6",
        slug: "egypt-pyramids-explorer-5-days",
        title: "Egypt Pyramids Explorer",
        destination: "Cairo & Giza",
        country: "Egypt",
        durationDays: 5,
        price: 799,
        currency: "USD",
        rating: 4.5,
        images: [
            {
                url: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800",
                alt: "Great Pyramids of Giza",
                width: 800,
                height: 600,
            },
        ],
        amenities: ["4-Star Hotel", "Pyramid Tours", "Nile Dinner Cruise", "Guide"],
        isFeatured: true,
    },
];

export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        location: "New York, USA",
        rating: 5,
        text: "Absolutely incredible experience! The Dubai package exceeded all expectations. Every detail was perfectly planned.",
        tripDestination: "Dubai",
    },
    {
        id: "2",
        name: "Michael Chen",
        location: "London, UK",
        rating: 5,
        text: "The Maldives retreat was a dream come true. Crystal clear waters and the most beautiful sunsets I've ever seen.",
        tripDestination: "Maldives",
    },
    {
        id: "3",
        name: "Emma Williams",
        location: "Sydney, Australia",
        rating: 4,
        text: "Thailand adventure was packed with amazing experiences. From temples to beaches, it had everything!",
        tripDestination: "Thailand",
    },
];

// --- localStorage CRUD ---
const STORAGE_KEY = "oktravel_packages";

export function getPackages(): HolidayPackage[] {
    if (typeof window === "undefined") return defaultPackages;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPackages));
        return defaultPackages;
    } catch {
        return defaultPackages;
    }
}

export function savePackages(packages: HolidayPackage[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}

export function addPackage(pkg: Omit<HolidayPackage, "id">): HolidayPackage {
    const packages = getPackages();
    const newPkg: HolidayPackage = { ...pkg, id: Date.now().toString() };
    packages.push(newPkg);
    savePackages(packages);
    return newPkg;
}

export function updatePackage(id: string, updates: Partial<HolidayPackage>): HolidayPackage | null {
    const packages = getPackages();
    const index = packages.findIndex((p) => p.id === id);
    if (index === -1) return null;
    packages[index] = { ...packages[index], ...updates };
    savePackages(packages);
    return packages[index];
}

export function deletePackage(id: string): boolean {
    const packages = getPackages();
    const filtered = packages.filter((p) => p.id !== id);
    if (filtered.length === packages.length) return false;
    savePackages(filtered);
    return true;
}

export function resetPackages(): HolidayPackage[] {
    savePackages(defaultPackages);
    return defaultPackages;
}

// Keep backward compat: re-export as featuredPackages for SSR pages
export const featuredPackages = defaultPackages;
