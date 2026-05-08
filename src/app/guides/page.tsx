import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { guides } from '@/content/guides';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Tool Guides',
  description: 'How-to guides for image tasks — compress for email, resize for Instagram, remove backgrounds, convert formats, and more.',
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesIndex() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Image Tool Guides</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Practical, no-fluff guides on common image tasks — for social, email, web, and resumes.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{g.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{g.metaDescription}</p>
              <p className="text-xs text-gray-500 mt-3">{g.steps.length} steps · {g.faq.length} FAQs</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
