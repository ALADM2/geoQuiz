<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	export let restart;
	export let seconds;
	let interval;

	$: {
		if (restart) {
			// Reset the timer to 5 when restart changes
			seconds = 5;
			interval = setInterval(() => {
                restart = false; // Reset restart to avoid infinite loop
				seconds -= 1;

				if (seconds === 0) {
					clearInterval(interval);
				}
			}, 1000);
		}
	}

	onMount(() => {
		interval = setInterval(() => {
			seconds -= 1;

			if (seconds === 0) {
				clearInterval(interval);
				// Add any additional actions to perform when the countdown reaches zero
			}
		}, 1000);

		return () => {
			clearInterval(interval); // Cleanup the interval when the component is destroyed
		};
	});
</script>

<div class="timer">
	<h2>{seconds}</h2>
</div>
