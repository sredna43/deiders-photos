<script lang="ts">
	import { API_URL } from '$lib';
	import FaAngleLeft from 'svelte-icons/fa/FaAngleLeft.svelte';
	import FaAngleRight from 'svelte-icons/fa/FaAngleRight.svelte';
	import { browser } from '$app/environment';

	export let data;
	let page = 1;
	let perPage = 6;
	let imagesOnPage = [''];

	let previousDisabled = true;
	let nextDisabled = false;

	const changePage = () => {
		let offset = (page - 1) * perPage;
		let lastIndex = Math.min(offset + perPage, data.images.length);
		previousDisabled = page == 1;
		nextDisabled = lastIndex == data.images.length;
		imagesOnPage = data.images.slice(offset, lastIndex);
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	const nextPage = () => {
		if (nextDisabled) return;
		page += 1;
		changePage();
	};

	const lastPage = () => {
		if (previousDisabled) return;
		page -= 1;
		changePage();
	};

	if (browser) changePage();
</script>

<div class="view">
	{#each imagesOnPage as image}
		<div class="blank">
			<img src={`${API_URL}/image/${image}`} alt={image} />
		</div>
	{/each}

	<div class="nav-buttons">
		<div
			class={previousDisabled ? 'icon disabled' : 'icon'}
			on:click={lastPage}
			on:keydown={lastPage}
			role="cell"
			tabindex="0"
		>
			<FaAngleLeft />
		</div>
		<div
			class={nextDisabled ? 'icon disabled' : 'icon'}
			style="margin-left: 3rem;"
			on:click={nextPage}
			on:keydown={nextPage}
			role="cell"
			tabindex="0"
		>
			<FaAngleRight />
		</div>
	</div>
</div>

<style>
	.blank {
		background: transparent url('../../static/uploading-downloading.gif') center center no-repeat;
	}

	.view {
		align-content: center;
		text-align: center;
	}

	img {
		padding-bottom: 2rem;
	}

	.nav-buttons {
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.icon {
		width: 32px;
		color: #373c44;
		border-radius: 0.25rem;
		transition: 0.3s;
	}

	.icon:hover {
		background-color: #b6b9bf15;
		cursor: pointer;
	}

	.disabled {
		color: #373c4459;
		pointer-events: none;
	}
</style>
