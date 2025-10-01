import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { webcore } from 'webcoreui/integration'


export default defineConfig({
  site: 'https://www.yoursite.tld',
  scopedStyleStrategy: 'where',
  integrations: [tailwind(), mdx(), webcore()],
  // Rajout de cette ligne pour GithubPages
  output: 'static',
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
