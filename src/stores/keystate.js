import { writable } from 'svelte/store';

function create_keystate_store() {
	const store = writable({
		a: false,
		d: false,
		ArrowLeft: false,
		ArrowRight: false,
	});

	const set_key = (event, value) => {
		store.update(keystate => {
			if (keystate.hasOwnProperty(event.key)) {
				event.preventDefault();
			}
			if (!keystate.hasOwnProperty(event.key) || keystate[event.key] === value) {
				return keystate;
			}
			return Object.assign({}, keystate, { [event.key]: value });
		});
	};

	const keydown = event => set_key(event, true);

	const keyup = event => set_key(event, false);

	return {
		subscribe: store.subscribe,
		keydown,
		keyup
	};
}

export const keystate = create_keystate_store();
