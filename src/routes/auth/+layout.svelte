<script lang="ts">
	import BottomNav from '$components/BottomNav.svelte';
	import type { NavLink } from '$lib/client/types';
	import { URLS } from '$lib/urls';
	import { LogInIcon, UserPlusIcon } from 'svelte-feather-icons';

	const links: NavLink[] = [
		{ label: 'Login', link: URLS.app.login.email, Component: LogInIcon },
		{ label: 'Signup', link: URLS.app.signup.root, Component: UserPlusIcon }
	];
</script>

<div
	class="h-screen w-screen overflow-hidden overflow-y-auto flex flex-col items-center justify-center"
>
	<slot />
	<BottomNav {links} />
</div>
