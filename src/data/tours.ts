// src/data/tours.ts
export interface Tour {
    id: string;
    title: string;
    image: string;
    duration: string;
    timing: "morning" | "afternoon" | "evening";
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    highlights: string[];
    category: string;
    popular?: boolean;
    isActive?: boolean;
}

export const defaultTours: Tour[] = [
    {
        id: "1",
        title: "Desert Safari with BBQ Dinner",
        image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
        duration: "6 Hours",
        timing: "evening",
        rating: 4.9,
        reviewCount: 2340,
        price: 150,
        originalPrice: 220,
        highlights: ["Dune Bashing", "Camel Ride", "BBQ Dinner", "Belly Dance"],
        category: "Adventure",
        popular: true,
        isActive: true,
    },
    {
        id: "2",
        title: "Abu Dhabi City Tour",
        image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800",
        duration: "10 Hours",
        timing: "morning",
        rating: 4.8,
        reviewCount: 1256,
        price: 180,
        highlights: ["Sheikh Zayed Mosque", "Emirates Palace", "Heritage Village"],
        category: "City Tours",
        isActive: true,
    },
    {
        id: "3",
        title: "Dubai City Tour",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        duration: "6 Hours",
        timing: "morning",
        rating: 4.7,
        reviewCount: 1890,
        price: 120,
        highlights: ["Burj Khalifa View", "Dubai Mall", "Old Dubai", "Gold Souk"],
        category: "City Tours",
        isActive: true,
    },
    {
        id: "4",
        title: "Dhow Cruise Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        duration: "3 Hours",
        timing: "evening",
        rating: 4.8,
        reviewCount: 987,
        price: 99,
        originalPrice: 150,
        highlights: ["Marina Views", "Buffet Dinner", "Live Entertainment"],
        category: "Cruises",
        popular: true,
        isActive: true,
    },
    {
        id: "5",
        title: "Musandam Day Trip",
        image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800",
        duration: "Full Day",
        timing: "morning",
        rating: 4.9,
        reviewCount: 543,
        price: 350,
        highlights: ["Fjords Cruise", "Swimming", "Snorkeling", "Lunch"],
        category: "Day Trips",
        isActive: true,
    },
    {
        id: "6",
        title: "Burj Khalifa At The Top",
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800",
        duration: "2 Hours",
        timing: "afternoon",
        rating: 4.9,
        reviewCount: 3200,
        price: 180,
        highlights: ["124th Floor", "Panoramic Views", "Interactive Displays"],
        category: "Attractions",
        isActive: true,
    },
    {
        id: "7",
        title: "Private Yacht Charter",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
        duration: "3 Hours",
        timing: "afternoon",
        rating: 5.0,
        reviewCount: 234,
        price: 800,
        highlights: ["Private Yacht", "Swimming", "Refreshments", "Marina Views"],
        category: "Luxury",
        isActive: true,
    },
    {
        id: "8",
        title: "Hot Air Balloon Ride",
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800",
        duration: "4 Hours",
        timing: "morning",
        rating: 4.9,
        reviewCount: 678,
        price: 950,
        highlights: ["Sunrise Flight", "Desert Views", "Falcon Show", "Breakfast"],
        category: "Adventure",
        isActive: true,
    },
];

const STORAGE_KEY = "oktravel_tours";

export function getTours(): Tour[] {
    if (typeof window === "undefined") return defaultTours;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTours));
        return defaultTours;
    } catch {
        return defaultTours;
    }
}

export function getActiveTours(): Tour[] {
    return getTours().filter((t) => t.isActive !== false);
}

export function saveTours(tours: Tour[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tours));
}

export function addTour(tour: Omit<Tour, "id">): Tour {
    const tours = getTours();
    const newTour: Tour = { ...tour, id: Date.now().toString() };
    tours.push(newTour);
    saveTours(tours);
    return newTour;
}

export function updateTour(id: string, updates: Partial<Tour>): Tour | null {
    const tours = getTours();
    const index = tours.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tours[index] = { ...tours[index], ...updates };
    saveTours(tours);
    return tours[index];
}

export function deleteTour(id: string): boolean {
    const tours = getTours();
    const filtered = tours.filter((t) => t.id !== id);
    if (filtered.length === tours.length) return false;
    saveTours(filtered);
    return true;
}

export function resetTours(): Tour[] {
    saveTours(defaultTours);
    return defaultTours;
}
