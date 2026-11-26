// @ts-check
import { defineConfig } from 'astro/config';

// 網站發布在 https://psy-urban-analytics.github.io/notebook/
// 之後若換成自己的網域：site 改成網域、base 改成 '/'，
// 並把 .pages.yml 裡 media.output 改成 /uploads
export default defineConfig({
  site: 'https://psy-urban-analytics.github.io',
  base: '/notebook',
});
