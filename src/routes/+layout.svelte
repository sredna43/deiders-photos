<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<body>
	<main class="container">
		<h1>Deidree & Anders Wedding Pics</h1>
		<nav>
			<ul>
				<li><a href="/" class={$page.url.pathname === '/' ? 'primary' : 'secondary'}>Upload</a></li>
				<div class="vl" />
				<li>
					<a href="/view" class={$page.url.pathname === '/view' ? 'primary' : 'secondary'}>View</a>
				</li>
			</ul>
		</nav>
		<slot />
	</main>
</body>

<style>
	nav {
		justify-content: center;
	}
	a {
		font-size: xx-large;
	}
	.vl {
		border-left: 3px solid grey;
		height: 3rem;
	}
	h1 {
		text-align: center;
	}
</style>
