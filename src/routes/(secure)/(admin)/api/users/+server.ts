import { dangerousPrisma } from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

// Sample api. Not being used anywhere.
export const GET = async () => {
	const users = await dangerousPrisma.user.findMany({});
	return json(users);
};
