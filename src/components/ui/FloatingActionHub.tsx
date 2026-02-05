// src/components/ui/FloatingActionHub.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    Phone,
    Mail,
    X,
    Send,
    Bot,
    ChevronUp,
} from "lucide-react";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    time: string;
}

const quickReplies = [
    "I need help booking a trip",
    "Visa inquiry",
    "Package prices",
    "Custom itinerary",
];

const botResponses: Record<string, string> = {
    "i need help booking a trip": "I'd love to help you book your dream trip! 🌴 Which destination are you interested in? We have amazing deals for Dubai, Maldives, Thailand, and more!",
    "visa inquiry": "We offer visa services for 50+ countries! 🛂 UAE visas are processed within 24-48 hours. Which country's visa do you need assistance with?",
    "package prices": "Our packages start from just $799! 💰 Popular options:\n• Dubai 5D: $1,299\n• Maldives 7D: $2,499\n• Thailand 6D: $899\nWould you like details on any specific package?",
    "custom itinerary": "We specialize in personalized trips! ✨ Tell me your preferred:\n1. Destination\n2. Travel dates\n3. Budget range\nOur experts will craft the perfect itinerary for you!",
    default: "Thanks for reaching out! 😊 Our travel experts are here to help. You can:\n• Call us: +971 58 525 5484\n• Email: info@oktravels.com\n• Or tell me what you're looking for!",
};

export default function FloatingActionHub() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMode, setActiveMode] = useState<"menu" | "chat" | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi! 👋 I'm OKBot, your travel assistant. How can I help you today?",
            isBot: true,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleQuickReply = (reply: string) => {
        sendMessage(reply);
    };

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text,
            isBot: false,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = botResponses.default;

            for (const key of Object.keys(botResponses)) {
                if (lowerText.includes(key)) {
                    response = botResponses[key];
                    break;
                }
            }

            const botMessage: Message = {
                id: messages.length + 2,
                text: response,
                isBot: true,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const menuItems = [
        {
            icon: MessageCircle,
            label: "Chat with us",
            color: "bg-green-500",
            action: () => setActiveMode("chat"),
        },
        {
            icon: Phone,
            label: "Call Now",
            color: "bg-blue-500",
            href: "tel:+971585255484",
        },
        {
            icon: Mail,
            label: "Email Us",
            color: "bg-purple-500",
            href: "mailto:info@oktravels.com",
        },
        {
            icon: Bot,
            label: "AI Assistant",
            color: "bg-gradient-to-r from-pink-500 to-orange-500",
            action: () => setActiveMode("chat"),
        },
    ];

    return (
        <>
            {/* Main FAB Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />

                <motion.button
                    onClick={() => {
                        setIsOpen(!isOpen);
                        if (!isOpen) setActiveMode("menu");
                        else setActiveMode(null);
                    }}
                    className="relative w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl flex items-center justify-center hover:shadow-green-500/50 transition-shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <MessageCircle size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            {/* Menu / Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-28 right-6 z-50 w-80 sm:w-96"
                    >
                        {activeMode === "menu" && (
                            <motion.div
                                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-1">How can we help?</h3>
                                    <p className="text-green-100 text-sm">Choose an option below</p>
                                </div>

                                {/* Menu Items */}
                                <div className="p-4 space-y-3">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                                                >
                                                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                                        <item.icon size={22} />
                                                    </div>
                                                    <span className="font-medium text-slate-700">{item.label}</span>
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={item.action}
                                                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                                                >
                                                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                                        <item.icon size={22} />
                                                    </div>
                                                    <span className="font-medium text-slate-700">{item.label}</span>
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="border-t px-4 py-3 bg-slate-50">
                                    <p className="text-xs text-slate-500 text-center">
                                        Available 24/7 • Response time: ~2 mins
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {activeMode === "chat" && (
                            <motion.div
                                className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {/* Chat Header */}
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                            <Bot size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">OKBot Assistant</h3>
                                            <p className="text-xs text-green-100 flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                                Online now
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveMode("menu")}
                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        <ChevronUp size={20} />
                                    </button>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-2xl ${msg.isBot
                                                    ? "bg-white shadow-sm rounded-tl-none"
                                                    : "bg-green-500 text-white rounded-tr-none"
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                                <p className={`text-xs mt-1 ${msg.isBot ? "text-slate-400" : "text-green-100"}`}>
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-white shadow-sm p-3 rounded-2xl rounded-tl-none">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Quick Replies */}
                                <div className="px-4 py-2 bg-white border-t flex gap-2 overflow-x-auto">
                                    {quickReplies.map((reply) => (
                                        <button
                                            key={reply}
                                            onClick={() => handleQuickReply(reply)}
                                            className="flex-shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-green-100 text-slate-600 hover:text-green-700 text-xs rounded-full transition-colors"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-white border-t">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            sendMessage(inputValue);
                                        }}
                                        className="flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                                        />
                                        <button
                                            type="submit"
                                            className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center transition-colors"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
