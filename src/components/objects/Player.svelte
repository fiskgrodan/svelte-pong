<script>
	import { fade } from 'svelte/transition';
	export let pos_x;
	export let alive = true;
</script>

<style>
	.container {
		width: 100%;
		height: 5vmin;
	}
	
	.pad {
		display: flex;
		align-items: flex-start;
		width: 20vmin;
		height: 50%;
		background-color: #40b3ff;
	}
</style>

<div class="container">
	{#if alive}
		<div class="pad" style="transform: translateX({pos_x}vmin);" transition:fade />
	{/if}
</div>
