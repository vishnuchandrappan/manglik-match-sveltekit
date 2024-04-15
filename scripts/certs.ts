import { globbySync } from 'globby';
const files = globbySync(['certs/*.crt', 'certs/*.key']).sort();
const hasCerts = files.length > 0;

export const certs = hasCerts
	? {
			cert: files[0],
			key: files[1]
		}
	: undefined;
