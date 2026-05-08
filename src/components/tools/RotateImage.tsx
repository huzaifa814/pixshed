'use client';

import { useState, useRef, useEffect } from 'react';

export function RotateImage() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(0);
  const [rotated, setRotated] = useState<{ url: string; size: number } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (f: File | undefined) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setRotated(null);
    setAngle(0);
  };

  const rotate = () => {
    if (!file || !imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const radians = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      canvas.width = img.width * cos + img.height * sin;
      canvas.height = img.width * sin + img.height * cos;
      const ctx = canvas.getContext('2d')!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setRotated({ url: URL.createObjectURL(blob), size: blob.size });
      }, file.type, 0.92);
    };
    img.src = imgSrc;
  };

  const fmt = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? <><div className="text-5xl mb-3">🔃</div><p className="text-lg font-medium mb-1">Drop image to rotate</p><p className="text-sm text-gray-500">90° increments or any angle</p></>
          : <><div className="text-5xl mb-3">✅</div><p className="font-medium">{file.name}</p><p className="text-sm text-gray-500">{fmt(file.size)}</p></>}
      </div>
      {file && imgSrc && (
        <>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div>
              <span className="block text-sm font-medium mb-2">Quick rotate</span>
              <div className="grid grid-cols-4 gap-2">
                {[90, 180, 270, 0].map(a => (
                  <button key={a} onClick={() => setAngle(a)} className={`py-2 rounded-lg text-sm font-medium transition ${angle === a ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>{a === 0 ? 'Reset' : `${a}°`}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium mb-2">Custom angle: {angle}°</span>
              <input type="range" min="0" max="359" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div className="flex justify-center pt-2">
              <img src={imgSrc} alt="Preview" style={{ transform: `rotate(${angle}deg)`, maxHeight: 240 }} className="transition-transform max-w-full object-contain" />
            </div>
          </div>
          <button onClick={rotate} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Apply Rotation</button>
        </>
      )}
      {rotated && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div><h3 className="font-semibold text-lg mb-1">✅ Rotated {angle}°</h3><p className="text-sm text-gray-600 dark:text-gray-400">{fmt(rotated.size)}</p></div>
            <a href={rotated.url} download={`rotated-${file.name}`} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Download</a>
          </div>
          <img src={rotated.url} alt="Rotated" className="w-full max-h-64 object-contain rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
}
