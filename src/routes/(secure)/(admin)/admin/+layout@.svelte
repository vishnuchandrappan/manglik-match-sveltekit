<script>
	import Navbar from '$components/Navbar.svelte';
	import Sidebar from '$components/Sidebar.svelte';
</script>

<div class="h-screen w-screen overflow-hidden flex flex-col">
	<!-- header -->
	<div class="px-2 py-4 flex items-center justify-between shadow-lg hover:shadow-xl">
		<Navbar />
	</div>
	<!-- body -->
	<div class="grow flex h-full">
		<div class="w-52 px-2 py-4 border-r-2 flex flex-col justify-between items-stretch">
			<Sidebar />
		</div>
		<div class="grow p-4 h-full overflow-scroll">
			<slot />
		</div>
	</div>
</div>
