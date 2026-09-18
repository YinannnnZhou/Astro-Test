import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  integrations: [
    react(),
    ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
  ],
});
