<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '$components/Icon.svelte';
	import PasswordField from '$components/PasswordField.svelte';
	import ValidatedField from '$components/ValidatedField.svelte';
	import { ChevronRightIcon } from 'svelte-feather-icons';
	import { fade, slide } from 'svelte/transition';
	import { z } from 'zod';

	export let form;
	let password: string;
	let passwordConfirmation: string;
	let loading = false;

	const handlePasswordInput = (
		e: CustomEvent<{
			key: string;
			value: string;
		}>
	) => {
		const { key, value } = e.detail;
		if (key === 'password') {
			password = value;
		} else {
			passwordConfirmation = value;
		}
	};
</script>

<h1 class="text-5xl font-extrabold" in:fade>Sign up</h1>
<form
	class="flex flex-col text-2xl pb-14 overflow-y-scroll w-full p-4"
	method="post"
	in:fade
	use:enhance={() => {
		loading = true;
		() => {
			loading = false;
		};
	}}
>
	{#if form?.error}
		<p class="text-red-600 my-2" transition:slide>{form?.error}</p>
	{/if}
	{#if form?.success}
		<p class="text-success my-2 text-center" transition:slide>
			You have been signed up! Check your email for the verification URL
		</p>
	{:else}
		<div class="flex flex-col gap-2 flex-[2]">
			<ValidatedField
				name="name"
				label="Full name"
				validate={(value) =>
					value && value.length < 3 ? 'Name must be at least 3 characters' : null}
				placeholder="John Doe"
			/>
			<ValidatedField
				name="email"
				label="Email"
				validate={(value) =>
					value && !z.string().email().safeParse(value).success ? 'Invalid email address' : null}
				placeholder="john@example.com"
			/>
			<ValidatedField
				name="phoneNumber"
				label="Phone number"
				validate={(value) =>
					value &&
					!z
						.string()
						.refine((value) => /^\d{10}$/.test(value))
						.safeParse(value).success
						? 'Invalid phone number. It should be exactly 10 digits & only contain numbers'
						: null}
				placeholder="9090909090"
			/>
			<div class="flex flex-col md:flex-row gap-2">
				<PasswordField
					name="password"
					label="Password"
					validate={(value) =>
						value && value.length < 8 ? 'Password must be at least 8 characters' : null}
					placeholder="Password"
					on:input={handlePasswordInput}
				/>
				<PasswordField
					name="passwordConfirmation"
					label="Confirm password"
					validate={(value) =>
						value && password && value !== password ? "Password doesn't match" : null}
					placeholder="Password"
					on:input={handlePasswordInput}
				/>
			</div>
			<div class="flex justify-end mt-2">
				<button class="btn btn-primary">
					Create my account
					{#if loading}
						<span class="loading"></span>
					{:else}
						<Icon Component={ChevronRightIcon} />
					{/if}
				</button>
			</div>
		</div>
	{/if}
</form>
