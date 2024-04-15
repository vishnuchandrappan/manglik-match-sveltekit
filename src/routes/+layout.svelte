<script>
	import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import { Modals, closeModal } from 'svelte-modals';
	import '../app.css';
	export let data;
	let loading = false;

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{#if loading}
	<div role="status" class="w-screen animate-pulse absolute left-0 top-0 h-1 z-50">
		<div class="w-screen h-1 bg-primary"></div>
	</div>
{/if}
<slot />
<Modals>
	<button
		slot="backdrop"
		class="backdrop-blur-sm fixed top-0 bg-backdrop bottom-0 left-0 right-0 bg-black opacity-50"
		on:click={closeModal}
	/>
</Modals>
<Toaster toastOptions={{ duration: 3000 }} />
