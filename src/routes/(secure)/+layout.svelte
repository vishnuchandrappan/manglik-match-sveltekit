<script lang="ts">
	import BottomNav from '$components/BottomNav.svelte';
	import type { NavLink } from '$lib/client/types';
	import { FileTextIcon, HomeIcon, UserIcon } from 'svelte-feather-icons';

	const links: NavLink[] = [
		{ link: '/accounts', Component: FileTextIcon },
		{ link: '/', Component: HomeIcon },
		{ link: '/profile', Component: UserIcon }
	];
</script>

<div class="w-screen h-screen overflow-hidden overflow-y-auto">
	<slot />
	<BottomNav {links} />
</div>
