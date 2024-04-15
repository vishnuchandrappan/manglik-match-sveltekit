export const TID = {
	loader: 'loader'
} as const;

export const C = {
	loginSuccess: 'You have successfully logged in',
	redirect: 'redirect',
	supabaseCookieKey: 'sb-now-auth-token',

	regex: {
		domain: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/,
		email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
	}
} as const;
