<!-- src/routes/generate/index.svelte -->
<script>
	let fileInput;
	let previewUrl = "";
	let loading = false;
	let error = "";

	async function uploadSkin() {
		error = "";
		if (!fileInput?.files?.length) {
			error = "Select a skin file first.";
			return;
		}
		const file = fileInput.files[0];
		const fd = new FormData();
		fd.append("skin", file);

		loading = true;
		try {
			const res = await fetch("/api/pfp/upload.png", {
				method: "POST",
				body: fd
			});
			if (!res.ok) {
				const j = await res.json().catch(()=>null);
				throw new Error(j?.error || `Status ${res.status}`);
			}
			const blob = await res.blob();
			previewUrl = URL.createObjectURL(blob);
		} catch (err) {
			error = err.message || String(err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="uploader">
	<input bind:this={fileInput} type="file" accept="image/png" />
	<button on:click={uploadSkin} disabled={loading}>
		{#if loading}Generating...{/if}
		{#if !loading}Upload & Generate PFP{/if}
	</button>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	{#if previewUrl}
		<h3>Result</h3>
		<img src={previewUrl} alt="PFP preview" width="300" height="300" />
	{/if}
</div>

<style>
	.uploader { padding: 1rem; }
	.error { color: red; }
</style>
