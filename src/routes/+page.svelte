<script lang="ts">
	let fileInput: HTMLInputElement;
	let output: HTMLElement;

	let showSentModal = false;
	let showPreview = false;

	let filesSent = 0;

	const clearPreview = () => {
		showPreview = false;
		output.innerHTML = '';
	};

	const fileChanged = () => {
		const files = fileInput.files;
		output.innerHTML = '';
		if (files && files.length > 0) {
			if (files.length > 10) {
				alert('Please only upload 10 files at a time');
				return;
			}
			for (const file of files) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					let imgData = e.target?.result?.toString();
					let imgName = file.name;

					output.innerHTML += `<img src="${imgData}" title="${imgName}" alt="d" class="col-6" style="padding-bottom: 1rem" />`;
				};
			}
			showPreview = true;
			return;
		}
		showPreview = false;
	};

	const sendImages = () => {
		console.log(fileInput.files);
	};

	const uploadButtonClicked = () => {
		fileInput.click();
	};

	const clearButtonClicked = () => {
		clearPreview();
	};

	const submitButtonClicked = () => {
		showSentModal = true;
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
		<p>Upload up to 10 photos at a time</p>
		<button on:click={uploadButtonClicked}>Take or Upload Photos</button>
	{/if}
	<input
		on:change={fileChanged}
		bind:this={fileInput}
		type="file"
		accept="image/*"
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
		<h3>Uploaded {filesSent} photo(s)</h3>
		<h5>Thank you!</h5>
		<footer>
			<button on:click={closeModal}>Ok</button>
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
