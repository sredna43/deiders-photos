<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<body>
	<main class="container">
		<nav>
			<ul>
				<li>
					<a href="/" class={$page.url.pathname === '/' ? 'primary' : 'secondary'}>Capture</a>
				</li>
				<div class="vl" />
				<li>
					<a href="/view" class={$page.url.pathname === '/view' ? 'primary' : 'secondary'}>View</a>
				</li>
			</ul>
		</nav>
		<slot />
	</main>
	<footer>Deidree & Anders - 2023</footer>
</body>

<style>
	body {
		margin: 0;
		display: flex;
		flex-flow: column;
		min-height: 100vh;
	}

	main {
		flex-grow: 1;
		padding-bottom: 2.5rem;
	}

	nav {
		justify-content: center;
		padding-bottom: 1rem;
	}

	a {
		font-size: xx-large;
	}

	.vl {
		border-left: 3px solid #373c44;
		height: 3rem;
	}

	footer {
		text-align: center;
		width: 100%;
	}
</style>
