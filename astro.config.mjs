import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { webcore } from 'webcoreui/integration'


export default defineConfig({
  site: 'https://makstinyworkshop.github.io',
  base: '/Envolet_toit',
  scopedStyleStrategy: 'where',
  integrations: [tailwind(), mdx(), webcore()],
  // Rajout de ces deux lignes pour GithubPages
  output: 'static',
  //
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
