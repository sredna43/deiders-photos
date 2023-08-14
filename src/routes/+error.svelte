<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Whoops!</h1>
{#if $page.status === 404}
	<h3>{$page.status} Not Found</h3>
	<p>We seem to have taken a wrong turn</p>
{/if}
