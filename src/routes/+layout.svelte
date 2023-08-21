<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import { page } from '$app/stores';
	import FaHeart from 'svelte-icons/fa/FaHeart.svelte';
</script>

<body>
	<main class="container">
		<nav>
			<ul>
				<li>
					<a href="/" class={$page.url.pathname === '/' ? 'primary navlink' : 'secondary navlink'}
						>Capture</a
					>
				</li>
				<div class="vl" />
				<li>
					<a
						href="/view"
						class={$page.url.pathname === '/view' ? 'primary navlink' : 'secondary navlink'}>View</a
					>
				</li>
			</ul>
		</nav>
		<slot />
	</main>
	<footer>
		<a href="#top" class="footerlink" data-tooltip="Made by Anders, if it sucks blame him :)"
			>Deidree & Anders - 2023 <div class="icon"><FaHeart class="icon" /></div></a
		>
	</footer>
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

	.navlink {
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

	.footerlink {
		color: #373c44;
		display: flex;
		justify-content: center;
		text-decoration: none;
	}

	.icon {
		width: 1rem;
		margin-left: 1rem;
	}
</style>
