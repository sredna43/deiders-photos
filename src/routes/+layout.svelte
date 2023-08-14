<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<body>
	<main class="container">
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
	<footer>Deidree & Anders - 2023</footer>
</body>

<style>
	nav {
		justify-content: center;
		padding-bottom: 50px;
	}
	a {
		font-size: xx-large;
	}
	.vl {
		border-left: 3px solid #373c44;
		height: 3rem;
	}
	main {
		padding-bottom: 2.5rem;
	}
	footer {
		text-align: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 2.5rem;
	}
</style>
