import { writable } from 'svelte/store';

const initial = () => ({
	pos_x: 48,
	pos_y: 40,
	speed_x: (0.1 * (Math.random() > 0.5 ? 1 : -1)),
	speed_y: (0.1 * (Math.random() > 0.5 ? 1 : -1)),
	alive: true
});

function create_ball_store() {
	const store = writable(Object.assign({}, initial()));

	const update = (player, robot) => {
		store.update(ball => {
			if (!ball.alive) {
				return ball;
			}

			const new_ball = Object.assign({}, ball);
			const next_pos_y = new_ball.pos_y + new_ball.speed_y;
			const next_pos_x = new_ball.pos_x + new_ball.speed_x;

			// Kill ball if player or robot are dead
			if (!player.alive || !robot.alive) {
				new_ball.alive = false;
			}

			// Handle player collision
			if (next_pos_y >= 88) {
				if (((player.pos_x - 2) <= new_ball.pos_x) && ((player.pos_x + 20) >= new_ball.pos_x)) {
					new_ball.speed_y = -1 * (new_ball.speed_y + 0.05);
					if (player.speed_x !== 0) {
						new_ball.speed_x += Math.round((player.speed_x / 10) * 10) / 10;
					}
				}
			}

			// Handle robot collision
			if (next_pos_y <= 0) {
				if (((robot.pos_x) <= new_ball.pos_x) && ((robot.pos_x + 20) >= new_ball.pos_x)) {
					new_ball.speed_y = -1 * (new_ball.speed_y - 0.05);
					if (robot.speed_x !== 0) {
						new_ball.speed_x += Math.round((robot.speed_x / 10) * 10) / 10;
					}
				}
			}

			// Handle maximum speed
			if (new_ball.speed_x <= -Math.SQRT1_2) {
				new_ball.speed_x = -Math.SQRT1_2
			}
			if (new_ball.speed_x >= Math.SQRT1_2) {
				new_ball.speed_x = Math.SQRT1_2
			}

			if (new_ball.speed_y <= -Math.SQRT2) {
				new_ball.speed_y = -Math.SQRT2
			}
			if (new_ball.speed_y >= Math.SQRT2) {
				new_ball.speed_y = Math.SQRT2
			}

			// Handle wall collision
			if (next_pos_x <= 0) {
				new_ball.pos_x = 0;
				new_ball.speed_x = -1 * new_ball.speed_x; // Wall bounce
			}
			if (next_pos_x >= 98) {
				new_ball.pos_x = 98;
				new_ball.speed_x = -1 * new_ball.speed_x; // Wall bounce
			}

			// Set new position
			new_ball.pos_x = next_pos_x + new_ball.speed_x;
			new_ball.pos_y = next_pos_y + new_ball.speed_y;

			return Object.assign({}, new_ball);
		})
	}

	const reset = () => store.set(Object.assign({}, initial()));

	return {
		subscribe: store.subscribe,
		update,
		reset
	};
}

export const ball = create_ball_store();
