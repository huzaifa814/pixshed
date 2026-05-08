import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'Terms of Service', description: `Terms of service for ${siteConfig.name}.` };

export default function Terms() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 7, 2026</p>
        <div className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed">
          <h2 className="text-2xl font-bold">Acceptance</h2>
          <p>By using {siteConfig.name}, you agree to these terms. If you don't agree, please don't use the service.</p>

          <h2 className="text-2xl font-bold mt-8">Service description</h2>
          <p>{siteConfig.name} provides free, browser-based image processing tools. The service is provided "as is" without warranty of any kind.</p>

          <h2 className="text-2xl font-bold mt-8">Acceptable use</h2>
          <p>Don't use {siteConfig.name} to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Process content that violates any law</li>
            <li>Harass, abuse, or harm others</li>
            <li>Reverse-engineer or scrape the service to compete with it</li>
            <li>Attempt to disrupt the service for other users</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Your content</h2>
          <p>You retain all rights to images you process. {siteConfig.name} never receives a copy because processing happens locally in your browser.</p>

          <h2 className="text-2xl font-bold mt-8">Limitation of liability</h2>
          <p>{siteConfig.name} is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the service. The service is provided free of charge.</p>

          <h2 className="text-2xl font-bold mt-8">Changes</h2>
          <p>These terms may be updated as the service evolves. Continued use after changes means you accept the new terms.</p>

          <h2 className="text-2xl font-bold mt-8">Contact</h2>
          <p>Questions? Email <a href={`mailto:${siteConfig.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">{siteConfig.email}</a>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
