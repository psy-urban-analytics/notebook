import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 三種內容，欄位刻意很少。只有 title 和 date 是必填。
// draft: true 的紀錄只在本機預覽看得到，不會發布到網站。

const common = {
  title: z.string(),
  date: z.coerce.date(),
  cover: z.string().optional(), // 縮圖／主圖，例如 /uploads/xxx.jpg
  draft: z.boolean().optional().default(false),
};

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    ...common,
    course: z.string().optional(), // 課程名稱
    week: z.coerce.number().optional(), // 第幾週
  }),
});

const observations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/observations' }),
  schema: z.object({
    ...common,
    city: z.string().optional(), // 城市名
    street: z.string().optional(), // 街道
    target: z.string().optional(), // 觀察目標
    related: z.string().optional(), // 相關筆記的檔名（不含 .md）
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    ...common,
    course: z.string().optional(), // 出自哪門課
    assignment: z.string().optional(), // 例如：作業一
    question: z.string().optional(), // 問題
    method: z.string().optional(), // 方法
    finding: z.string().optional(), // 發現
    related: z.string().optional(), // 相關筆記的檔名（不含 .md）
  }),
});

export const collections = { notes, observations, works };
