<script lang="ts">
	import { API_URL } from '$lib';

	const MAX_FILES = 6;
	let fileInput: HTMLInputElement;
	let output: HTMLElement;

	let showSentModal = false;
	let showPreview = false;

	let sending = true;
	let apiError = '';

	let showOk = false;

	let filesSent = 0;

	const clearPreview = () => {
		showPreview = false;
		output.innerHTML = '';
	};

	const fileChanged = () => {
		const files = fileInput.files;
		output.innerHTML = '';
		if (files && files.length > 0) {
			if (files.length > MAX_FILES) {
				alert(`Please only upload ${MAX_FILES} files at a time`);
				return;
			}
			for (const file of files) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					let imgData = e.target?.result?.toString();
					let imgName = file.name;

					output.innerHTML += `<img src="${imgData}" title="${imgName}" alt="${imgName}" class="col-6" style="margin-bottom: calc(var(--bs-gutter-x) * 0.5);" />`;
				};
			}
			showPreview = true;
			return;
		}
		showPreview = false;
	};

	const sendImages = () => {
		apiError = '';
		const files = fileInput.files;
		const data = new FormData();

		if (files) {
			for (const file of files) {
				data.append(
					'files',
					file,
					file.name.includes('image')
						? `${Math.round(Math.random() * (1000000000000 - 1) + 1)}${file.name}`
						: file.name
				);
			}
		}

		const options = {
			method: 'POST',
			body: data
		};
		fetch(`${API_URL}/upload`, options)
			.then(() => {
				sending = false;
				showOk = true;
			})
			.catch((e: TypeError) => {
				sending = false;
				apiError = e.message;
				showOk = true;
			});
	};

	const uploadButtonClicked = () => {
		showOk = false;
		fileInput.click();
	};

	const clearButtonClicked = () => {
		clearPreview();
	};

	const submitButtonClicked = () => {
		showSentModal = true;
		sending = true;
		filesSent = fileInput.files?.length || 0;
		sendImages();
		clearPreview();
	};

	const closeModal = () => {
		showSentModal = false;
	};
</script>

<div class="main container">
	<div class="row preview" bind:this={output} />
	{#if showPreview}
		<div class="grid preview-buttons">
			<button class="secondary" on:click={clearButtonClicked}>Clear</button>
			<button on:click={submitButtonClicked}>Submit</button>
		</div>
	{:else}
		<p>Upload up to {MAX_FILES} photos at a time</p>
		<button on:click={uploadButtonClicked}>Take or Upload Photos</button>
	{/if}
	<input
		on:change={fileChanged}
		bind:this={fileInput}
		type="file"
		accept="image/jpeg, image/jpg, image/png"
		hidden
		multiple
	/>
</div>

<dialog open={showSentModal}>
	<article>
		<a
			href="#close"
			aria-label="Close"
			class="close"
			data-target="modal-example"
			on:click={closeModal}
		/>
		{#if sending}
			<h1>Loading...</h1>
			<p>(This could take some time if you've uploaded many photos... hang tight!)</p>
		{:else if apiError !== ''}
			<h1>Whoops!</h1>
			<p>{apiError}</p>
		{:else}
			<h3>Uploaded {filesSent} {filesSent > 1 ? 'photo(s)' : 'photo'}</h3>
			<h5>Thank you!</h5>
		{/if}
		<footer>
			{#if showOk}
				<button on:click={closeModal}>Ok</button>
			{/if}
		</footer>
	</article>
</dialog>

<style>
	.main {
		padding-left: 20%;
		padding-right: 20%;
		text-align: center;
	}

	.preview {
		padding-bottom: 1rem;
	}

	article {
		min-width: 50%;
	}
</style>
