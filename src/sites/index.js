/** @param {string} [hostname] */
export async function getSite(hostname) {
	const hn = hostname ?? globalThis.location.hostname
	switch (hn) {
		case 'deeps.net':
		case 'manji-group.com':
		case 'mutekimuteki.com':
		case 'mousouzoku-av.com':
		case 'www.tma.co.jp':
		case 'www.mgstage.com':
		case 'www.km-produce.com':
		case 'www.crystal-eizou.jp':
		case 'www.alicejapan.co.jp':
		case 'www.knights-visual.com':
		case 'ec.sod.co.jp':
		case 'dmm.co.jp':
		case 'video.dmm.co.jp':
			console.log('known', hn)
			return await import('./default.js')
		case 'mvg.jp':
		case 'muku.tv':
		case 'v-av.com':
		case 'miman.jp':
		case 'dasdas.jp':
		case 'bi-av.com':
		case 'hhh-av.com':
		case 's1s1s1.com':
		case 'moodyz.com':
		case 'honnaka.jp':
		case 'to-satsu.com':
		case 'oppai-av.com':
		case 'fitch-av.com':
		case 'befreebe.com':
		case 'mko-labo.net':
		case 'rookie-av.jp':
		case 'bibian-av.com':
		case 'av-e-body.com':
		case 'attackers.net':
		case 'fairway-av.com':
		case 'madonna-av.com':
		case 'ideapocket.com':
		case 'nanpa-japan.jp':
		case 'tameikegoro.jp':
		case 'kirakira-av.com':
		case 'kawaiikawaii.jp':
		case 'wanz-factory.com':
		case 'hajimekikaku.com':
		case 'premium-beauty.com':
			return await import('./modern.js')
		default:
			throw new Error(`unknown host: ${hn}`)
	}
}
