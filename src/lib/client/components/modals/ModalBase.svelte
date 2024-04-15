<script lang="ts">
	import { closeModal } from 'svelte-modals';

	export let isOpen: boolean;
	export let closeBtnText = '✕';
	export let closeBtnClasses = '';
	export let fullWidth = false;
	export let title = '';
</script>

{#if isOpen}
	<div
		role="dialog"
		class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center pointer-events-none z-[98]"
	>
		<div
			class="modal-box rounded-md p-4 bg-white flex flex-col justify-between pointer-events-auto z-[99] {fullWidth
				? 'w-11/12 max-w-5xl'
				: ''}"
		>
			<div class="flex items-center justify-between mb-4">
				<h3 class="font-bold text-2xl">
					{title}
				</h3>
				<button on:click={closeModal} class="btn btn-sm btn-circle btn-ghost {closeBtnClasses}"
					>{closeBtnText}
				</button>
			</div>
			<div class="bg-white pointer-events-auto">
				<slot />
			</div>
		</div>
	</div>
{/if}
