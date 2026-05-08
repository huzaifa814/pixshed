'use client';

import { useState, useRef } from 'react';

const FORMATS = [
  { value: 'image/jpeg', label: 'JPG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
];

export function ConvertImage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('image/webp');
  const [quality, setQuality] = useState(0.92);
  const [converted, setConverted] = useState<{ url: string; size: number; ext: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | undefined) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setConverted(null);
  };

  const convert = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      if (format === 'image/jpeg') { ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const fmt = FORMATS.find(f => f.value === format)!;
        setConverted({ url: URL.createObjectURL(blob), size: blob.size, ext: fmt.ext });
      }, format, quality);
    };
    img.src = URL.createObjectURL(file);
  };

  const formatSize = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? <><div className="text-5xl mb-3">🔄</div><p className="text-lg font-medium mb-1">Drop image to convert</p><p className="text-sm text-gray-500">JPG · PNG · WebP · BMP · GIF</p></>
          : <><div className="text-5xl mb-3">✅</div><p className="font-medium">{file.name}</p><p className="text-sm text-gray-500">{formatSize(file.size)} · current: {file.type.split('/')[1].toUpperCase()}</p></>}
      </div>
      {file && (
        <>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800">
            <label className="block text-sm font-medium mb-3">Convert to</label>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button key={f.value} onClick={() => setFormat(f.value)} className={`px-4 py-2 rounded-lg font-medium transition ${format === f.value ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>{f.label}</button>
              ))}
            </div>
            {format !== 'image/png' && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Quality: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
              </div>
            )}
          </div>
          <button onClick={convert} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Convert</button>
        </>
      )}
      {converted && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div><h3 className="font-semibold text-lg mb-1">✅ Converted to {converted.ext.toUpperCase()}</h3><p className="text-sm text-gray-600 dark:text-gray-400">New size: <strong>{formatSize(converted.size)}</strong></p></div>
            <a href={converted.url} download={`${file.name.replace(/\.[^.]+$/, '')}.${converted.ext}`} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Download</a>
          </div>
          <img src={converted.url} alt="Converted preview" className="w-full max-h-64 object-contain rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
}
