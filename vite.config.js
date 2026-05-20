import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      workbox: {
        // Não pre-cache imagens pesadas — deixa o browser cuidar do cache
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        // Limita o tamanho do precache
        maximumFileSizeToCacheInBytes: 300 * 1024,
        runtimeCaching: [
          {
            // Cache de imagens sob demanda (não precache)
            urlPattern: /\.(?:png|jpg|jpeg|webp|gif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
              },
            },
          },
          {
            // Cache de fontes do Google
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
              },
            },
          },
        ],
      },
      manifest: {
        name: "Ballers085",
        short_name: "Ballers085",
        description: "App PWA para Ballers085",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          { src: "/logo192.png", sizes: "192x192", type: "image/png" },
          { src: "/logo512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      }
    })
  ],
  build: {
    // Chunks menores para melhor cache e carregamento paralelo
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa Router do bundle principal (melhor cache)
          'router': ['react-router-dom'],
        }
      }
    },
    // Compressão via terser (mais lento no build, menor no output)
    target: 'es2020',
    // CSS code splitting — cada chunk tem seu próprio CSS
    cssCodeSplit: true,
  },
})
