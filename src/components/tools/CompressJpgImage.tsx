'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';

export function CompressJpgImage() {
  const [file, setFile] = useState<File | null>(null);
  const [out, setOut] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) { setErr('Please select an image file'); return; }
    setErr(null); setFile(f); setOut(null);
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true); setErr(null);
    try {
      const blob = await imageCompression(file, {
        maxSizeMB: 50,
        maxWidthOrHeight: 8192,
        useWebWorker: true,
        initialQuality: quality,
        fileType: 'image/jpeg',
      });
      setOut({ url: URL.createObjectURL(blob), size: blob.size, blob });
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Compression failed');
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!out || !file) return;
    const a = document.createElement('a');
    a.href = out.url;
    const base = file.name.replace(/\.[^.]+$/, '');
    a.download = `${base}-compressed.jpg`;
    a.click();
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;
  const reduction = file && out ? Math.round((1 - out.size / file.size) * 100) : 0;

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()} className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? (
          <>
            <div className="text-5xl mb-3">🖼️</div>
            <p className="text-lg font-medium mb-1">Drop image here or click to browse</p>
            <p className="text-sm text-gray-500">Output will always be JPG</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{fmt(file.size)}</p>
          </>
        )}
      </div>

      {file && (
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800">
          <label className="block text-sm font-medium mb-2">JPEG Quality: <span className="font-mono">{Math.round(quality * 100)}%</span></label>
          <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
          <p className="text-xs text-gray-500 mt-2">80% is the sweet spot. Below 60% gets visibly artifacted.</p>
        </div>
      )}

      {err && <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">{err}</div>}

      {file && <button onClick={compress} disabled={busy} className="w-full py-3 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium transition">{busy ? 'Compressing…' : 'Compress to JPG'}</button>}

      {out && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">✅ Compressed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{fmt(file.size)} → <strong>{fmt(out.size)}</strong> ({reduction}% smaller)</p>
            </div>
            <button onClick={download} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Download JPG</button>
          </div>
          <img src={out.url} alt="Preview" className="w-full max-h-64 object-contain rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
}
