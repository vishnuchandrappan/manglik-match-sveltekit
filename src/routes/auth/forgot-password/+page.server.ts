import { getBaseURL } from '$lib/server/helpers.js';
import { supabase } from '$lib/supabaseClient.js';
import { URLS } from '$lib/urls.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (typeof email !== 'string') {
			console.error('missing params', { email });
			return fail(400, { email, missing: true });
		}

		const baseURL = getBaseURL(request);
		const redirectTo = `${baseURL}${URLS.app.forgotPassword.verify}`;

		await supabase.auth.resetPasswordForEmail(email, {
			redirectTo
		});

		return {
			submitted: true
		};
	}
};
