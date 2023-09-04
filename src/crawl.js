import {
	put,
	init,
	stats,
	runSpider,
	countPageTypes,
	createWorkerCrawler,
} from '@musakui/scraper'

/** @param {Partial<import('./sites/module').SiteModule>} module */
export const useCrawler = (module) => {
	if (!module?.processPage) throw new Error('no processor')

	const dtStats = /** @type {Record<string, number>} */({})
	const scStats = /** @type {Awaited<ReturnType<typeof stats>>} */({})

	const updateStats = () => {
		stats().then((v) => Object.assign(scStats, v))
		if (module.countTypes) {
			countPageTypes(module.countTypes).then((v) => Object.assign(dtStats, v))
		}
		return {
			stats: scStats,
			counts: dtStats,
		}
	}

	const crawler = createWorkerCrawler(2)

	async function* run() {
		crawler.start({ origin: window.origin })
		await new Promise((res) => setTimeout(res, 500))
		let exhausted = 0

		for await (const page of runSpider()) {
			if (!page) {
				await new Promise((res) => setTimeout(res, 100))
				++exhausted
				if (exhausted > 100) {
					break
				}
				continue
			}
			yield page.url
			exhausted = 0
			const proc = module.processPage(page.url, page.doc)
			if (proc) {
				await page.update(proc.page, proc.queue)
			}
		}

		crawler.stop()
		updateStats()
	}

	return {
		run,
		crawler,
		updateStats,
		init: async () => {
			for (const url of module.startURLs) {
				await put({ url, q: 0 })
			}
		},
		reset: () => init(module.startURLs),
	}
}
