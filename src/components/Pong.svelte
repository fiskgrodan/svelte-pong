<script>
	/* ---------------
	/* Pong vs Robot
	/* ---------------
	/* 'A' or 'D':    move pad left or right
	/* '⇦' or '⇨':   move pad left or right
	/* 'P':						pause game
	/* 'R':						restart game
	*/
	import { onMount } from "svelte";
	// Logic
	import { player } from "../stores/player.js";
	import { robot } from "../stores/robot.js";
	import { ball } from "../stores/ball.js";
	import { keystate } from "../stores/keystate.js";
	// View
	import Player from "./objects/Player.svelte";
	import Robot from "./objects/Robot.svelte";
	import Ball from "./objects/Ball.svelte";

	let paused = true;

	onMount(() => {
		let raf;
		const game_loop = () => {
			raf = requestAnimationFrame(game_loop);
			if (!paused) {
				player.update($keystate, $ball);
				robot.update($ball);
				ball.update($player, $robot);
			}
		}

		game_loop();

		return () => cancelAnimationFrame(raf);
	})

	const reset_game = () => {
		player.reset();
		robot.reset();
		ball.reset();
	}

	const handle_keydown = event => {
		if (event.key === 'p') {
			event.preventDefault();
			paused = !paused;
			return;
		}
		if (event.key === 'r') {
			event.preventDefault();
			reset_game();
			paused = false;
			return;
		}
		keystate.keydown(event);
	}

	const handle_keyup = event => keystate.keyup(event);
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: #676778;
	}

	.game {
		width: 100vmin;
		height: 100vmin;
		background-color: #ffffff;
	}
</style>

<svelte:window on:keydown={handle_keydown} on:keyup={handle_keyup} />

<div class="container">
	<div class="game">
		<Robot pos_x={$robot.pos_x} alive={$robot.alive} />
		<Ball pos_x={$ball.pos_x} pos_y={$ball.pos_y} alive={$ball.alive} />
		<Player pos_x={$player.pos_x} alive={$player.alive} />
	</div>
</div>
