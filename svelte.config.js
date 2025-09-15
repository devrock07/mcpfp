import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      edge: false,
      split: false
    })
    // 🚫 Removed "alias" because your SvelteKit version doesn't support it
  }
};

export default config;
