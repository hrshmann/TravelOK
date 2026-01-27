// src/components/ui/CurrencySelector.tsx
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Currency {
    code: string;
    symbol: string;
    name: string;
    flag: string;
    rate: number; // Rate relative to USD
}

const currencies: Currency[] = [
    { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", rate: 1 },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪", rate: 3.67 },
    { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", rate: 0.92 },
    { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", rate: 0.79 },
    { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", rate: 83.12 },
    { code: "SAR", symbol: "﷼", name: "Saudi Riyal", flag: "🇸🇦", rate: 3.75 },
];

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        // Return default values if context not available
        return {
            currency: currencies[0],
            setCurrency: () => { },
            formatPrice: (usdPrice: number) => `$${usdPrice.toLocaleString()}`,
        };
    }
    return context;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>(currencies[0]);

    useEffect(() => {
        // Load saved preference
        const saved = localStorage.getItem("preferred_currency");
        if (saved) {
            const found = currencies.find((c) => c.code === saved);
            if (found) setCurrencyState(found);
        }
    }, []);

    const setCurrency = (newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        localStorage.setItem("preferred_currency", newCurrency.code);
    };

    const formatPrice = (usdPrice: number) => {
        const converted = usdPrice * currency.rate;
        return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

interface CurrencySelectorProps {
    variant?: "header" | "footer";
}

export default function CurrencySelector({ variant = "header" }: CurrencySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${variant === "header"
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
            >
                <span className="text-lg">{currency.flag}</span>
                <span className="text-sm font-medium">{currency.code}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                        >
                            <div className="p-2">
                                <p className="text-xs text-slate-500 px-3 py-2 font-medium uppercase">
                                    Select Currency
                                </p>
                                {currencies.map((curr) => (
                                    <button
                                        key={curr.code}
                                        onClick={() => {
                                            setCurrency(curr);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${currency.code === curr.code
                                            ? "bg-orange-50 text-orange-600"
                                            : "hover:bg-slate-50 text-slate-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{curr.flag}</span>
                                            <div className="text-left">
                                                <div className="font-medium text-sm">{curr.code}</div>
                                                <div className="text-xs text-slate-500">{curr.name}</div>
                                            </div>
                                        </div>
                                        {currency.code === curr.code && (
                                            <Check size={16} className="text-orange-600" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
