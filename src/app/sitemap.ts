import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { tools } from '@/config/tools';
import { guides } from '@/content/guides';
import { alternatives } from '@/content/alternatives';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/tools', '/guides', '/alternatives', '/about', '/faq', '/privacy', '/terms', '/contact'];
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'daily' : 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
  for (const tool of tools) {
    entries.push({ url: `${siteConfig.url}/tools/${tool.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });
  }
  for (const g of guides) {
    entries.push({ url: `${siteConfig.url}/guides/${g.slug}`, lastModified: new Date(g.publishedAt), changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const a of alternatives) {
    entries.push({ url: `${siteConfig.url}/alternatives/${a.slug}`, lastModified: new Date(a.publishedAt), changeFrequency: 'monthly', priority: 0.5 });
  }
  return entries;
}
