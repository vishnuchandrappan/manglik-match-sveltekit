<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import PasswordField from '$components/PasswordField.svelte';
	import { URLS } from '$lib/urls.js';
	import { SaveIcon } from 'svelte-feather-icons';
	import toast from 'svelte-french-toast';
	import { fade } from 'svelte/transition';

	export let data;
	let password: string;
	let confirmPassword: string;

	const updateValue = (e: CustomEvent<{ key: string; value: string }>) => {
		const { key, value } = e.detail;
		if (key === 'newPassword') password = value;
		if (key === 'confirmPassword') confirmPassword = value;
	};

	const updatePassword = async () => {
		const response = await fetch(URLS.api.resetPassword, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password, confirmPassword })
		});

		if (response.ok) {
			toast.success('Password updated successfully');
			await data.supabase.auth.signOut();
			await goto(URLS.app.login.email);
		} else {
			toast.error('Failed to update password');
		}
	};
</script>

<div in:fade class="flex h-full flex-col items-center justify-center">
	<h1 class="text-5xl font-extrabold">Reset password</h1>
	<form
		class="mt-16 flex flex-col text-2xl w-[90%] md:w-[60vw]"
		on:submit|preventDefault={updatePassword}
	>
		<div class="border-2 rounded m-4 p-4 flex border-gray-600 w-full">
			<div class="flex items-center flex-[2]">
				<div class="flex flex-col gap-6 w-full">
					<PasswordField
						name="newPassword"
						label="New password"
						on:input={updateValue}
						validate={(value) =>
							value && value.length < 8 ? 'Password must be at least 8 characters' : null}
					/>
					<PasswordField
						name="confirmPassword"
						label="Confirm new password"
						placeholder="Confirm password"
						on:input={updateValue}
						validate={(value) =>
							password && value && password !== value ? 'Passwords do not match!' : null}
					/>
					<div class="flex justify-end">
						<button class="btn btn-primary" disabled={password !== confirmPassword}>
							Update password
							<Icon Component={SaveIcon} />
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
