import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'About', description: `About ${siteConfig.name} — free, browser-based image tools.` };

export default function About() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">About {siteConfig.name}</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>{siteConfig.name} is a free image-tools site built around one principle: <strong>your images should never leave your device</strong>. Everything we do — compression, conversion, resizing, cropping — runs entirely in your browser using modern web technologies.</p>
          <h2 className="text-2xl font-bold mt-8 mb-3">Why we built it</h2>
          <p>Most online image tools upload your file to their servers, process it, and send it back. That works fine — but it means a copy of your image lives on someone else's infrastructure, even briefly. For sensitive photos (IDs, family pictures, legal evidence), that's a small but real privacy concern.</p>
          <p>We wanted a faster, more private alternative. {siteConfig.name} processes everything locally. Open Chrome DevTools, go to the Network tab, run any tool — you'll see zero outbound traffic with your file content.</p>
          <h2 className="text-2xl font-bold mt-8 mb-3">How we make money</h2>
          <p>Banner ads on tool pages. That's it. No subscriptions, no daily task limits, no signup walls, no Pro tier waiting to upsell you.</p>
          <h2 className="text-2xl font-bold mt-8 mb-3">Sister sites</h2>
          <p>{siteConfig.name} is part of a small portfolio of privacy-first browser tools. Check out <a href="https://www.pdfshed.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">PDFShed</a> for PDFs, <a href="https://www.simplycalcs.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">SimplyCalcs</a> for calculators, and <a href="https://www.resumeshed.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">ResumeShed</a> for resumes.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
