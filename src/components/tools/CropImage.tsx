'use client';

import { useState, useRef, useEffect } from 'react';

export function CropImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgDim, setImgDim] = useState<{ w: number; h: number } | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 100, h: 100 });
  const [cropped, setCropped] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgSrc(url);
    const img = new Image();
    img.onload = () => {
      setImgDim({ w: img.width, h: img.height });
      setCrop({ x: 0, y: 0, w: img.width, h: img.height });
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (f: File | undefined) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setCropped(null);
  };

  const setAspect = (ratio: number | null) => {
    if (!imgDim) return;
    if (ratio === null) { setCrop({ x: 0, y: 0, w: imgDim.w, h: imgDim.h }); return; }
    const targetW = Math.min(imgDim.w, imgDim.h * ratio);
    const targetH = targetW / ratio;
    setCrop({ x: (imgDim.w - targetW) / 2, y: (imgDim.h - targetH) / 2, w: targetW, h: targetH });
  };

  const apply = () => {
    if (!file || !imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.w;
      canvas.height = crop.h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setCropped(URL.createObjectURL(blob));
      }, file.type, 0.92);
    };
    img.src = imgSrc;
  };

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? <><div className="text-5xl mb-3">✂️</div><p className="text-lg font-medium mb-1">Drop image to crop</p><p className="text-sm text-gray-500">Numeric crop with aspect ratio presets</p></>
          : <><div className="text-5xl mb-3">✅</div><p className="font-medium">{file.name}</p>{imgDim && <p className="text-sm text-gray-500">{imgDim.w} × {imgDim.h} px</p>}</>}
      </div>
      {file && imgDim && (
        <>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div>
              <span className="block text-sm font-medium mb-2">Aspect ratio</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Free', value: null },
                  { label: 'Square 1:1', value: 1 },
                  { label: '4:3', value: 4 / 3 },
                  { label: '16:9', value: 16 / 9 },
                  { label: '3:2', value: 3 / 2 },
                  { label: '9:16', value: 9 / 16 },
                ].map(opt => (
                  <button key={opt.label} onClick={() => setAspect(opt.value)} className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700">{opt.label}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <label className="text-sm">
                <span className="block mb-1 text-gray-500">X</span>
                <input type="number" value={Math.round(crop.x)} onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) || 0 })} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </label>
              <label className="text-sm">
                <span className="block mb-1 text-gray-500">Y</span>
                <input type="number" value={Math.round(crop.y)} onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) || 0 })} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </label>
              <label className="text-sm">
                <span className="block mb-1 text-gray-500">Width</span>
                <input type="number" value={Math.round(crop.w)} onChange={(e) => setCrop({ ...crop, w: Number(e.target.value) || 1 })} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </label>
              <label className="text-sm">
                <span className="block mb-1 text-gray-500">Height</span>
                <input type="number" value={Math.round(crop.h)} onChange={(e) => setCrop({ ...crop, h: Number(e.target.value) || 1 })} className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </label>
            </div>
          </div>
          <button onClick={apply} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Crop</button>
        </>
      )}
      {cropped && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-semibold text-lg">✅ Cropped to {Math.round(crop.w)} × {Math.round(crop.h)}</h3>
            <a href={cropped} download={`cropped-${file.name}`} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Download</a>
          </div>
          <img src={cropped} alt="Cropped" className="w-full max-h-64 object-contain rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
}
