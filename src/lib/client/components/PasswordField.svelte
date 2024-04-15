<script lang="ts">
	import LabelledElement from '$components/LabelledElement.svelte';
	import { createEventDispatcher } from 'svelte';
	import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons';
	import { fade, slide } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let label: string;
	export let name: string;
	export let placeholder = 'Password';
	export let inputClasses = '';
	export let errorClasses = '';
	export let validate: (value: string) => string | null;
	export let defaultValue = '';

	let value = defaultValue;
	let showPassword = false;
	const dispatch = createEventDispatcher();

	$: error = validate(value);

	const handleInput = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
		dispatch('input', {
			key: name,
			value
		});
	};
</script>

<LabelledElement {label}>
	<div class="join w-full border border-transparent" class:border-error={error}>
		<input
			type={showPassword ? 'text' : 'password'}
			class="input input-bordered join-item grow {inputClasses}"
			on:input={handleInput}
			{value}
			{placeholder}
			required
			{name}
		/>
		<button
			on:click={() => (showPassword = !showPassword)}
			type="button"
			class="btn btn-square join-item"
		>
			{#if showPassword}
				<span in:fade>
					<Icon Component={EyeIcon} />
				</span>
			{:else}
				<span in:fade>
					<Icon Component={EyeOffIcon} />
				</span>
			{/if}
		</button>
	</div>
	{#if error}
		<p class="text-sm mt-1 text-red-600 {errorClasses}" transition:slide>{error}</p>
	{/if}
</LabelledElement>
