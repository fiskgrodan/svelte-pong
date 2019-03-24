<script>
	import { fade } from 'svelte/transition';
	export let pos_x;
	export let pos_y;
	export let alive = true;
</script>

<style>
	.container {
		width: 100%;
		height: 90vmin;
	}

	.ball {
		width: 2vmin;
		height: 2vmin;
		background-color: #ff3e00;
	}
</style>

<div class="container">
	{#if alive}
		<div class="ball" style="transform: translate({pos_x}vmin, {pos_y}vmin);" transition:fade />
	{/if}
</div>
