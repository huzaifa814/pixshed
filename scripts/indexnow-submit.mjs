#!/usr/bin/env node
/**
 * Submit pixshed URLs to IndexNow (Bing, Yandex, Naver, Seznam, Yep).
 * Usage: node scripts/indexnow-submit.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HOST = 'www.pixshed.com';
const KEY = '2f11a04e84afdbcb63c1175f54401c64';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const toolsTxt = readFileSync(resolve(__dirname, '../src/config/tools.ts'), 'utf-8');
const toolSlugs = [...toolsTxt.matchAll(/^\s+\{\s*slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);

const guidesTxt = readFileSync(resolve(__dirname, '../src/content/guides.ts'), 'utf-8');
const guideSlugs = [...guidesTxt.matchAll(/^\s+slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);

const altsTxt = readFileSync(resolve(__dirname, '../src/content/alternatives.ts'), 'utf-8');
const altSlugs = [...altsTxt.matchAll(/^\s+slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);

const STATIC_PATHS = ['', '/tools', '/guides', '/alternatives', '/about', '/faq', '/privacy', '/terms', '/contact'];

const urls = [];
for (const p of STATIC_PATHS) urls.push(`https://${HOST}${p}`);
for (const slug of toolSlugs) urls.push(`https://${HOST}/tools/${slug}`);
for (const slug of guideSlugs) urls.push(`https://${HOST}/guides/${slug}`);
for (const slug of altSlugs) urls.push(`https://${HOST}/alternatives/${slug}`);

async function submit(slice) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: slice }),
  });
  return { status: res.status, text: await res.text() };
}

console.log(`[indexnow] ${HOST}: submitting ${urls.length} URLs`);
const BATCH = 1000;
for (let i = 0; i < urls.length; i += BATCH) {
  const r = await submit(urls.slice(i, i + BATCH));
  console.log(`  Batch ${i / BATCH + 1}: HTTP ${r.status} ${r.text.slice(0, 200) || '(ok)'}`);
}
console.log('[indexnow] Done.');
