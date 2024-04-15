import { supabaseAdmin } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';
import { z } from 'zod';

const UpdatePasswordParams = z
	.object({
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword']
	});

export const PATCH = async ({ locals: { user }, request }) => {
	const data = await request.json();
	const { password } = UpdatePasswordParams.parse(data);

	const response = await supabaseAdmin.auth.admin.updateUserById(user.supabaseUserID, {
		password
	});

	if (response.error) {
		return json({ success: false, error: response.error.message });
	}

	return json({ success: true });
};
