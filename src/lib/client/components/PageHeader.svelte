<script lang="ts">
	import { blur } from 'svelte/transition';

	export let title: string;
	export let withDivider = true;
</script>

<div class="h-20">
	<div class="flex items-center justify-between">
		<h1 class="text-4xl font-extrabold" in:blur>{title}</h1>
		<div class="grow flex justify-end gap-2">
			<slot />
		</div>
	</div>
	<slot name="divider">
		{#if withDivider}
			<span class="divider"></span>
		{/if}
	</slot>
</div>
