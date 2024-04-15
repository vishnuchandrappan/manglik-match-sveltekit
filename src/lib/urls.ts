import { C } from '$lib/constants';
import type { RequestEvent } from '@sveltejs/kit';

const helpers = {
	isSecure: (event: RequestEvent) => event.route.id?.includes('(secure)') ?? false,
	isGlobalAdminRoute: (event: RequestEvent) => event.route.id?.includes('(admin)') ?? false
};

const encodeURLParams = (params: Record<string, string>) => {
	return new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined)).toString();
};

const api = {
	resetPassword: '/api/resetPassword'
};

const app = {
	login: {
		email: '/auth/login',
		withRedirect: (redirectURL: string) =>
			`${app.login.email}?${encodeURLParams({
				[C.redirect]: redirectURL
			})}`
	},
	signup: {
		root: '/auth/signup',
		verify: '/auth/signup/verify'
	},
	forgotPassword: {
		root: '/auth/forgot-password',
		verify: '/auth/forgot-password/verify'
	},
	profile: '/app/profile',
	home: '/'
};

export const URLS = {
	home: '/',
	app,
	api,
	...helpers
} as const;
