import { env as publicEnv } from '$env/dynamic/public';
import { C } from '$lib/constants';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(
		publicEnv.PUBLIC_SUPABASE_URL || `${url.origin}/supabase`,
		publicEnv.PUBLIC_SUPABASE_ANON_KEY,
		{
			global: {
				fetch
			},
			cookies: {
				get(key) {
					if (!isBrowser()) {
						return JSON.stringify(data);
					}

					const cookie = parse(document.cookie);
					return cookie[key];
				}
			},
			auth: {
				storageKey: C.supabaseCookieKey
			}
		}
	);

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
