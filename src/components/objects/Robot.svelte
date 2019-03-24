<script>
	import { fade } from 'svelte/transition';
	export let pos_x;
	export let alive = true;
</script>

<style>
	.container {
		display: flex;
		align-items: flex-end;
		width: 100%;
		height: 5vmin;
	}

	.pad {
		width: 20vmin;
		height: 50%;
		background-color: #676778;
	}
</style>

<div class="container">
	{#if alive}
		<div class="pad" style="transform: translateX({pos_x}vmin);" transition:fade />
	{/if}
</div>
