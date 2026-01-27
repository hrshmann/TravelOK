// src/components/home/BlogSection.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard, { BlogPost } from "../blog/BlogCard";

const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Top 10 Hidden Gems in Bali You Must Visit in 2024",
        excerpt: "Discover the lesser-known paradises in Bali that offer authentic experiences away from the tourist crowds.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        category: "Travel Tips",
        author: "Sarah Ahmed",
        date: "Jan 15, 2024",
        slug: "hidden-gems-bali-2024",
    },
    {
        id: "2",
        title: "How to Apply for a Schengen Visa: Complete Guide",
        excerpt: "Everything you need to know about applying for a Schengen visa, from documents to interview tips.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
        category: "Visa Guide",
        author: "Ahmed Khan",
        date: "Jan 12, 2024",
        slug: "schengen-visa-guide",
    },
    {
        id: "3",
        title: "Best Desert Safari Experiences in Dubai",
        excerpt: "From dune bashing to stargazing dinners, explore the ultimate desert safari adventures in Dubai.",
        image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
        category: "UAE Tours",
        author: "Fatima Al-Rashid",
        date: "Jan 10, 2024",
        slug: "desert-safari-dubai",
    },
];

export default function BlogSection() {
    return (
        <section className="py-20 md:py-28 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 text-sm font-semibold rounded-full mb-4">
                            📚 Travel Insights
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                            Latest from the Blog
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                    >
                        View All Articles
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
