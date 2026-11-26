import type { APIRoute } from 'astro';
import { recent, KIND_LABEL } from '../lib';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), site);
  const items = await recent(30);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>城市分析學習手帳</title>
<link>${base.href}</link>
<description>以心理師的眼光，學習用數據去解讀城市生活。</description>
<language>zh-Hant</language>
${items
  .map((c) => {
    const link = new URL(`${c.kind}/${c.id}/`, base).href;
    return `<item><title>${esc(`［${KIND_LABEL[c.kind]}］${c.title}`)}</title><link>${link}</link><guid>${link}</guid><pubDate>${c.date.toUTCString()}</pubDate></item>`;
  })
  .join('\n')}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
