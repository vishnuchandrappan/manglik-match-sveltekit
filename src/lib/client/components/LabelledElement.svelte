<script lang="ts">
	import { fade } from 'svelte/transition';

	export let label: string;
	export let containerClasses = '';
</script>

<label class="form-control w-full {containerClasses}" in:fade>
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	<slot />
</label>
