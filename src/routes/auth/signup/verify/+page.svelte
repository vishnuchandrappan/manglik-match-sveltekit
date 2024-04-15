<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { URLS } from '$lib/urls.js';
	import { onMount } from 'svelte';

	export let data;

	onMount(async () => {
		const hashParams = new URLSearchParams($page.url.hash.slice(1));
		const token = hashParams.get('access_token');
		const refreshToken = hashParams.get('refresh_token');

		if (!token || !refreshToken) {
			return;
		}

		const status = await data.supabase.auth.setSession({
			access_token: token,
			refresh_token: refreshToken
		});

		if (status) {
			setTimeout(async () => {
				await goto(URLS.app.home);
			}, 10);
		}
	});
</script>

<div class="w-screen h-screen flex justify-center items-center flex-col">
	<h1 class="text-2xl">Verifying Signup</h1>
	<span class="loading loading-dots loading-lg"></span>
</div>
