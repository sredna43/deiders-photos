<script lang="ts">
	let fileInput: HTMLInputElement;
	let cameraInput: HTMLInputElement;
	let output: HTMLElement;
	let showPreview = false;

	const fileChanged = () => {
		const files = fileInput.files;
		output.innerHTML = '';
		if (files && files.length > 0) {
			for (const file of files) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					let imgData = e.target?.result?.toString();
					let imgName = file.name;

					output.innerHTML += `<div><img src="${imgData}" title="${imgName}" alt="d" /></div>`;
				};
			}
			showPreview = true;
			return;
		}
		showPreview = false;
	};

	const uploadButtonClicked = () => {
		fileInput.click();
	};

	const cameraButtonClicked = () => {
		cameraInput.click();
	};
</script>

<div class="main">
	<div class="grid preview" bind:this={output} />
	{#if showPreview}
		<button>Submit</button>
	{/if}
	<button on:click={uploadButtonClicked}>Upload Photos</button>
	<button on:click={cameraButtonClicked}>Take a Photo</button>
	<input
		on:change={fileChanged}
		bind:this={fileInput}
		type="file"
		accept="image/*"
		hidden
		multiple
	/>
	<input
		on:change={fileChanged}
		bind:this={cameraInput}
		type="file"
		accept="image/*"
		capture="environment"
		hidden
		multiple
	/>
</div>

<style>
	.main {
		padding-left: 20%;
		padding-right: 20%;
		text-align: center;
	}

	.preview {
		padding-bottom: 1rem;
	}
</style>
