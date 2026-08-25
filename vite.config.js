import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
// Base yolu build zamani teyin olunur:
//   default '/'                -> oz subdomeni (https://alidadeutsch.simpler.az/)
//   BASE_PATH=/german-booklet/ -> GitHub Pages layihe sehifesi
// GitHub Actions workflow-u BASE_PATH-i oz-ozune verir; lokal `npm run build` root ucun qalir.
const BASE = process.env.BASE_PATH || '/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'alida — Alman Dili Kitabçası',
        short_name: 'alida',
        description: 'Azərbaycandilli istifadəçilər üçün Alman dili öyrənmə kitabçası: lüğət, qrammatika, məşq və A1 başlanğıc bələdçisi.',
        lang: 'az',
        dir: 'ltr',
        theme_color: '#6366f1',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        scope: BASE,
        start_url: BASE,
        categories: ['education', 'books'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Bütün tətbiq fayllarını (data daxil olmaqla) offline üçün öncədən keşlə.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        // SPA marşrutları (məs. /practice) offline da işləsin.
        navigateFallback: BASE + 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
