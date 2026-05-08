import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'FAQ', description: `Frequently asked questions about ${siteConfig.name}.` };

const faqs = [
  { q: 'Is PixShed really free?', a: 'Yes — completely free, ad-supported. No subscriptions, no daily limits, no signup walls, no premium tier.' },
  { q: 'Do you upload my images?', a: 'No. All image processing happens in your browser using JavaScript and WebAssembly. Your files never leave your device. You can verify this by opening Chrome DevTools → Network tab and watching for zero outbound traffic with file content.' },
  { q: 'What file formats do you support?', a: 'JPG, PNG, WebP, BMP, GIF, and HEIC for input. JPG, PNG, and WebP for output. More formats coming.' },
  { q: 'How big can my files be?', a: 'Browser memory is the only real limit. Modern laptops handle 100-200 MB images comfortably. For larger files, close other browser tabs first.' },
  { q: 'Is the compressed image lossless?', a: 'Depends on the format and quality setting. PNG compression is lossless. JPG/WebP are lossy by default but high-quality settings are visually identical to the original.' },
  { q: 'Will my image quality drop?', a: 'You control quality via a slider on every tool. At 80% quality (default), JPG output is visually identical to the original for most photos with 60-80% smaller file size.' },
  { q: 'Can I use PixShed offline?', a: 'After loading the page once, most tools work offline. The browser caches the processing code locally.' },
  { q: 'Is PixShed safe for personal photos / IDs?', a: 'Yes — arguably safer than server-based tools because your photo never leaves your device. There\'s no server-side copy that could be leaked, subpoenaed, or accidentally retained.' },
  { q: 'How do you make money if it\'s free?', a: 'Banner ads on tool pages (Google AdSense). That\'s the entire business model. We don\'t collect or sell user data.' },
  { q: 'Why isn\'t the tool I need available yet?', a: 'We\'re actively building. The tools showing "Coming soon" are next on the roadmap. Email us if there\'s a specific tool you need urgently.' },
];

export default function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">Everything you might want to know about {siteConfig.name}.</p>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <summary className="font-semibold cursor-pointer flex items-start justify-between gap-4">
                <span>{f.q}</span>
                <span className="text-gray-400 group-open:rotate-90 transition-transform">›</span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
