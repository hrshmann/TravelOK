// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { defaultPackages } from "@/data/packages";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.oktravels.ae";

    const staticPages = [
        { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
        { url: `${baseUrl}/holidays`, priority: 0.9, changeFrequency: "weekly" as const },
        { url: `${baseUrl}/visa`, priority: 0.9, changeFrequency: "weekly" as const },
        { url: `${baseUrl}/uae-tours`, priority: 0.8, changeFrequency: "weekly" as const },
        { url: `${baseUrl}/flights`, priority: 0.8, changeFrequency: "daily" as const },
        { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
        { url: `${baseUrl}/about`, priority: 0.6, changeFrequency: "monthly" as const },
        { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    ];

    const packagePages = defaultPackages.map((pkg) => ({
        url: `${baseUrl}/package/${pkg.slug}`,
        priority: 0.8,
        changeFrequency: "weekly" as const,
        lastModified: new Date(),
    }));

    return [
        ...staticPages.map((page) => ({
            ...page,
            lastModified: new Date(),
        })),
        ...packagePages,
    ];
}
