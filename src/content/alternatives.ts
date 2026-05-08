export interface Alternative {
  slug: string;
  competitor: string;
  title: string;
  metaDescription: string;
  intro: string;
  pros: string[];
  cons: string[];
  ourAdvantages: string[];
  whenToUseThem: string;
  whenToUseUs: string;
  publishedAt: string;
}

export const alternatives: Alternative[] = [
  {
    slug: 'tinypng',
    competitor: 'TinyPNG',
    title: 'PixShed vs TinyPNG — Which Image Compressor?',
    metaDescription: 'TinyPNG pioneered online image compression. PixShed offers comparable compression plus more tools, all client-side.',
    intro: 'TinyPNG is the OG of online image compression — they popularized lossy PNG/JPG optimization and many devs use them via API. The free web interface caps at 20 images and 5 MB each. PixShed offers comparable compression with no caps and the work happens entirely in your browser.',
    pros: ['Excellent compression ratios (industry-leading on PNG)', 'Simple drag-drop UI', 'Photoshop and CMS plugins available'],
    cons: ['Free tier limited: 20 images, 5MB each, per session', 'Files upload to TinyPNG servers (not local)', 'Pro plan starts at $25/year for higher limits'],
    ourAdvantages: ['No file count or size limits — process hundreds of images', 'Files never leave your browser; faster on big batches', 'Bundle of 11 tools beyond compression (resize, crop, convert, watermark, etc.)'],
    whenToUseThem: 'You\'re integrating compression into a CMS or design tool via their API/plugins.',
    whenToUseUs: 'You want unlimited drag-drop compression with full privacy plus a wider toolkit.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'iloveimg',
    competitor: 'iLoveIMG',
    title: 'PixShed vs iLoveIMG',
    metaDescription: 'iLoveIMG offers an extensive toolkit with paid limits. PixShed offers similar tools entirely free with no upload caps.',
    intro: 'iLoveIMG (sister site to iLovePDF) packs many image tools into a polished interface but pushes you toward a paid Pro plan once you hit moderate usage. PixShed covers the same core tools with no caps and processes everything in-browser.',
    pros: ['Wide tool selection (compress, resize, convert, edit, etc.)', 'Polished, designer-friendly UI', 'Mobile apps available'],
    cons: ['Files upload to their servers (slow on big batches, privacy concern)', 'Free tier has hidden limits — they kick in around 25-50 files', 'Premium starts at ~$48/year'],
    ourAdvantages: ['100% browser-based — files never leave your device', 'No usage caps or paywall', 'Faster for batches because there\'s no upload step'],
    whenToUseThem: 'You want a mobile app or designer-focused integrations.',
    whenToUseUs: 'You want unlimited free use with full file privacy and a no-account workflow.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'squoosh',
    competitor: 'Squoosh',
    title: 'PixShed vs Squoosh',
    metaDescription: 'Google\'s Squoosh excels at single-image format experimentation. PixShed handles batches and adds resize/crop/watermark tools.',
    intro: 'Squoosh is a Google-built tool focused on one job: comparing image compression formats side-by-side. It\'s incredible for that. Less so for batch work or anything beyond compression. PixShed covers Squoosh\'s core use case plus broader image work.',
    pros: ['Side-by-side preview of compression at different quality levels', 'Cutting-edge format support (AVIF, WebP, MozJPEG)', 'Built by Google, open source'],
    cons: ['Single image at a time — no batch', 'No additional tools beyond compression/conversion', 'UI optimized for tweaking, less for quick "just compress this" jobs'],
    ourAdvantages: ['Batch compression with ZIP download', '11 tools beyond compression: resize, crop, watermark, image-to-PDF, etc.', 'Faster workflow when you don\'t need to compare formats'],
    whenToUseThem: 'You\'re experimenting with the best format/quality for a specific image and want pixel-perfect comparison.',
    whenToUseUs: 'You\'re doing routine compression or need to combine multiple operations on multiple files.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'remove-bg',
    competitor: 'remove.bg',
    title: 'PixShed vs remove.bg',
    metaDescription: 'remove.bg is the gold standard for AI background removal but charges per image. PixShed runs the same tech free in your browser.',
    intro: 'remove.bg pioneered AI background removal as a service. Their model is excellent but credit-based — free preview, paid for full-res output. PixShed runs an open-source model entirely in your browser with no credit limits.',
    pros: ['Industry-leading edge quality, especially on hair', 'API for developers', 'Photoshop, Figma, and other plugins'],
    cons: ['Free preview only ~600×400; full-res requires credits', 'Credits cost ~$0.50-1.00 per image at low volume', 'Files upload to their servers'],
    ourAdvantages: ['Full-res output, no credits, no caps', 'Files never leave your browser', 'Free for any volume of personal or commercial use'],
    whenToUseThem: 'You need top-of-line edge quality on tricky hair/fur or need an API integration.',
    whenToUseUs: 'You want unlimited free background removal with privacy and the convenience of a single multi-tool site.',
    publishedAt: '2026-05-08',
  },
];

export const getAlternative = (slug: string) => alternatives.find(a => a.slug === slug);
