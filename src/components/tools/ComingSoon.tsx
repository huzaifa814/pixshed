import Link from 'next/link';

export function ComingSoon({ toolTitle }: { toolTitle: string }) {
  return (
    <div className="p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 text-center">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold mb-2">{toolTitle} — Coming Soon</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">We&apos;re actively building this tool. In the meantime, try one of the tools below — they&apos;re live now.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/tools/compress-image" className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Compress Image</Link>
        <Link href="/tools/resize-image" className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium transition">Resize Image</Link>
        <Link href="/tools/convert-image" className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium transition">Convert Image</Link>
      </div>
    </div>
  );
}
