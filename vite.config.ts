import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type UserConfig } from 'vitest/config';
import { certs } from './scripts/certs';

const config: UserConfig = {
	server: {
		host: '0.0.0.0',
		proxy: {
			'/supabase': {
				target: 'http://127.0.0.1:54321',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/supabase/, '')
			}
		}
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

if (certs) {
	config.server = {
		...config.server,
		https: certs
	};
}

export default defineConfig(config);
