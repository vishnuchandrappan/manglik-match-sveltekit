import { building, dev } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import { C } from '$lib/constants';
import { dangerousPrisma } from '$lib/prisma';
import { URLS } from '$lib/urls';
import { createServerClient } from '@supabase/ssr';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { enhance } from '@zenstackhq/runtime';

const shouldRedirectPath = (path?: string | null): path is string =>
	Boolean(path && path.startsWith('/app'));

const redirectResponse = (url: string) => {
	return new Response(undefined, {
		status: 307,
		headers: {
			Location: url
		}
	});
};

const authSessionHandler: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(
		privateEnv.SUPABASE_URL,
		publicEnv.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' });
				}
			},
			auth: {
				storageKey: C.supabaseCookieKey
			}
		}
	);
	event.locals.safeGetSession = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null };
		}

		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return { session, user };
	};

	const { session } = await event.locals.safeGetSession();

	if (session) {
		if (!session?.user?.id || !session.user.email) {
			return new Response(undefined, {
				status: 500
			});
		}

		const dbUser = await dangerousPrisma.user.findUnique({
			where: {
				supabaseUserID: session.user.id
			},
			include: {
				admin: true
			}
		});

		if (!dbUser) {
			console.log('User not found in db. Signing out.');
			// TODO: cookie is not being deleted
			await event.locals.supabase.auth.signOut();
			return new Response(undefined, {
				status: 403
			});
		}

		if (URLS.isGlobalAdminRoute(event) && !dbUser.admin) {
			return redirectResponse(URLS.app.home);
		}

		//@ts-expect-error - Don't want to expose the admin field to the client
		delete dbUser.admin;

		event.locals.user = dbUser;

		event.locals.db = enhance(dangerousPrisma, {
			user: { id: dbUser.id }
		});
	} else if (URLS.isSecure(event)) {
		const { pathname, search } = event.url;
		return redirectResponse(URLS.app.login.withRedirect(pathname + search));
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

const redirectHandler: Handle = async ({ event, resolve }) => {
	// Skip redirect handling if we are building
	if (building) {
		return resolve(event);
	}

	// Set the redirect cookie if the redirect query param is present
	const redirectURLParam = event.url.searchParams.get(C.redirect);
	if (shouldRedirectPath(redirectURLParam)) {
		event.cookies.set(C.redirect, redirectURLParam, { path: '/' });
	}

	// If the redirect cookie is present, redirect to the URL in the cookie if the user is authenticated.
	const redirectURLString = event.cookies.get(C.redirect);

	if (shouldRedirectPath(redirectURLString)) {
		if (
			event.url.pathname === redirectURLString ||
			event.url.pathname.startsWith(redirectURLString)
		) {
			console.log('redirectURL loaded. Deleting cookie.');
			event.cookies.delete(C.redirect, { path: '/' });
		} else if (URLS.isSecure(event)) {
			console.log('redirecting to redirectURL');
			event.cookies.delete(C.redirect, { path: '/' });
			return new Response(undefined, {
				status: 302,
				headers: {
					'Set-Cookie': deleteCookieHeader(C.redirect),
					Location: redirectURLString
				}
			});
		}
	}
	return resolve(event);
};

// Remove the cookie by setting an empty value and an expiry date in the past
export const deleteCookieHeader = (name: string) =>
	`${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

const requestTimeHandler: Handle = async ({ event, resolve }) => {
	const startTime = Date.now();
	let response: Response | undefined;
	try {
		response = await resolve(event);
		return response;
	} finally {
		const timeTaken = Date.now() - startTime;
		const logData: {
			method: string;
			route: string;
			status: number;
			timeTaken: number;
			path?: string;
		} = {
			method: event.request.method,
			route: event.route.id ?? '',
			status: response?.status ?? 0,
			timeTaken
		};
		if (dev) {
			logData.path = event.url.pathname;
		}
		console.info(logData);
	}
};

export const handle: Handle = sequence(requestTimeHandler, redirectHandler, authSessionHandler);
