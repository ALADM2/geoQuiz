<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	export let restart;
	export let seconds;
	export let isClicked;
	export let onChangeTimer;
	let style;
	let interval;

	function countDown() {
		interval = setInterval(() => {
			restart = false; // Reset restart to avoid infinite loop
            if(isClicked){
                clearInterval(interval);
                isClicked = false;
                return
            }
			seconds -= 1;
			onChangeTimer(seconds);

			if (seconds === 0) {
				clearInterval(interval);
			}
		}, 1000);
	}

	$: {
		if (restart) {
			// Reset the timer to 5 when restart changes
			seconds = 5;
			countDown();
		}
	}

	// Timer red color when value 0
	$: {
		style = seconds === 0 ? 'color: red' : 'color: black'
	}
		
	onMount(() => {
		if(!restart){
			countDown();
		}
	});
</script>

<div class="timer">
	<h2 style={style}>{seconds}</h2>
</div>

<style>
	.timer>h2{
		font-size: 3dvw;
		margin: 0;
		margin-top: 30px;
	}

	@media (max-width: 900px) {
		.timer>h2{
			font-size: 10dvw;
			margin-top: 0;
			margin-bottom: 20px;
		}
	}
</style>
