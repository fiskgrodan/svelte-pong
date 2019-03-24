import { writable } from 'svelte/store';

const initial = {
	pos_x: 40, 
	speed_x: 0,
	alive: true
};

function create_player_store() {
	const store = writable(Object.assign({}, initial));
	
	const update = (keystate, ball) => {
		store.update(player => {
			if (!player.alive) {
				return player;
			}
			
			const new_player = Object.assign({}, player);
			
			// Handle inputs
			if (keystate.a || keystate.ArrowLeft) {
				new_player.speed_x -= 0.1;
			}
			if (keystate.d || keystate.ArrowRight) {
				new_player.speed_x += 0.1;
			}
			
			// Handle maximum speed
			if (new_player.speed_x <= -2) {
				new_player.speed_x = -2
			}
			if (new_player.speed_x >= 2) {
				new_player.speed_x = 2
			}
			
			// Handle wall collisions
			const next_pos_x = new_player.pos_x + new_player.speed_x;
			if (next_pos_x <= 0) {
				new_player.pos_x = 0;
				new_player.speed_x = -1 * new_player.speed_x; // Wall bounce
			}
			if (next_pos_x >= 80) {
				new_player.pos_x = 80;
				new_player.speed_x = -1 * new_player.speed_x; // Wall bounce
			}
			
			// Set new position
			new_player.pos_x += new_player.speed_x;
			
			// Check if dead
			if (ball.pos_y > 91) {
				new_player.alive = false;
			}
			
			return Object.assign({}, new_player)
		})
	}
	
	const reset = () => store.set(Object.assign({}, initial));

	return {
		subscribe: store.subscribe,
		update,
		reset
	};
}

export const player = create_player_store();
