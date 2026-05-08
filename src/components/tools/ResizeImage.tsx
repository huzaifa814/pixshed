'use client';

import { useState, useRef } from 'react';

export function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [resized, setResized] = useState<{ url: string; w: number; h: number } | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [keepAspect, setKeepAspect] = useState(true);
  const [origDim, setOrigDim] = useState<{ w: number; h: number } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setResized(null);
    const img = new Image();
    img.onload = () => {
      setOrigDim({ w: img.width, h: img.height });
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = URL.createObjectURL(f);
  };

  const resize = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResized({ url, w: width, h: height });
      }, file.type, 0.92);
    };
    img.src = URL.createObjectURL(file);
  };

  const onWidthChange = (w: number) => {
    setWidth(w);
    if (keepAspect && origDim) setHeight(Math.round(w * (origDim.h / origDim.w)));
  };
  const onHeightChange = (h: number) => {
    setHeight(h);
    if (keepAspect && origDim) setWidth(Math.round(h * (origDim.w / origDim.h)));
  };

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? <><div className="text-5xl mb-3">📐</div><p className="text-lg font-medium mb-1">Drop image to resize</p><p className="text-sm text-gray-500">Original dimensions auto-detected</p></>
          : <><div className="text-5xl mb-3">✅</div><p className="font-medium">{file.name}</p>{origDim && <p className="text-sm text-gray-500">{origDim.w} × {origDim.h} px</p>}</>}
      </div>
      {file && (
        <>
          <div className="grid gap-4 md:grid-cols-2 p-5 rounded-xl border border-gray-200 dark:border-slate-800">
            <label className="block">
              <span className="block text-sm font-medium mb-2">Width (px)</span>
              <input type="number" value={width} onChange={(e) => onWidthChange(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Height (px)</span>
              <input type="number" value={height} onChange={(e) => onHeightChange(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </label>
            <label className="flex items-center gap-2 col-span-full">
              <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} className="accent-emerald-500" />
              <span className="text-sm">Keep aspect ratio</span>
            </label>
          </div>
          <button onClick={resize} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Resize</button>
        </>
      )}
      {resized && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div><h3 className="font-semibold text-lg mb-1">✅ Resized to {resized.w} × {resized.h}</h3></div>
            <a href={resized.url} download={`resized-${file.name}`} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Download</a>
          </div>
          <img src={resized.url} alt="Resized preview" className="w-full max-h-64 object-contain rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
}
