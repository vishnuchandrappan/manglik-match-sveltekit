import { dangerousPrisma } from '$lib/prisma';

export const load = async () => {
	const users = await dangerousPrisma.user.findMany({});

	return { users };
};
