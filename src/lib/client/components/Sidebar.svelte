<script lang="ts">
	import { HomeIcon, ListIcon, UsersIcon } from 'svelte-feather-icons';
	import type { NavLink } from '../types';
	import LogoutButton from './LogoutButton.svelte';
	import SidebarLink from './SidebarLink.svelte';

	const links: NavLink[] = [
		{
			label: 'Dashboard',
			link: '/admin',
			Component: HomeIcon
		},
		{
			label: 'Users',
			link: '/admin/users',
			Component: UsersIcon
		},
		{
			label: 'Exercises',
			link: '/admin/exercises',
			Component: ListIcon
		}
	];
</script>

<ul class="menu rounded-box gap-2">
	{#each links as link}
		<SidebarLink {...link} />
	{/each}
</ul>
<div class="flex flex-col gap-2 items-start">
	<LogoutButton btnClasses="btn btn-ghost" />
</div>
