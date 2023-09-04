import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import uno from 'unocss/vite'

export default defineConfig({
	plugins: [
		uno(),
		vue(),
	],
	build: {
		target: 'esnext',
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				entryFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
				chunkFileNames: ({ facadeModuleId: id }) => {
					if (id?.indexOf('/src/sites/') > 0) {
						return `sites/[name]-[hash].js`
					} else if (id?.indexOf('workerCrawler') > 0) {
						return `[name].js`
					}
					return `[name]-[hash].js`
				},
			},
		},
	},
	optimizeDeps: {
		exclude: ['@musakui/scraper'],
	},
	worker: {
		format: 'es',
	},
	server: {
		port: 6969,
	},
})
