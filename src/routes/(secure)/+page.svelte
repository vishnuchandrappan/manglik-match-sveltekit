<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import { URLS } from '$lib/urls.js';
	import { LogOutIcon } from 'svelte-feather-icons';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
			return;
		}

		await goto(URLS.app.login.email);
	};
</script>

<div class="flex flex-col gap-2 justify-center items-center h-full">
	<h1 class="text-6xl font-extralight text-center">Hello, World! {data.user.name}</h1>
	<button class="btn btn-primary my-5" on:click={logout}>
		<Icon Component={LogOutIcon} />
		Logout
	</button>
</div>
