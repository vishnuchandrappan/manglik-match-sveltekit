<script lang="ts">
	import type { LogInIcon } from 'svelte-feather-icons';

	export let Component: typeof LogInIcon; // Couldn't find a generic type.
	export let size = '1.2x';
</script>

<svelte:component this={Component} {size} />
