export const initUrls = ['/works/date']

/** @type {import('@musakui/scraper').ParsePage} */
export function parsePage(doc, pg) {
	const qp = [...getQueue(doc, pg.url)]
	return {
		body: norm(doc.body.querySelector('main')?.innerHTML),
		queue: qp.length ? qp : undefined,
	}
}

const host = window.location.host

const pageTypes = [
	{ q: 8, p: '/works/detail/', /*   */ t: 'item' },
	{ q: 1, p: '/works/list/date/', /**/ t: 'list:works:date' },
	{ q: 3, p: '/works/list/', /*     */ t: 'list:works:misc' },
	{ q: 5, p: '/actress/detail/', /* */ t: 'list:works:actress' },
	{ q: 3, p: '/actress/', /**/ t: 'list:actress' },
	{ q: 2, p: '/works/', /*  */ t: 'list:tags' },
	{ q: 9, p: '/recruit/', /**/ t: 'recruit' },
]

/**
 * @param {Document} doc
 * @param {string} [cur]
 */
function* getQueue(doc, cur) {
	const seen = new Set(cur ? [cur] : [])
	for (const a of doc.body.querySelectorAll('a')) {
		if (!a.href) continue
		const u = new URL(a.href)
		if (!u.host || u.host !== host) continue
		const p = u.searchParams.get('page')
		if (p === '1') continue
		const url = p ? `${u.pathname}?page=${p}` : u.pathname
		if (seen.has(url)) continue
		const t = pageTypes.find((g) => url.startsWith(g.p))
		if (!t) continue
		const q = t.q + (p ? parseInt(p) / 200 : 0)
		yield {
			q,
			url,
			tag: t.t,
			meta: { link: norm(a.text) },
		}
	}
}

/** @param {string} [str] */
function norm(str) {
	return str?.replace(/\s+/g, ' ').trim() ?? ''
}
