<script lang="ts">
	import { page } from '$app/stores';
	import type { FileTextIcon } from 'svelte-feather-icons';
	import Icon from './Icon.svelte';

	export let Component: typeof FileTextIcon;
	export let link: string;
	export let label = '';

	$: active = $page.url.href.endsWith(link);
</script>

<li>
	<a href={link} class:active>
		<Icon {Component} />
		{label}
	</a>
</li>
