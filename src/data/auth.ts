// src/data/auth.ts
// Simple client-side auth for admin panel

const AUTH_KEY = 'oktravel_admin_auth';
const ADMIN_USERNAME = 'Misbah';
const ADMIN_PASSWORD = 'TravelOK#1';

export function login(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_KEY, 'authenticated');
        }
        return true;
    }
    return false;
}

export function logout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY);
    }
}

export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_KEY) === 'authenticated';
}
