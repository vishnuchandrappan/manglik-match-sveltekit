<script lang="ts">
	import { SettingsIcon, UserIcon } from 'svelte-feather-icons';
	import Icon from './Icon.svelte';
	import LogoutButton from './LogoutButton.svelte';
</script>

<a href="/admin" class="btn btn-sm btn-ghost font-extrabold text-2xl">NOW</a>
<div class="grow flex justify-end gap-2 items-center">
	<div class="dropdown dropdown-end">
		<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
				<img
					alt="Tailwind CSS Navbar component"
					src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
				/>
			</div>
		</div>
		<button
			tabindex="0"
			class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
		>
			<li>
				<a href="/admin/profile" class="justify-between">
					<Icon Component={UserIcon} />
					Profile
				</a>
			</li>
			<li>
				<a href="/admin/settings">
					<Icon Component={SettingsIcon} />
					Settings</a
				>
			</li>
			<li>
				<LogoutButton />
			</li>
		</button>
	</div>
</div>
