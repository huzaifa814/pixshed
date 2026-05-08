import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { tools } from '@/config/tools';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'All Tools', description: `Browse all ${siteConfig.name} image tools.` };

export default function Tools() {
  const byCategory = tools.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {} as Record<string, typeof tools>);

  const categoryLabels: Record<string, string> = {
    compress: 'Compress',
    convert: 'Convert',
    edit: 'Edit',
    optimize: 'Optimize',
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">All Image Tools</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Free, browser-based image processing. Pick a tool and get to work.</p>
        </header>
        {Object.entries(byCategory).map(([cat, items]) => (
          <section key={cat} className="mb-12">
            <h2 className="text-2xl font-bold mb-5">{categoryLabels[cat] || cat}</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {items.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 hover:shadow-md transition">
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">{tool.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{tool.description}</p>
                  {!tool.available && <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-400">Coming soon</span>}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
