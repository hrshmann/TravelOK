// src/types/package.ts

export type TripType = 'holiday' | 'flight' | 'visa';

export interface ImageAsset {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface HolidayPackage {
  id: string;
  slug: string;
  title: string;
  destination: string; // e.g., "Dubai"
  country: string;     // e.g., "UAE"
  durationDays: number;
  price: number;
  currency: string;
  rating?: number;
  images: ImageAsset[];
  amenities: string[]; // e.g., ["Hotel", "Transfer", "Breakfast"]
  isFeatured?: boolean;
  // Rich content fields (managed via admin)
  description?: string;
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: { day: number; title: string; description: string }[];
}

export interface FlightPackage {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  departureDate: string;
  returnDate?: string;
  price: number;
  currency: string;
  isRoundTrip: boolean;
}

export interface VisaService {
  id: string;
  country: string;
  visaType: string; // e.g., "Tourist", "Business"
  processingTime: string; // e.g., "3-5 days"
  price: number;
  currency: string;
  requirements: string[];
}

export interface SearchState {
  type: TripType;
  destination?: string;
  date?: string;
  returnDate?: string;
  guests?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  text: string;
  tripDestination: string;
}
