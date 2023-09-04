import type { WebPage } from '@musakui/scraper'

export type LinkQueue = Map<string, Partial<WebPage>>

export interface ProcessedPage {
	page?: Partial<WebPage>
	queue?: LinkQueue
}

export type PageProcessor = (pageURL: string, doc: Document) => ProcessedPage

export interface SiteModule {
	name: string
	startURLs: string[]
	countTypes: string[]
	processPage: PageProcessor
	exportPages: () => Promise<unknown>
}
