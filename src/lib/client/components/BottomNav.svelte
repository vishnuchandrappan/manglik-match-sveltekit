<script lang="ts">
	import type { NavLink } from '../types';
	import BottomNavButton from './BottomNavButton.svelte';

	export let links: NavLink[];
</script>

<div class="btm-nav">
	{#each links as link}
		<BottomNavButton {...link} />
	{/each}
</div>
