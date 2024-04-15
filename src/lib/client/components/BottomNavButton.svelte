<script lang="ts">
	import { page } from '$app/stores';
	import type { FileTextIcon } from 'svelte-feather-icons';
	import Icon from './Icon.svelte';

	export let Component: typeof FileTextIcon;
	export let link: string;
	export let label = '';

	$: isActive = $page.url.href.endsWith(link);
</script>

<a href={link} class:active={isActive} class:bg-slate-300={isActive}>
	<Icon {Component} />
	{#if label}
		<span class="btm-nav-label">{label}</span>
	{/if}
</a>
