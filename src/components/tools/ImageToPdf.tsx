'use client';

import { useState, useRef } from 'react';

type Orient = 'auto' | 'portrait' | 'landscape';
type PageSize = 'a4' | 'letter' | 'legal';

export function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [orient, setOrient] = useState<Orient>('auto');
  const [pageSize, setPageSize] = useState<PageSize>('a4');
  const [margin, setMargin] = useState(20);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).filter(f => f.type.startsWith('image/'));
    if (arr.length === 0) { setErr('Please select image files'); return; }
    setErr(null);
    setFiles(prev => [...prev, ...arr]);
  };

  const remove = (i: number) => setFiles(files.filter((_, idx) => idx !== i));
  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...files];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setFiles(next);
  };

  const buildPdf = async () => {
    if (files.length === 0) return;
    setBusy(true); setErr(null);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'mm', format: pageSize, orientation: 'portrait' });
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result as string);
          r.onerror = reject;
          r.readAsDataURL(file);
        });
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = reject;
          im.src = dataUrl;
        });

        const isLandscape = orient === 'landscape' || (orient === 'auto' && img.width > img.height);
        if (i > 0) {
          doc.addPage(pageSize, isLandscape ? 'landscape' : 'portrait');
        } else if (isLandscape) {
          doc.deletePage(1);
          doc.addPage(pageSize, 'landscape');
        }

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const usableW = pageW - margin * 2;
        const usableH = pageH - margin * 2;
        const ratio = Math.min(usableW / img.width, usableH / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageW - w) / 2;
        const y = (pageH - h) / 2;
        const fmt = file.type === 'image/png' ? 'PNG' : 'JPEG';
        doc.addImage(dataUrl, fmt, x, y, w, h);
      }
      doc.save(`pixshed-${Date.now()}.pdf`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'PDF build failed');
    } finally {
      setBusy(false);
    }
  };

  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }} onDragOver={(e) => e.preventDefault()} className="cursor-pointer p-10 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" multiple onChange={(e) => onFiles(e.target.files)} className="hidden" />
        <div className="text-5xl mb-3">📄</div>
        <p className="text-lg font-medium mb-1">{files.length === 0 ? 'Drop images here or click to browse' : `+ Add more (${files.length} added)`}</p>
        <p className="text-sm text-gray-500">JPG, PNG, WebP — drag to reorder</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-slate-800">
              <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
              <span className="flex-1 text-sm truncate">{f.name}</span>
              <span className="text-xs text-gray-500">{fmt(f.size)}</span>
              <button onClick={() => moveUp(i)} disabled={i === 0} className="px-2 py-1 text-xs rounded hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-30">↑</button>
              <button onClick={() => remove(i)} className="px-2 py-1 text-xs rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600">✕</button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3 p-5 rounded-xl border border-gray-200 dark:border-slate-800">
          <label className="block">
            <span className="block text-sm font-medium mb-2">Page size</span>
            <select value={pageSize} onChange={(e) => setPageSize(e.target.value as PageSize)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value="a4">A4</option>
              <option value="letter">US Letter</option>
              <option value="legal">US Legal</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-2">Orientation</span>
            <select value={orient} onChange={(e) => setOrient(e.target.value as Orient)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value="auto">Auto (per image)</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-2">Margin: {margin}mm</span>
            <input type="range" min="0" max="50" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full accent-emerald-500" />
          </label>
        </div>
      )}

      {err && <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">{err}</div>}

      {files.length > 0 && <button onClick={buildPdf} disabled={busy} className="w-full py-3 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium transition">{busy ? 'Building PDF…' : `Build PDF (${files.length} ${files.length === 1 ? 'image' : 'images'})`}</button>}
    </div>
  );
}
