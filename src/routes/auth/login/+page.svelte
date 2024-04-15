<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import LabelledElement from '$components/LabelledElement.svelte';
	import PasswordField from '$components/PasswordField.svelte';
	import { URLS } from '$lib/urls';
	import { ChevronRightIcon } from 'svelte-feather-icons';
	import { fade, slide } from 'svelte/transition';

	export let data;

	let email = 'john@example.com';
	let password = 'password';
	let loading = false;
	let error = '';

	$: supabase = data.supabase;

	const handleLogin = async () => {
		if (!email || !password) {
			error = 'Please fill in all the fields';
			return;
		}
		loading = true;
		error = '';
		const loginResponse = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (loginResponse.error) {
			error = loginResponse.error.message;
			loading = false;
			return;
		}

		if (loginResponse.data === null) {
			error = 'Invalid login credentials';
			loading = false;
			return;
		}

		loading = false;
		await goto(URLS.app.home);
	};

	const handleInput = (e: CustomEvent<{ value: string }>) => {
		password = e.detail.value;
	};
</script>

<h1 class="text-5xl font-extrabold" in:fade>Login</h1>
<form
	class="flex flex-col text-2xl pb-14 overflow-y-scroll w-full p-4"
	on:submit|preventDefault={handleLogin}
	in:fade
>
	<div class="flex flex-col gap-6 flex-[2]">
		{#if error}
			{#if error === 'Invalid login credentials'}
				<p class="text-red-500 text-sm" transition:slide>Invalid email or password</p>
			{:else}
				<p class="text-red-500 text-sm" transition:slide>{error}</p>
			{/if}
		{/if}
		<LabelledElement label="Email">
			<input
				type="email"
				name="email"
				placeholder="john@example.com"
				class="input input-bordered w-full"
				bind:value={email}
				required
			/>
		</LabelledElement>
		<PasswordField
			name="password"
			label="Password"
			defaultValue={password}
			placeholder="Type here..."
			validate={(value) =>
				value && value.length < 8 ? 'Password must be at least 8 characters' : null}
			on:input={handleInput}
		/>
		<div class="flex justify-between items-baseline">
			<a class="text-sm link" href={URLS.app.forgotPassword.root}>Forgot password?</a>
			<button class="btn btn-primary">
				Login
				{#if loading}
					<span class="loading"></span>
				{:else}
					<Icon Component={ChevronRightIcon} />
				{/if}
			</button>
		</div>
	</div>
</form>
