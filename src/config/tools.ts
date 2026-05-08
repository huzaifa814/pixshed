export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: 'compress' | 'convert' | 'edit' | 'optimize';
  available: boolean;
}

export const tools: Tool[] = [
  { slug: 'compress-image', title: 'Compress Image', description: 'Reduce JPG, PNG, WebP file size up to 90% without quality loss. Instant, in your browser.', icon: '🗜️', category: 'compress', available: true },
  { slug: 'resize-image', title: 'Resize Image', description: 'Resize images to any dimensions. Maintain aspect ratio or stretch to fit.', icon: '📐', category: 'edit', available: true },
  { slug: 'convert-image', title: 'Convert Image', description: 'Convert between JPG, PNG, WebP, and other formats. Keep quality, change extension.', icon: '🔄', category: 'convert', available: true },
  { slug: 'crop-image', title: 'Crop Image', description: 'Crop images to exact dimensions or aspect ratios. Preview before saving.', icon: '✂️', category: 'edit', available: true },
  { slug: 'rotate-image', title: 'Rotate Image', description: 'Rotate images 90°, 180°, 270° or by custom angle. Lossless rotation.', icon: '🔃', category: 'edit', available: true },
  { slug: 'remove-background', title: 'Remove Background', description: 'Auto-detect and remove image backgrounds. AI-powered, runs in your browser.', icon: '✨', category: 'edit', available: false },
  { slug: 'image-to-pdf', title: 'Image to PDF', description: 'Convert one or many images into a single PDF document.', icon: '📄', category: 'convert', available: false },
  { slug: 'compress-jpg', title: 'Compress JPG', description: 'JPEG-specific compression with quality slider. Smallest possible file size.', icon: '🖼️', category: 'compress', available: false },
  { slug: 'compress-png', title: 'Compress PNG', description: 'Lossless PNG compression. Reduce file size while keeping every pixel.', icon: '🖼️', category: 'compress', available: false },
  { slug: 'webp-converter', title: 'WebP Converter', description: 'Convert any image to modern WebP format for smaller, faster web images.', icon: '🚀', category: 'convert', available: false },
  { slug: 'image-watermark', title: 'Add Watermark', description: 'Add text or logo watermark to images. Single or batch.', icon: '💧', category: 'edit', available: true },
  { slug: 'image-compressor-batch', title: 'Batch Compress', description: 'Compress dozens of images at once. Drag, drop, download zip.', icon: '📦', category: 'optimize', available: false },
];

export const getTool = (slug: string) => tools.find(t => t.slug === slug);
export const getAvailableTools = () => tools.filter(t => t.available);
