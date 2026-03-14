import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
    base: './',
    envPrefix: 'APP_', // CHANGE ME
    resolve:
    {
        alias:
        {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '$': fileURLToPath(new URL('./public', import.meta.url)),
            '#': fileURLToPath(new URL('./src/shared', import.meta.url)),
        },
    },
    plugins:
    [
        devtools(),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/paraglide',
            strategy: ['url', 'baseLocale'],
        }),
        nitro({
            rollupConfig: { external: [/^@sentry\//] },
            minify: true
        }),
        tsconfigPaths({ projects: ['./tsconfig.json'] }),
        tailwindcss(),
        tanstackStart(),
        viteReact({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
    ],
})

export default config
