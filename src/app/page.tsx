import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';
import { tools } from '@/config/tools';

export default function HomePage() {
  const featured = tools.slice(0, 6);
  return (
    <>
      <Header />
      <main>
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-6">
            🔒 100% Browser-Based · No Upload · No Signup
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Free Online <span style={{ color: siteConfig.brandColor }}>Image Tools</span> — Right in Your Browser
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Compress, convert, resize, and edit images without uploading a single byte. Everything runs locally on your device. Free forever.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition" style={{ background: siteConfig.brandColor }}>
              Browse Tools →
            </Link>
            <Link href="/tools/compress-image" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-700 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              Try Compressor
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              { icon: '🔒', title: 'Files Stay Private', body: 'Your images never leave your device. Processing happens in your browser using WebAssembly. Verifiable in DevTools.' },
              { icon: '⚡', title: 'Lightning Fast', body: 'No upload time. No queue. Compress a 50 MB image in seconds. Works offline once loaded.' },
              { icon: '💯', title: 'Free Forever', body: 'No signup. No daily limits. No watermarks. No paywall. Just tools that work.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Tools</h2>
            <Link href="/tools" className="text-sm font-medium hover:underline" style={{ color: siteConfig.brandColor }}>View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 hover:shadow-md transition">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">{tool.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{tool.description}</p>
                {!tool.available && <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-400">Coming soon</span>}
              </Link>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
          <div className="p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to compress your first image?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">No upload. No signup. Drop your file and get a smaller version in seconds.</p>
            <Link href="/tools/compress-image" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition" style={{ background: siteConfig.brandColor }}>Open Compressor →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
