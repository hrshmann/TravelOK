// src/data/bookings.ts

export type BookingType = 'package' | 'visa' | 'general';
export type BookingStatus = 'new' | 'in-progress' | 'resolved';

export interface Booking {
    id: string;
    type: BookingType;
    packageName?: string;
    destination?: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: BookingStatus;
    createdAt: string;
}

const STORAGE_KEY = 'oktravel_bookings';

export function getBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveBookings(bookings: Booking[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function addBooking(data: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
    const bookings = getBookings();
    const newBooking: Booking = {
        ...data,
        id: Date.now().toString(),
        status: 'new',
        createdAt: new Date().toISOString(),
    };
    bookings.unshift(newBooking);
    saveBookings(bookings);
    return newBooking;
}

export function updateBookingStatus(id: string, status: BookingStatus): void {
    const bookings = getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index !== -1) {
        bookings[index].status = status;
        saveBookings(bookings);
    }
}

export function deleteBooking(id: string): void {
    const bookings = getBookings().filter((b) => b.id !== id);
    saveBookings(bookings);
}

export function getNewBookingsCount(): number {
    return getBookings().filter((b) => b.status === 'new').length;
}
