<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<h1>Whoops!</h1>
	{#if $page.status === 404}
		<h3>{$page.status} Not Found</h3>
		<p>We seem to have taken a wrong turn</p>
	{:else}
		<h3>{$page.status} {$page.error?.message}</h3>
	{/if}
</div>

<style>
	div {
		text-align: center;
		padding-top: 2rem;
	}
</style>
