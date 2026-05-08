import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'Contact', description: `Contact ${siteConfig.name}.` };

export default function Contact() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Got a feature request, a bug report, or just want to say hi? Email us. We read everything.
        </p>
        <div className="p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-3xl mb-3">📬</div>
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <a href={`mailto:${siteConfig.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline text-lg">{siteConfig.email}</a>
          <p className="text-sm text-gray-500 mt-4">We typically respond within 1-2 business days.</p>
        </div>
        <div className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800">
          <h3 className="font-semibold mb-2">Common questions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Many questions are answered on our <a href="/faq" className="text-emerald-600 dark:text-emerald-400 hover:underline">FAQ page</a> — check there first.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
