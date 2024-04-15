import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapter = process.env.ADAPTER === 'node' ? adapterNode : adapterStatic;
const adapterConfig =
	process.env.ADAPTER === 'node'
		? {
				out: 'build-node'
			}
		: {
				fallback: 'index.html',
				pages: 'build-static',
				assets: 'build-static'
			};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(adapterConfig),
		alias: {
			$components: 'src/lib/client/components',
			$stores: 'src/lib/client/stores'
		}
	}
};

export default config;
