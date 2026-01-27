// src/app/blog/page.tsx
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlogCard, { BlogPost } from "@/components/blog/BlogCard";

const allBlogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Top 10 Hidden Gems in Bali You Must Visit in 2024",
        excerpt: "Discover the lesser-known paradises in Bali that offer authentic experiences away from the tourist crowds. From secret waterfalls to untouched beaches.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        category: "Travel Tips",
        author: "Sarah Ahmed",
        date: "Jan 15, 2024",
        slug: "hidden-gems-bali-2024",
    },
    {
        id: "2",
        title: "How to Apply for a Schengen Visa: Complete Guide",
        excerpt: "Everything you need to know about applying for a Schengen visa, from required documents to interview tips and common mistakes to avoid.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
        category: "Visa Guide",
        author: "Ahmed Khan",
        date: "Jan 12, 2024",
        slug: "schengen-visa-guide",
    },
    {
        id: "3",
        title: "Best Desert Safari Experiences in Dubai",
        excerpt: "From dune bashing to stargazing dinners, explore the ultimate desert safari adventures in Dubai. Tips for choosing the right package.",
        image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
        category: "UAE Tours",
        author: "Fatima Al-Rashid",
        date: "Jan 10, 2024",
        slug: "desert-safari-dubai",
    },
    {
        id: "4",
        title: "Maldives on a Budget: Tips for an Affordable Luxury Trip",
        excerpt: "Think the Maldives is only for the rich? Think again! Here are proven tips to experience paradise without breaking the bank.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        category: "Budget Travel",
        author: "Omar Hassan",
        date: "Jan 8, 2024",
        slug: "maldives-budget-travel",
    },
    {
        id: "5",
        title: "Thailand vs Vietnam: Which Southeast Asian Gem is Right for You?",
        excerpt: "A comprehensive comparison of two of Southeast Asia's most popular destinations to help you plan your next adventure.",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
        category: "Destination Guides",
        author: "Priya Sharma",
        date: "Jan 5, 2024",
        slug: "thailand-vs-vietnam",
    },
    {
        id: "6",
        title: "Essential Packing List for Your First International Trip",
        excerpt: "Never forget anything important again! Our comprehensive packing checklist covers everything from documents to tech gadgets.",
        image: "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=800",
        category: "Travel Tips",
        author: "Sarah Ahmed",
        date: "Jan 3, 2024",
        slug: "international-packing-list",
    },
];

const categories = [
    "All",
    "Travel Tips",
    "Visa Guide",
    "UAE Tours",
    "Destination Guides",
    "Budget Travel",
];

export default function BlogPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
                        📚 Travel Insights
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Travel Blog
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Expert travel tips, destination guides, visa information, and inspiration
                        for your next adventure.
                    </p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-12 -mt-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Image */}
                            <div className="relative h-64 lg:h-auto">
                                <Image
                                    src={allBlogPosts[0].image}
                                    alt={allBlogPosts[0].title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                        FEATURED
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-4 w-fit">
                                    {allBlogPosts[0].category}
                                </span>
                                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                                    {allBlogPosts[0].title}
                                </h2>
                                <p className="text-slate-600 mb-6">
                                    {allBlogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span>{allBlogPosts[0].author}</span>
                                    <span>•</span>
                                    <span>{allBlogPosts[0].date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-amber-100 hover:text-amber-700 bg-slate-100 text-slate-600 first:bg-gradient-to-r first:from-amber-500 first:to-orange-500 first:text-white first:shadow-md"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allBlogPosts.slice(1).map((post, i) => (
                            <ScrollReveal key={post.id} delay={i * 0.1}>
                                <BlogCard post={post} />
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
