import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.yoursite.tld',
  scopedStyleStrategy: 'where',
  markdown: {
    syntaxHighlight: 'prism',
  },
  alias: {
    '@components': './src/components',
    '@layouts': './src/layouts',
    '@lib': './src/lib',
    '@styles': './src/styles',
    '@content': './src/content',
  },
});
