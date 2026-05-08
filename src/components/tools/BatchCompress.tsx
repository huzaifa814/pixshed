'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';

interface Item {
  id: number;
  file: File;
  status: 'pending' | 'done' | 'error';
  blob?: Blob;
  outSize?: number;
  error?: string;
}

export function BatchCompress() {
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [maxSize, setMaxSize] = useState(1);
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).filter(f => f.type.startsWith('image/'));
    setItems(prev => [...prev, ...arr.map(file => ({ id: ++idRef.current, file, status: 'pending' as const }))]);
  };

  const remove = (id: number) => setItems(items.filter(i => i.id !== id));
  const clear = () => setItems([]);

  const run = async () => {
    setBusy(true);
    const next = [...items];
    for (let i = 0; i < next.length; i++) {
      if (next[i].status === 'done') continue;
      try {
        const blob = await imageCompression(next[i].file, {
          maxSizeMB: maxSize,
          maxWidthOrHeight: 4096,
          useWebWorker: true,
          initialQuality: quality,
        });
        next[i] = { ...next[i], status: 'done', blob, outSize: blob.size };
      } catch (e) {
        next[i] = { ...next[i], status: 'error', error: e instanceof Error ? e.message : 'failed' };
      }
      setItems([...next]);
    }
    setBusy(false);
  };

  const downloadAll = async () => {
    const done = items.filter(i => i.status === 'done' && i.blob);
    if (done.length === 0) return;
    if (done.length === 1) {
      const it = done[0];
      const a = document.createElement('a');
      a.href = URL.createObjectURL(it.blob!);
      a.download = `compressed-${it.file.name}`;
      a.click();
      return;
    }
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    for (const it of done) zip.file(`compressed-${it.file.name}`, it.blob!);
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pixshed-batch-${Date.now()}.zip`;
    a.click();
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;
  const totalIn = items.reduce((s, i) => s + i.file.size, 0);
  const totalOut = items.reduce((s, i) => s + (i.outSize || 0), 0);
  const doneCount = items.filter(i => i.status === 'done').length;

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }} onDragOver={(e) => e.preventDefault()} className="cursor-pointer p-10 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" multiple onChange={(e) => onFiles(e.target.files)} className="hidden" />
        <div className="text-5xl mb-3">📦</div>
        <p className="text-lg font-medium mb-1">{items.length === 0 ? 'Drop images here or click to browse' : `+ Add more (${items.length} loaded)`}</p>
        <p className="text-sm text-gray-500">No upload limit — runs in your browser</p>
      </div>

      {items.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 p-5 rounded-xl border border-gray-200 dark:border-slate-800">
          <label className="block">
            <span className="block text-sm font-medium mb-2">Quality: <span className="font-mono">{Math.round(quality * 100)}%</span></span>
            <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-2">Target max: <span className="font-mono">{maxSize} MB</span></span>
            <input type="range" min="0.1" max="10" step="0.1" value={maxSize} onChange={(e) => setMaxSize(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
          </label>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="flex flex-wrap gap-3">
            <button onClick={run} disabled={busy} className="flex-1 min-w-[200px] py-3 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium transition">{busy ? `Compressing… (${doneCount}/${items.length})` : `Compress all (${items.length})`}</button>
            {doneCount > 0 && <button onClick={downloadAll} className="py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition">{doneCount === 1 ? 'Download' : `Download ZIP (${doneCount})`}</button>}
            <button onClick={clear} className="py-3 px-4 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition">Clear</button>
          </div>

          {doneCount === items.length && doneCount > 0 && (
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-sm">
              <strong>Done:</strong> {fmt(totalIn)} → {fmt(totalOut)} ({Math.round((1 - totalOut / totalIn) * 100)}% smaller)
            </div>
          )}

          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-slate-800">
                <span className="text-xl">{item.status === 'done' ? '✅' : item.status === 'error' ? '❌' : '⏳'}</span>
                <span className="flex-1 text-sm truncate">{item.file.name}</span>
                <span className="text-xs text-gray-500">
                  {item.status === 'done' && item.outSize ? `${fmt(item.file.size)} → ${fmt(item.outSize)}` : fmt(item.file.size)}
                </span>
                <button onClick={() => remove(item.id)} className="px-2 py-1 text-xs rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600">✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
