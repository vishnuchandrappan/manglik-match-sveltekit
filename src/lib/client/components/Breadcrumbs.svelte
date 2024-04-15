<script lang="ts">
	import type { BreadcrumbLink } from '../types';

	export let links: BreadcrumbLink[];
</script>

<div class="text-sm breadcrumbs">
	<ul>
		{#each links as { label, link }}
			<li>
				{#if link}
					<a href={link}>{label}</a>
				{:else}
					{label}
				{/if}
			</li>
		{/each}
	</ul>
</div>
