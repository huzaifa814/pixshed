'use client';

import { useState, useRef, useEffect } from 'react';

export function WatermarkImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [text, setText] = useState('© Your Brand');
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(0.7);
  const [color, setColor] = useState('#ffffff');
  const [position, setPosition] = useState<'tl' | 'tr' | 'bl' | 'br' | 'center'>('br');
  const [output, setOutput] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (f: File | undefined) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setOutput(null);
  };

  const apply = () => {
    if (!file || !imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const fontSize = Math.round((size / 100) * Math.min(img.width, img.height) * 0.1);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      const metrics = ctx.measureText(text);
      const padding = fontSize * 0.5;
      let x = padding, y = fontSize + padding;
      if (position === 'tr') x = img.width - metrics.width - padding;
      if (position === 'bl') y = img.height - padding;
      if (position === 'br') { x = img.width - metrics.width - padding; y = img.height - padding; }
      if (position === 'center') { x = (img.width - metrics.width) / 2; y = (img.height + fontSize) / 2; }
      // Shadow for legibility
      ctx.shadowColor = color === '#ffffff' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
      ctx.shadowBlur = fontSize * 0.1;
      ctx.fillText(text, x, y);
      canvas.toBlob((blob) => {
        if (!blob) return;
        setOutput(URL.createObjectURL(blob));
      }, file.type, 0.92);
    };
    img.src = imgSrc;
  };

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 bg-gray-50 dark:bg-slate-900/50 text-center transition">
        <input ref={fileInput} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? <><div className="text-5xl mb-3">💧</div><p className="text-lg font-medium mb-1">Drop image to add watermark</p><p className="text-sm text-gray-500">Add text watermark with custom color/position</p></>
          : <><div className="text-5xl mb-3">✅</div><p className="font-medium">{file.name}</p></>}
      </div>
      {file && (
        <>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <label className="block">
              <span className="block text-sm font-medium mb-2">Watermark text</span>
              <input value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium mb-2">Size: {size}</span>
                <input type="range" min="10" max="100" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-emerald-500" />
              </label>
              <label className="block">
                <span className="block text-sm font-medium mb-2">Opacity: {Math.round(opacity * 100)}%</span>
                <input type="range" min="10" max="100" value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="w-full accent-emerald-500" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium mb-2">Color</span>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 dark:border-slate-700" />
              </label>
              <div>
                <span className="block text-sm font-medium mb-2">Position</span>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  {[['tl', '↖'], ['', ''], ['tr', '↗'], ['', ''], ['center', '●'], ['', ''], ['bl', '↙'], ['', ''], ['br', '↘']].map(([p, label], i) => (
                    p ? <button key={i} onClick={() => setPosition(p as any)} className={`py-2 rounded text-lg ${position === p ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200'}`}>{label}</button> : <div key={i}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button onClick={apply} className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Add Watermark</button>
        </>
      )}
      {output && file && (
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-semibold text-lg">✅ Watermark applied</h3>
            <a href={output} download={`watermarked-${file.name}`} className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition">Download</a>
          </div>
          <img src={output} alt="Watermarked" className="w-full max-h-64 object-contain rounded-lg bg-gray-100 dark:bg-slate-800" />
        </div>
      )}
    </div>
  );
}
