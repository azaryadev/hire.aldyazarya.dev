import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hire.aldyazarya.dev',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
