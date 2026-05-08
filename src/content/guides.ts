export interface GuideStep { title: string; body: string }
export interface GuideFAQ { q: string; a: string }
export interface Guide {
  slug: string;
  title: string;
  query: string;
  metaDescription: string;
  intro: string;
  steps: GuideStep[];
  tips: string[];
  faq: GuideFAQ[];
  relatedTool: string;
  keywords: string[];
  publishedAt: string;
}

export const guides: Guide[] = [
  {
    slug: 'compress-image-for-email',
    title: 'How to Compress an Image for Email (Under 25 MB Gmail Limit)',
    query: 'compress image for email',
    metaDescription: 'Image too big to email? Compress JPG, PNG, or WebP files under any email attachment limit. Free, browser-based, no upload.',
    intro: 'Modern phones shoot 3-5 MB photos. Pro cameras and screenshots can hit 20-30 MB. Email clients reject anything over their limit — Gmail 25 MB total, Outlook 20 MB, Yahoo 25 MB. Here\'s how to compress images down to email-friendly sizes in seconds without sacrificing visible quality.',
    steps: [
      { title: 'Open Compress Image', body: 'Use our Compress Image tool. Files stay on your device — nothing uploads.' },
      { title: 'Drop in your image', body: 'Drag the photo onto the upload area or click to browse. JPG, PNG, WebP, BMP all work.' },
      { title: 'Pick a target quality', body: '80% is the sweet spot for email — visually identical to original at half the file size. Drop to 60-70% for ultra-small files.' },
      { title: 'Set max size', body: 'Use the slider to cap at 1-2 MB for most email purposes. The compressor will iterate down to hit your target.' },
      { title: 'Download and attach', body: 'Click Download, attach to your email, send. The whole flow takes about 20 seconds.' },
    ],
    tips: [
      'For multiple images, use the Batch Compress tool — it zips all results so you only download once.',
      'If you need lossless compression (no quality drop), pick PNG output and rely on dimension downscaling instead.',
      'For sending many photos, consider attaching as a ZIP — clients accept ZIPs even when individual files would be rejected.',
    ],
    faq: [
      { q: 'Will compression make my photo look blurry?', a: 'At 80% quality, no — most viewers can\'t tell the difference. Below 60%, JPEG artifacts (blocking around edges) become visible.' },
      { q: 'Can I compress a PDF the same way?', a: 'PDFs need a different tool. Use PDFShed\'s compressor for PDFs — same browser-based, no-upload approach.' },
      { q: 'Does compression strip metadata?', a: 'Most compressors preserve EXIF (camera info, date, location) by default. Strip metadata if you\'re sending photos and don\'t want to share GPS coordinates.' },
    ],
    relatedTool: 'compress-image',
    keywords: ['compress image for email', 'reduce image file size', 'image too big email', 'jpg compressor'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'resize-image-for-instagram',
    title: 'How to Resize an Image for Instagram (Posts, Stories, Reels)',
    query: 'resize image for instagram',
    metaDescription: 'Resize images to Instagram\'s exact dimensions: 1080x1080 posts, 1080x1350 portraits, 1080x1920 stories. Free, in your browser.',
    intro: 'Instagram displays your image at one of four aspect ratios — 1:1, 4:5, 1.91:1, or 9:16 — and crops anything that doesn\'t fit. Resize before uploading to control exactly what shows. Here are the canonical dimensions and how to hit them with our Resize Image tool.',
    steps: [
      { title: 'Pick the format you\'re posting', body: 'Square post: 1080×1080. Portrait post: 1080×1350. Landscape: 1080×566. Story/Reel: 1080×1920. Carousel: same as posts.' },
      { title: 'Open Resize Image', body: 'Drop your photo into the Resize Image tool.' },
      { title: 'Enter the target dimensions', body: 'Type the width and height matching your post type. Toggle "maintain aspect ratio" off if you want exact dimensions even when it stretches.' },
      { title: 'Optionally compress after resizing', body: 'Run the result through Compress Image at 80-85% quality — Instagram re-compresses anyway, so smaller upload = same final quality.' },
      { title: 'Download and upload', body: 'Save to your device, transfer to phone if needed, post.' },
    ],
    tips: [
      'Instagram\'s safe zone for Stories is the middle 1080×1420 — top/bottom 250px get covered by UI elements.',
      'Reels show full 9:16 by default but trim if your subject is near edges. Center important content vertically.',
      'For carousels with mixed sizes, Instagram crops all to match the first image\'s aspect ratio.',
    ],
    faq: [
      { q: 'Why does Instagram blur my image after upload?', a: 'They re-compress aggressively. Upload sharper than needed — slight over-resolution before Instagram\'s pass usually preserves quality.' },
      { q: 'Can I post landscape images?', a: 'Yes, 1.91:1 aspect — but they show smaller in the feed than portrait. Most creators stick to portrait or square for engagement.' },
      { q: 'What about profile picture?', a: '320×320 minimum, displayed as a 110px circle. Crop your face into the center; the corners get clipped by the circle mask.' },
    ],
    relatedTool: 'resize-image',
    keywords: ['resize image for instagram', 'instagram dimensions', 'instagram post size', 'image resizer'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'convert-png-to-jpg',
    title: 'How to Convert PNG to JPG (And When You Should)',
    query: 'convert png to jpg',
    metaDescription: 'Convert PNG to JPG to shrink file size by 70-90%. Free, browser-based — no upload, no signup, no watermarks.',
    intro: 'PNG is great when you need transparency or pixel-perfect quality (logos, screenshots, diagrams). JPG is great when you don\'t (photographs, complex images). Converting PNG photos to JPG often shrinks file size 70-90% with no visible quality loss.',
    steps: [
      { title: 'Decide if conversion makes sense', body: 'Photographs: yes, JPG saves a lot. Logos with transparency: no, you\'ll lose the transparent background. Screenshots of text: PNG stays sharper.' },
      { title: 'Open Convert Image', body: 'Drop your PNG into the Convert Image tool.' },
      { title: 'Choose JPG as the target format', body: 'Pick JPG from the format selector. The converter handles the transparency by flattening to white (or your chosen color).' },
      { title: 'Set quality', body: '85% is recommended — visually indistinguishable from the original PNG at a fraction of the size.' },
      { title: 'Download', body: 'Save the JPG. Compare file sizes — typical PNG photo: 5 MB → 700 KB JPG.' },
    ],
    tips: [
      'For screenshots of text/code, keep PNG — JPG compression artifacts around sharp edges look worse than the size savings.',
      'WebP often beats both PNG and JPG for the same use case at smaller size — try the WebP Converter if your destination supports it.',
      'Converting JPG to PNG is rarely useful — you can\'t recover quality JPEG already discarded.',
    ],
    faq: [
      { q: 'Will I lose transparency converting PNG to JPG?', a: 'Yes — JPG doesn\'t support transparency. Transparent areas become solid (white by default).' },
      { q: 'Is there a quality loss?', a: 'JPG is lossy compression, so technically yes. At 85%+ quality, the loss is invisible to the human eye on photographs.' },
      { q: 'Can I convert in bulk?', a: 'Yes — use Batch Compress with the format set to JPG. Process dozens of PNGs at once and download as a ZIP.' },
    ],
    relatedTool: 'convert-image',
    keywords: ['convert png to jpg', 'png to jpg', 'image format converter', 'reduce png size'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'compress-png-without-losing-quality',
    title: 'How to Compress PNG Without Losing Quality (Lossless)',
    query: 'compress png without losing quality',
    metaDescription: 'Lossless PNG compression cuts file size 30-70% without changing a single pixel. Free, runs in your browser.',
    intro: 'PNG is already a lossless format, but most PNGs you encounter are not maximally compressed. Re-encoding through a good optimizer typically shrinks them 30-70% without changing a pixel. Here\'s how.',
    steps: [
      { title: 'Open Compress PNG', body: 'Drop your PNG into the dedicated Compress PNG tool.' },
      { title: 'Keep dimensions or downscale', body: 'For lossless: leave dimensions alone. The compression comes from re-encoding only.' },
      { title: 'Optionally cap max dimension', body: 'If you don\'t need full resolution, downscale to your actual display size — biggest savings come from fewer pixels.' },
      { title: 'Download', body: 'Save the optimized PNG. Compare with the original — most save 40-50%.' },
    ],
    tips: [
      'Logos, screenshots, and graphics with limited colors compress hardest in PNG. Photos in PNG are huge — convert to JPG instead.',
      'For maximum PNG compression, look at tools like pngquant (lossy 8-bit palette) — drops file size dramatically with barely-visible color loss.',
      'If your image will be re-saved by another tool downstream, no point optimizing — it\'ll get re-encoded anyway.',
    ],
    faq: [
      { q: 'How is "lossless" possible on already-compressed PNG?', a: 'PNG\'s built-in compression has many parameter choices. Most encoders pick fast defaults; aggressive re-encoding finds smaller representations of the exact same pixel data.' },
      { q: 'Will animated PNGs (APNG) work?', a: 'Standard PNG tools strip animation. For APNG, look for an APNG-specific optimizer.' },
      { q: 'When should I switch to WebP instead?', a: 'WebP lossless is typically 25-30% smaller than PNG with no quality difference. Use WebP if your audience is on modern browsers (95%+ support).' },
    ],
    relatedTool: 'compress-png',
    keywords: ['compress png lossless', 'png optimizer', 'shrink png', 'reduce png size'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'crop-image-to-square',
    title: 'How to Crop Image to Square (1:1 Aspect Ratio)',
    query: 'crop image square',
    metaDescription: 'Crop any photo to a perfect 1:1 square — for Instagram, profile pictures, product photos. Free crop tool, no upload.',
    intro: 'Square crops are everywhere — Instagram posts, profile photos, product thumbnails. Here\'s how to nail a 1:1 crop without distortion using the Crop Image tool.',
    steps: [
      { title: 'Open Crop Image', body: 'Drop your photo into the Crop tool.' },
      { title: 'Lock aspect ratio to 1:1', body: 'Pick the 1:1 preset from the aspect ratio selector. The crop selection now stays square as you drag.' },
      { title: 'Drag to position the crop', body: 'Move the selection to capture your subject. For headshots, position eyes about 1/3 from the top of the frame.' },
      { title: 'Resize the crop', body: 'Drag the corner handles to expand or shrink while staying square.' },
      { title: 'Apply and download', body: 'Click Crop, then Download. Result is a perfect square.' },
    ],
    tips: [
      'Common square sizes: 1080×1080 (Instagram), 600×600 (profile), 400×400 (thumbnail). Resize after cropping if needed.',
      'For product photos, leave 10-15% margin around the subject — gives breathing room and looks professional.',
      'Don\'t crop too aggressively if the destination might re-crop further (some platforms add their own framing).',
    ],
    faq: [
      { q: 'Can I crop to other ratios?', a: 'Yes — 4:5 (portrait), 16:9 (landscape), 4:3 (classic photo), or freeform. Pick from the aspect selector.' },
      { q: 'Will cropping reduce quality?', a: 'No — cropping only removes pixels, doesn\'t change remaining ones. Resolution drops because there are fewer pixels, but each pixel is unchanged.' },
      { q: 'How do I crop multiple photos to the same dimensions?', a: 'Crop each individually with the same aspect lock. Or build a script using the Resize tool with cropping mode if you need batch.' },
    ],
    relatedTool: 'crop-image',
    keywords: ['crop image square', '1:1 crop', 'instagram crop', 'aspect ratio'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'add-watermark-to-photos',
    title: 'How to Add a Watermark to Photos (Text or Logo)',
    query: 'add watermark to photo',
    metaDescription: 'Add text or logo watermark to photos in your browser. Free, no signup, no watermark on the watermark tool.',
    intro: 'Watermarks protect ownership when you share photos online — for stock work, product shots, professional portfolios. Here\'s how to add a clean text or logo watermark to single photos or in batch.',
    steps: [
      { title: 'Open Add Watermark', body: 'Drop your photo into the Watermark tool.' },
      { title: 'Type your watermark text', body: 'Brand name, copyright notice, or URL. Keep it short — 2-4 words is plenty.' },
      { title: 'Pick position', body: 'Bottom-right is the standard for photos. Bottom-center for symmetric subjects. Avoid centering across the main subject.' },
      { title: 'Adjust opacity', body: '30-50% opacity is the standard — visible but not distracting. 100% looks heavy-handed.' },
      { title: 'Apply and download', body: 'Save the watermarked image. The original file is untouched on your device.' },
    ],
    tips: [
      'Use a thin, simple font for text watermarks — they read clearer at small sizes than decorative ones.',
      'For logo watermarks, save your logo as a PNG with transparency before applying.',
      'Watermarks discourage casual stealing but won\'t stop a determined thief — for paid stock work, register copyright separately.',
    ],
    faq: [
      { q: 'Can I batch-watermark photos?', a: 'For now, watermark each individually. A batch version is on the roadmap; meanwhile, queue up multiple browser tabs.' },
      { q: 'Will the watermark blur over time?', a: 'No — the watermark becomes part of the image pixels. Quality survives compression as long as the source quality is high.' },
      { q: 'How big should the watermark be?', a: '5-10% of image width is typical. Too small disappears in thumbnails; too large dominates the image.' },
    ],
    relatedTool: 'image-watermark',
    keywords: ['watermark photo', 'add watermark', 'text watermark', 'logo watermark'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'remove-background-from-portrait',
    title: 'How to Remove Background from a Portrait Photo',
    query: 'remove background from photo',
    metaDescription: 'Remove background from headshots and product photos automatically with AI. Free, runs entirely in your browser.',
    intro: 'AI background removal used to require Photoshop and 10 minutes per image. Now it runs in your browser in seconds, with surprisingly clean results on portraits and product shots.',
    steps: [
      { title: 'Open Remove Background', body: 'Drop your photo into the Remove Background tool.' },
      { title: 'Wait for the model to load (first time)', body: 'The AI model is ~30MB. First run downloads it; subsequent runs are instant.' },
      { title: 'Wait for processing', body: 'The model identifies foreground vs background pixel by pixel. Takes 5-30 seconds depending on image size and your CPU.' },
      { title: 'Preview the result', body: 'The output shows your subject on a transparent background (checkered pattern). Edges should be clean around hair, fingers, and complex shapes.' },
      { title: 'Download as PNG', body: 'Save as PNG to preserve transparency. JPG would re-add a white background.' },
    ],
    tips: [
      'Best results: clear contrast between subject and background, even lighting, in-focus subject.',
      'Worst results: low contrast, motion blur, or backgrounds with similar colors to the subject (e.g., green shirt against green wall).',
      'For product photos, shoot against a plain white or contrasting background to start with — even AI gets confused by busy backgrounds.',
    ],
    faq: [
      { q: 'Is my photo uploaded?', a: 'No. The model runs entirely in your browser. Verify in DevTools → Network — zero outbound traffic with image content.' },
      { q: 'Can I use this commercially?', a: 'Yes. The output is yours; the underlying model is open-source under permissive license.' },
      { q: 'What if the result has rough edges?', a: 'Try a higher-resolution input image. The model has more pixel data to work with and edges turn out smoother.' },
    ],
    relatedTool: 'remove-background',
    keywords: ['remove background', 'transparent background', 'cutout image', 'AI background remover'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'resize-image-for-resume',
    title: 'How to Resize a Photo for a Resume or LinkedIn',
    query: 'resize photo for resume',
    metaDescription: 'Resize headshots to standard dimensions for resumes, LinkedIn (400x400), and ATS applications. Free, no upload.',
    intro: 'A professional headshot belongs at specific dimensions on each platform. LinkedIn wants 400×400, US resumes typically don\'t use photos at all (avoid bias), but European CVs use 300-400px square. Here\'s how to nail the size.',
    steps: [
      { title: 'Pick the destination', body: 'LinkedIn: 400×400 (displayed at 110px circle). European CV: ~300×400 portrait. Email signature: 200×200.' },
      { title: 'Crop to a square first', body: 'Use Crop Image at 1:1, positioning your face slightly above center.' },
      { title: 'Resize to target dimensions', body: 'Open Resize Image, type the dimensions (400×400 for LinkedIn).' },
      { title: 'Compress lightly', body: 'Run through Compress at 85% to reduce file size — most platforms cap at a few MB.' },
      { title: 'Upload', body: 'For LinkedIn: profile → camera icon → upload. For resumes: insert as image, lock aspect, position consistently.' },
    ],
    tips: [
      'Use a neutral background (not your bedroom) and even lighting (no harsh shadows).',
      'Smile lightly — looks approachable without being stiff. Avoid teeth-bared business smile.',
      'US resumes typically omit photos to avoid hiring bias claims. Check your industry/country norms.',
    ],
    faq: [
      { q: 'What about an avatar for GitHub or Twitter?', a: 'GitHub: 460×460. Twitter: 400×400. Both display as a circle, so center your face and avoid important content near corners.' },
      { q: 'Does my headshot need to be a recent photo?', a: 'Within the last 2-3 years. Recruiters expect to recognize you in person.' },
      { q: 'Can I use a phone selfie?', a: 'Modern phones produce great headshots. Stand near a window for natural light, hold the camera at eye level, and avoid harsh ceiling lights.' },
    ],
    relatedTool: 'resize-image',
    keywords: ['resize photo for resume', 'linkedin photo size', 'headshot dimensions', 'resume photo'],
    publishedAt: '2026-05-08',
  },
];

export const getGuide = (slug: string) => guides.find(g => g.slug === slug);
