<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import LabelledElement from '$components/LabelledElement.svelte';
	import { URLS } from '$lib/urls';
	import { ChevronRightIcon } from 'svelte-feather-icons';
	import { fade, slide } from 'svelte/transition';

	export let form;
	let email = 'john@example.com';
	let loading = false;
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="text-5xl font-extrabold">Reset password</h1>
	{#if form?.submitted}
		<div class="min-h-[50vh] flex justify-center items-center flex-col">
			<span class="text-lg opacity-50">
				You will receive an email to
				<span class="font-bold">{email}</span>
				with a link to reset your password if the email is registered.
			</span>
			<button
				class="btn btn-primary mt-4"
				on:click={async () => {
					await invalidateAll();
				}}>Change email</button
			>
		</div>
	{:else}
		<form
			class="mt-16 flex flex-col text-2xl w-[90%] sm:w-[60vw]"
			method="post"
			use:enhance={() => {
				loading = true;
				() => {
					loading = false;
				};
			}}
		>
			<div class="border-2 rounded p-4 h-72 flex border-gray-600 w-full flex-col md:flex-row">
				<div class="flex items-center flex-[2]">
					<div class="flex flex-col gap-6 w-full">
						<LabelledElement label="Email">
							<input
								in:fade
								type="email"
								name="email"
								placeholder="john@example.com"
								class="input input-bordered w-full"
								bind:value={email}
								required
							/>
							{#if form?.missing}
								<span class="text-sm text-red-500" in:slide> Email is required </span>
							{/if}
						</LabelledElement>
						<div class="flex justify-between">
							<a class="text-sm link" href={URLS.app.login.email}>Login instead?</a>
							<button class="btn btn-primary">
								Send reset link
								{#if loading}
									<span class="loading"></span>
								{:else}
									<Icon Component={ChevronRightIcon} />
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-2 text-base font-medium p-4">
				Didn't signup yet?
				<a href={URLS.app.signup.root} class="text-primary-700 underline"> Register here </a>
			</div>
		</form>
	{/if}
</div>
