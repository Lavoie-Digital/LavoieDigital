import type { MetadataRoute } from "next";
import { PROJECTS } from "./_components/projectsData";

const BASE = "https://lavoiedigital.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    // Primary search-intent landing pages — ranked just under the home page.
    {
      url: `${BASE}/creation-site-web-quebec`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE}/creation-application-web-quebec`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/approche`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/difference`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Portfolio raised to 0.85: it now holds real client work, not placeholders.
    { url: `${BASE}/travaux`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // One case study per project — each targets a sector + region query.
    ...PROJECTS.map((p) => ({
      url: `${BASE}/travaux/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
    { url: `${BASE}/booking`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Page légale : indexable pour la conformité Loi 25, mais sans poids SEO.
    {
      url: `${BASE}/politique-de-confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
