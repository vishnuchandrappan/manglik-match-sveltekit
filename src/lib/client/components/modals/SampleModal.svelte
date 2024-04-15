<script lang="ts">
	import ModalBase from './ModalBase.svelte';

	export let isOpen: boolean;
</script>

<ModalBase {isOpen} title="Sample">
	<div class="bg-base-200">
		<h1 class="text text-6xl">Test Modal</h1>
	</div>
</ModalBase>
