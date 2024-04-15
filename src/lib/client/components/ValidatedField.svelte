<script lang="ts">
	import LabelledElement from '$components/LabelledElement.svelte';
	import { createEventDispatcher } from 'svelte';
	import { CheckCircleIcon } from 'svelte-feather-icons';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { fade, slide } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let label: string;
	export let name: string;
	export let placeholder = 'Type here...';
	export let inputClasses = '';
	export let errorClasses = '';
	export let validate: (value: string) => string | null;
	export let defaultValue = '';
	export let type: HTMLInputTypeAttribute = 'text';
	export let required = true;

	let value = defaultValue;
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
			{type}
			class="input input-bordered join-item grow {inputClasses}"
			on:input={handleInput}
			{value}
			{placeholder}
			{name}
			{required}
		/>
		<button type="button" class="btn btn-square join-item">
			{#if value && !error}
				<span in:fade class="text-success">
					<Icon Component={CheckCircleIcon} />
				</span>
			{/if}
		</button>
	</div>
	{#if error}
		<p class="text-sm mt-1 text-red-600 {errorClasses}" transition:slide>{error}</p>
	{/if}
</LabelledElement>
