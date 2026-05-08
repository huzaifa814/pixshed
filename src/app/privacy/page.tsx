import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'Privacy Policy', description: `Privacy policy for ${siteConfig.name}.` };

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 7, 2026</p>
        <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
          <h2 className="text-2xl font-bold">Files & data you process</h2>
          <p><strong>{siteConfig.name} never receives, stores, or transmits your images.</strong> All image processing — compression, conversion, resizing — happens entirely in your browser using JavaScript and WebAssembly. Files you drop into our tools are read into your browser's memory, processed locally, and the result is returned to you for download. No server involvement.</p>

          <h2 className="text-2xl font-bold mt-8">Information we do collect</h2>
          <p>We collect standard web analytics (via Google Analytics): page views, country, device type, browser. This helps us understand which tools are popular and which need work. We do <em>not</em> collect file content, file names, or anything you process through our tools.</p>

          <h2 className="text-2xl font-bold mt-8">Cookies & advertising</h2>
          <p>We use Google AdSense to display ads on our pages. AdSense uses cookies to personalize ads, measure performance, and prevent fraud. You can opt out of personalized advertising at <a href="https://adssettings.google.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">Google Ad Settings</a>.</p>

          <h2 className="text-2xl font-bold mt-8">Third-party services</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics</strong> — anonymous traffic analytics</li>
            <li><strong>Google AdSense</strong> — display advertising</li>
            <li><strong>Vercel</strong> — hosting (no file content sees Vercel servers)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Children's privacy</h2>
          <p>{siteConfig.name} is not directed at children under 13. We do not knowingly collect data from children under 13.</p>

          <h2 className="text-2xl font-bold mt-8">Changes to this policy</h2>
          <p>We may update this policy as the service evolves. Material changes will be reflected by the "Last updated" date above.</p>

          <h2 className="text-2xl font-bold mt-8">Contact</h2>
          <p>Questions about this policy? Email <a href={`mailto:${siteConfig.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">{siteConfig.email}</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
