<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import { convertToHumanReadableDate } from '$lib/client/helpers';
	import { ChevronRightIcon, PlusIcon, TrashIcon } from 'svelte-feather-icons';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<div class="flex flex-col" in:fade>
	<PageHeader title="Users">
		<button class="btn btn-primary btn-sm">
			<Icon Component={PlusIcon} />
			Add user</button
		>
	</PageHeader>
	<div class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Email</th>
					<th>Phone number</th>
					<th>Joined on</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.users as user, index}
					<tr class="hover">
						<th>{index + 1}</th>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>+91 {user.phoneNumber}</td>
						<td>{convertToHumanReadableDate(user.createdAt)}</td>
						<td>
							<button class="btn btn-sm btn-primary btn-square">
								<Icon Component={ChevronRightIcon} />
							</button>
							<button class="btn btn-sm btn-error btn-square">
								<Icon Component={TrashIcon} />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
