import { dangerousPrisma } from '$lib/prisma';
import { getBaseURL } from '$lib/server/helpers';
import { supabase } from '$lib/supabaseClient';
import { URLS } from '$lib/urls';
import type { Prisma } from '@prisma/client';
import { fail, type Actions } from '@sveltejs/kit';

type SignupParams = {
	email: string;
	password: string;
	phone: string;
};

const signUpNewUser = async (params: SignupParams, baseURL: string) => {
	const { email, password, phone } = params;
	const response = await supabase.auth.signUp({
		email,
		password,
		phone,
		options: {
			emailRedirectTo: `${baseURL}${URLS.app.signup.verify}`
		}
	});

	return response;
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const passwordConfirmation = data.get('passwordConfirmation');
		const name = data.get('name');
		const phoneNumber = data.get('phoneNumber');
		const baseURL = getBaseURL(request);

		if (
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			typeof passwordConfirmation !== 'string' ||
			typeof name !== 'string' ||
			typeof phoneNumber !== 'string'
		) {
			return fail(400, {
				error: 'Invalid input. Some fields are missing or invalid.'
			});
		}

		if (password !== passwordConfirmation) {
			return fail(400, {
				error: 'Password and password confirmation do not match.'
			});
		}

		const user = await signUpNewUser(
			{
				email,
				password,
				phone: phoneNumber
			},
			baseURL
		);

		if (user.error || user.data === null || user.data.user === null) {
			return fail(400, {
				error:
					'Email ID or phone number already exists. Please try again with a different email ID or phone number.'
			});
		}

		const userParams: Prisma.UserCreateInput = {
			email,
			name,
			phoneNumber,
			supabaseUserID: user.data.user.id
		};

		const createdUser = await dangerousPrisma.user.create({
			data: userParams
		});

		if (!createdUser) {
			return fail(500, {
				error: 'Failed to create user. Please contact customer support.'
			});
		}

		return {
			success: true
		};
	}
} satisfies Actions;
