<script setup>
import { ref } from 'vue'
import { module, crawler } from './main.js'
const { hostname } = window.location
const running = ref(false)
const current = ref('...')
const state = ref(crawler.updateStats())
const update = () => { state.value = crawler.updateStats() }
const run = async () => {
	if (running.value) {
		running.value = false
		return
	}
	running.value = true
	let i = 0
	for await (const cur of crawler.run()) {
		current.value = cur
		if (!running.value) {
			crawler.crawler.stop()
			break
		}
		if (!(++i % 3)) update()
	}
	running.value = false
	update()
}
setTimeout(update, 1000)
</script>

<template>
	<div class="p-2 flex flex-col gap-2 font-mono">
		<div class="flex items-center gap-2">
			<div class="text-lg">{{ hostname }}</div>
			<div>{{ module.name ? `(${module.name})` : '' }}</div>
			<button class="p-1 rounded bg-gray-800" @click="crawler.init">🔄</button>
			<button class="p-1 rounded bg-gray-800" @click="run">{{ running ? '⏹' : '&nbsp;▶ ️' }}</button>
		</div>
		<div>{{ current }}</div>
		<div class="flex">
			<pre class="flex-grow">{{ JSON.stringify(state.stats, null, 2) }}</pre>
			<pre class="flex-grow">{{ JSON.stringify(state.counts, null, 2) }}</pre>
		</div>
	</div>
</template>