'use client';

import { useState, useRef } from 'react';

export function RemoveBackground() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) { setErr('Please select an image file'); return; }
    setErr(null);
    setFile(f);
    setResult(null);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true); setErr(null); setProgress('Loading model (~30MB, first run only)…');
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      setProgress('Processing image…');
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) setProgress(`${key.replace(/_/g, ' ')}: ${Math.round((current / total) * 100)}%`);
        },
      });
      setResult({ url: URL.createObjectURL(blob as Blob), size: (blob as Blob).size, blob: blob as Blob });
      setProgress(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Background removal failed');
      setProgress(null);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!result || !file) return;
    const a = document.createElement('a');
    a.href = result.url;
    const base = file.name.replace(/\.[^.]+$/, '');
    a.download = `${base}-no-bg.png`;
    a.click();
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()} className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? (
          <>
            <div className="text-5xl mb-3">✨</div>
            <p className="text-lg font-medium mb-1">Drop image here or click to browse</p>
            <p className="text-sm text-gray-500">JPG, PNG, WebP — best results with clear subjects</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{fmt(file.size)}</p>
          </>
        )}
      </div>

      {err && <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">{err}</div>}

      {file && !result && (
        <button onClick={run} disabled={busy} className="w-full py-3 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium transition">
          {busy ? (progress || 'Processing…') : 'Remove Background'}
        </button>
      )}

      {result && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">✅ Background removed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Output: {fmt(result.size)} PNG with transparency</p>
            </div>
            <button onClick={download} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition whitespace-nowrap">Download PNG</button>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 16px 16px' }}>
            <img src={result.url} alt="Background-removed preview" className="w-full max-h-96 object-contain mx-auto" />
          </div>
        </div>
      )}

      <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400">
        <p><strong className="text-gray-900 dark:text-white">How it works:</strong> An ML model runs entirely in your browser to detect and isolate the foreground. The model (~30MB) loads on first use only — subsequent runs are instant. Your image never leaves your device.</p>
      </div>
    </div>
  );
}
