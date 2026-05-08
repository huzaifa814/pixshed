import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { tools, getTool } from '@/config/tools';
import { siteConfig } from '@/config/site';
import { CompressImage } from '@/components/tools/CompressImage';
import { ResizeImage } from '@/components/tools/ResizeImage';
import { ConvertImage } from '@/components/tools/ConvertImage';
import { CropImage } from '@/components/tools/CropImage';
import { RotateImage } from '@/components/tools/RotateImage';
import { WatermarkImage } from '@/components/tools/WatermarkImage';
import { CompressJpgImage } from '@/components/tools/CompressJpgImage';
import { CompressPngImage } from '@/components/tools/CompressPngImage';
import { WebpConverter } from '@/components/tools/WebpConverter';
import { ImageToPdf } from '@/components/tools/ImageToPdf';
import { BatchCompress } from '@/components/tools/BatchCompress';
import { RemoveBackground } from '@/components/tools/RemoveBackground';
import { ComingSoon } from '@/components/tools/ComingSoon';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `${siteConfig.url}/tools/${slug}` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.title, item: `${siteConfig.url}/tools/${slug}` },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link> ·{' '}
          <Link href="/tools" className="hover:text-gray-900 dark:hover:text-white">Tools</Link> ·{' '}
          <span className="text-gray-900 dark:text-white">{tool.title}</span>
        </nav>
        <header className="mb-8">
          <div className="text-4xl mb-3">{tool.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{tool.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{tool.description}</p>
        </header>

        {slug === 'compress-image' && <CompressImage />}
        {slug === 'resize-image' && <ResizeImage />}
        {slug === 'convert-image' && <ConvertImage />}
        {slug === 'crop-image' && <CropImage />}
        {slug === 'rotate-image' && <RotateImage />}
        {slug === 'image-watermark' && <WatermarkImage />}
        {slug === 'compress-jpg' && <CompressJpgImage />}
        {slug === 'compress-png' && <CompressPngImage />}
        {slug === 'webp-converter' && <WebpConverter />}
        {slug === 'image-to-pdf' && <ImageToPdf />}
        {slug === 'image-compressor-batch' && <BatchCompress />}
        {slug === 'remove-background' && <RemoveBackground />}
        {!tool.available && <ComingSoon toolTitle={tool.title} />}

        <section className="mt-12 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
          <h2 className="font-semibold mb-2">🔒 100% Browser-Based</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">Your image is processed entirely in your browser. Nothing is uploaded. Verify in DevTools → Network tab — zero outbound traffic with file content.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
