import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { guides, getGuide } from '@/content/guides';
import { getTool } from '@/config/tools';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.metaDescription,
    keywords: g.keywords,
    alternates: { canonical: `${siteConfig.url}/guides/${slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const tool = getTool(g.relatedTool);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: g.title,
    description: g.metaDescription,
    datePublished: g.publishedAt,
    step: g.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: g.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link> ·{' '}
          <Link href="/guides" className="hover:text-gray-900 dark:hover:text-white">Guides</Link> ·{' '}
          <span className="text-gray-900 dark:text-white">{g.title}</span>
        </nav>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{g.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{g.intro}</p>
        </header>

        {tool && (
          <Link href={`/tools/${tool.slug}`} className="block p-5 mb-8 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 hover:border-emerald-500 transition">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{tool.icon}</span>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5">Use the calculator</p>
                <p className="font-semibold">{tool.title}</p>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400">→</span>
            </div>
          </Link>
        )}

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Step-by-step</h2>
          <ol className="space-y-5">
            {g.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {g.tips.length > 0 && (
          <section className="mb-10 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
            <h2 className="text-xl font-bold mb-3">💡 Tips</h2>
            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200 list-disc pl-5">
              {g.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </section>
        )}

        {g.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-4">
              {g.faq.map((f, i) => (
                <details key={i} className="p-4 rounded-xl border border-gray-200 dark:border-slate-800">
                  <summary className="font-semibold cursor-pointer">{f.q}</summary>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
