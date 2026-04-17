import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thewell.law',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  vite: {
    ssr: {
      // pagefind is loaded at runtime from the built /pagefind/ assets
      noExternal: [],
    },
  },
});
