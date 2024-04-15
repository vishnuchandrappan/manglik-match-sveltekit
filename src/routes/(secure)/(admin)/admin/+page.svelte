<script lang="ts">
	import PageHeader from '$components/PageHeader.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col" in:fade>
	<PageHeader title="Admin Dashboard" />
	<div>
		<ul>
			<li>Show</li>
			<li>Something</li>
			<li>Here..</li>
		</ul>
	</div>
</div>
