import '@unocss/reset/tailwind.css'
import 'uno.css'
import { module } from './sites/index.js'
import { useCrawler } from './crawl.js'
export { module }
export const crawler = useCrawler(module)

const { createApp } = await import('vue')
if (module) {
	import('./App.vue').then((m) => createApp(m.default).mount('#app'))
} else {
	document.querySelector('#app').innerHTML = `${window.location.hostname}`
	import('@musakui/scraper/lib/workerCrawler.js')
}
