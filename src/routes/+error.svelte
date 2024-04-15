<script lang="ts">
	import { page } from '$app/stores';
	import { URLS } from '$lib/urls';
</script>

<div class="w-screen h-screen flex flex-col justify-center items-center">
	<h1 class="text-4xl font-bold">{$page.status}</h1>
	<p class="text-lg">{$page.error?.message}</p>
	<div class="mt-4 gap-4">
		<a href={URLS.home} class="btn btn-sm btn-outline btn-primary"> Go to home </a>
	</div>
</div>
