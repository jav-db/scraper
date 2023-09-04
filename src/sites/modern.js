const windowOrigin = window.origin

/** @param {string} p */
const getPageType = (p) => {
	if (p.startsWith('/works/detail/')) return 'video'
	if (p.startsWith('/actress/detail/')) return 'actress'
	if (p.startsWith('/works/list/date/')) return 'list:video:date'
	if (p.startsWith('/works/list/')) return 'list:video:tag'
	if (p.startsWith('/actress')) return 'list:actress'
	return 'misc'
}

const pagePriority = new Map([
	['list:video:date', 1],
	['video', 3],
	['list:actress', 4],
	['actress', 6],
	['list:video:tag', 8],
	['misc', 9],
])

export const name = 'modern'

export const startURLs = ['/works/date', '/actress']

export const countTypes = ['list:video:date', 'list:video:tag', 'actress', 'video']

/** @type {import('./module').PageProcessor} */
export const processPage = (_url, doc) => {
	/** @type {import('./module').LinkQueue} */
	const queue = new Map()

	for (const el of doc.links) {
		if (!el.href || el.href.startsWith('javascript')) continue
		const { pathname, origin, searchParams } = new URL(el.href)
		if (origin !== windowOrigin) continue
		const pg = searchParams.get('page')
		const u = `${pathname}${pg ? `?page=${pg}` : ''}`
		if (queue.has(u)) continue
		const ptype = getPageType(u)
		const q = (pg ? 1 : 0) + (pagePriority.get(ptype) || 0)
		queue.set(u, { q, ptype })
	}

	const main = doc.querySelector('main') ?? doc.body

	return {
		queue,
		page: {
			body: main.innerHTML.replace(/\s+/g, ' ').trim(),
		},
	}
}

/** @param {Document} doc */
export function* getVideoCards(doc) {
	for (const el of doc.querySelectorAll('div.c-card')) {
		yield {
			/** @type {string | undefined} */
			url: el.querySelector('a.img')?.href,
			/** @type {string | undefined} */
			title: el.querySelector('p.text')?.innerText?.trim(),
			/** @type {string | undefined} */
			img: el.querySelector('img')?.dataset.src,
		}
	}
}

/** @param {Document} doc */
export function* getVideoImages(doc) {
	for (const img of doc.querySelectorAll('img.swiper-lazy')) {
		/** @type {string | undefined} */
		const src = img.dataset?.src
		if (src) yield src
	}
}

/** @param {Document} doc */
export function* getVideoInfo(doc) {
	for (const row of doc.querySelectorAll('div.p-workPage__table > div.item')) {
		const head = row.querySelector('div.th')?.innerText?.trim()
		const txt = row.querySelector('div.td')?.innerText?.trim()
		if (!head || !txt) continue

		const links = [...row.querySelectorAll('div.td a')].map((el) => ({
			url: el.href,
			name: el.innerText.trim(),
		}))

		if (links.length) {
			yield /** @type {[string, { name: string, url: string }[]]} */([head, links])
			continue
		}

		const nodes = [...(row.querySelector('div.td p')?.childNodes ?? [])]
		const val = nodes.find((n) => n.nodeType === Node.TEXT_NODE).nodeValue.trim()
		if (val) {
			yield /** @type {[string, string]} */([head, val])
		}
	}
}

export const exportPages = async () => {
}
