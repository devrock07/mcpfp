import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // If you’re using SCSS/TypeScript, keep preprocess
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      // by default it outputs to "build", which matches your netlify.toml
      edge: false,
      split: false
    }),
    alias: {
      $components: 'src/components',
      $lib: 'src/lib',
      $routes: 'src/routes',
      $styles: 'src/styles'
    }
  }
};

export default config;
