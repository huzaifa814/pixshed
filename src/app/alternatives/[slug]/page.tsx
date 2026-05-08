import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { alternatives, getAlternative } from '@/content/alternatives';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return alternatives.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAlternative(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.metaDescription,
    alternates: { canonical: `${siteConfig.url}/alternatives/${slug}` },
  };
}

export default async function AlternativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAlternative(slug);
  if (!a) notFound();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link> ·{' '}
          <Link href="/alternatives" className="hover:text-gray-900 dark:hover:text-white">Alternatives</Link> ·{' '}
          <span className="text-gray-900 dark:text-white">vs {a.competitor}</span>
        </nav>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{a.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{a.intro}</p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 mb-10">
          <section className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h2 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-400">{a.competitor} pros</h2>
            <ul className="space-y-2 text-sm list-disc pl-5">{a.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </section>
          <section className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h2 className="font-semibold mb-3 text-red-700 dark:text-red-400">{a.competitor} cons</h2>
            <ul className="space-y-2 text-sm list-disc pl-5">{a.cons.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </section>
        </div>

        <section className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 mb-10">
          <h2 className="font-semibold mb-3">Where PixShed is better</h2>
          <ul className="space-y-2 text-sm list-disc pl-5">{a.ourAdvantages.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800">
            <h3 className="font-semibold mb-2">Use {a.competitor} when</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{a.whenToUseThem}</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800">
            <h3 className="font-semibold mb-2">Use PixShed when</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{a.whenToUseUs}</p>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link href="/tools" className="inline-block px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition">Browse all tools →</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
