/** @return {Promise<Partial<import('./module').SiteModule>>} */
const getModule = async (site = window.location.hostname) => {
	switch (site) {
		case 'moodyz.com':
		case 's1s1s1.com':
		case 'ideapocket.com':
		case 'attackers.net':
		case 'av-e-body.com':
		case 'wanz-factory.com':
		case 'premium-beauty.com':
		case 'kirakira-av.com':
		case 'madonna-av.com':
		case 'bibian-av.com':
		case 'oppai-av.com':
		case 'fitch-av.com':
		case 'bi-av.com':
		case 'mvg.jp':
		case 'dasdas.jp':
		case 'honnaka.jp':
		case 'rookie-av.jp':
		case 'tameikegoro.jp':
		case 'kawaiikawaii.jp':
		case 'befreebe.com':
		case 'mko-labo.net':
		case 'muku.tv':
			return await import('./modern.js')
		case 'www.dmm.co.jp':
			// return await import('./dmm.js')
		case 'www.mgstage.com':
			// return await import('./mgs.js')
		case 'www.km-produce.com':
			// return await import('./custom/kmp.js')
		case 'ec.sod.co.jp':
			// return await import('./custom/sod.js')
		case 'deeps.net':
			// return await import('./custom/deeps.js')
		case 'www.alicejapan.co.jp':
			// return await import('./custom/alice.js')
		case 'www.mutekimuteki.com':
			// return await import('./custom/muteki.js')
		default:
			break
	}
	return null
}

export let module = await getModule()
