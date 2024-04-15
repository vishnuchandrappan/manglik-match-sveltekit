<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import { URLS } from '$lib/urls.js';
	import { LogOutIcon } from 'svelte-feather-icons';

	export let btnClasses = '';
	$: data = $page.data;

	const logout = async () => {
		const { error } = await data.supabase.auth.signOut();
		if (error) {
			console.error('Error logging out:', error.message);
			return;
		}

		await goto(URLS.app.login.email);
	};
</script>

<button class={btnClasses} on:click={logout}>
	<Icon Component={LogOutIcon} />
	Logout
</button>
