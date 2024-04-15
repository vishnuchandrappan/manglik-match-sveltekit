import type { LogInIcon } from 'svelte-feather-icons';
export * from './dbEntities.types';

export interface NavLink {
	label?: string;
	link: string;
	Component: typeof LogInIcon;
}

export interface BreadcrumbLink {
	label: string;
	link?: string;
}
