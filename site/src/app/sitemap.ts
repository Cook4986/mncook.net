import type { MetadataRoute } from 'next';
import { SECTION_LINKS } from '@/content/sections';

const BASE = 'https://mncook.net';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...SECTION_LINKS.map((s) => ({
      url: `${BASE}${s.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
