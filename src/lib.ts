import { getCollection, type CollectionEntry } from 'astro:content';

export type Kind = 'notes' | 'observations' | 'works';
export const KIND_LABEL: Record<Kind, string> = { notes: '筆記', observations: '觀察', works: '習作' };

/** 加上網站的 base 路徑（/notebook） */
export function u(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^https?:\/\//.test(path)) return path;
  if (base && (path === base || path.startsWith(base + '/'))) return path; // 已含 base（後台上傳的圖片）
  return `${base}/${path.replace(/^\//, '')}`;
}

const isLive = (e: { data: { draft?: boolean } }) => import.meta.env.DEV || !e.data.draft;
const byDate = (a: { data: { date: Date } }, b: { data: { date: Date } }) => b.data.date.getTime() - a.data.date.getTime();

export async function list<K extends Kind>(kind: K): Promise<CollectionEntry<K>[]> {
  const items = (await getCollection(kind)) as CollectionEntry<K>[];
  return items.filter(isLive).sort(byDate);
}

export type Card = { kind: Kind; id: string; title: string; date: Date; cover?: string; sub?: string };

export function toCard(kind: Kind, e: any): Card {
  const d = e.data;
  let sub: string | undefined;
  if (kind === 'notes') sub = d.week ? `WEEK ${String(d.week).padStart(2, '0')}` : d.course;
  if (kind === 'observations') sub = d.city;
  if (kind === 'works') sub = d.assignment ?? d.course;
  return { kind, id: e.id, title: d.title, date: d.date, cover: d.cover, sub };
}

export async function recent(limit = 12): Promise<Card[]> {
  const [n, o, w] = await Promise.all([list('notes'), list('observations'), list('works')]);
  return [
    ...n.map((e) => toCard('notes', e)),
    ...o.map((e) => toCard('observations', e)),
    ...w.map((e) => toCard('works', e)),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}

export function fmt(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}.${p(d.getUTCMonth() + 1)}.${p(d.getUTCDate())}`;
}

export function coord(lat?: number, lng?: number): string | undefined {
  if (lat == null || lng == null) return undefined;
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`;
}
