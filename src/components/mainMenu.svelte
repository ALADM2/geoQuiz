<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import FontFaceObserver from 'fontfaceobserver';

	let isDisabled = false;
	let fontLoaded = false;

	// onMount(() => {
	// 	const links = document.querySelectorAll('a');
	// 	links.forEach((e) => {
	// 		e.classList.remove('disable');
	// 		e.addEventListener('click', function (event) {
	// 			// Prevent the default behavior (immediate redirection)
	// 			event.preventDefault();
	// 			console.log('hello');
	// 			const otherLinks = document.querySelectorAll(`a:not(#${event.target.id})`);
	// 			otherLinks.forEach((e) => {
	// 				e.classList.add('disabled');
	// 			});
	// 			// Set a timeout for the desired delay (in milliseconds)
	// 			const delayInMilliseconds = 1000; // 1000 milliseconds (1 second)
	// 			setTimeout(function () {
	// 				// Manually redirect after the delay
	// 				window.location.href = event.target.href;
	// 			}, delayInMilliseconds);
	// 		});
	// 	});
	// });

	onMount(() => {
		// Check if the font is loaded
		const font1 = new FontFaceObserver('Permanent Marker');
		const font2 = new FontFaceObserver('Rubik Doodle Shadow');
		font1.load().then(() => {
			font2.load().then(() => {
				fontLoaded = true;
				const links = document.querySelectorAll('a');
				links.forEach((e) => {
					e.classList.remove('disabled');
				});
			});
		});
	});

	async function delay(event) {
		event.preventDefault();
		const otherLinks = document.querySelectorAll(`a`);
		otherLinks.forEach((e) => {
			e.classList.add('disabled');
		});
		// Set a timeout for the desired delay (in milliseconds)
		const delayInMilliseconds = 500; // 500 milliseconds (1/2 second)
		setTimeout(function () {
			// Manually redirect after the delay
			window.location.href = event.target.href;
		}, delayInMilliseconds);
	}
</script>

<div class="menu">
	{#if fontLoaded}
		<h1 class="title">Geo Quiz</h1>
		<div class="games">
			<div class="column">
				<a on:click={delay} id="a" class:disabled={isDisabled} href="/guessFlag">Guess the Flag</a>
				<a on:click={delay} id="b" class:disabled={isDisabled} href="/guessLanguage">Guess the Language</a>
			</div>
			<div class="column">
				<a on:click={delay} id="c" class:disabled={isDisabled} href="/guessCapital">Guess the Capital</a>
				<a on:click={delay} id="d" class:disabled={isDisabled} href="/guessCurrency">Guess the Currency</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.menu {
		height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #bdd2b6;
	}

	.title {
		font-family: 'Permanent Marker';
		font-size: 7dvw;
		-webkit-text-stroke: 0.1px #dd4a48; /* For Safari and Chrome */
		text-stroke: 0.1px black; /* For other browsers (may not be supported) */
		color: #f5eedc; /* Set the text color */
		letter-spacing: 7px;
		text-shadow: 5px 5px 0px #ecb390;
		padding: 20px 40px;
		box-shadow: 5px 5px 5px 3px rgba(0, 0, 0, 0.5);
		border-radius: 60px;
		background-color: #bccdb6;
		margin-bottom: 50px;
		cursor: default;
	}

	.games {
		display: flex;
		justify-content: space-between;
	}

	.column {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 10px;
	}

	.column > a {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px;
		padding: 50px 20px;
		height: -webkit-fill-available;
		width: 25dvw;
		min-height: 80px;
		cursor: pointer;
		border: none;
		border-radius: 15px;
		text-decoration: none;
		font-family: 'Rubik Doodle Shadow';
		font-size: 2dvw;
		white-space: nowrap;
		letter-spacing: 1.5px;
		font-weight: bold;
		color: #125737;
		background-color: #f5eedc;
		text-decoration: none;
		transition:
			box-shadow 0.3s ease,
			font-size 0.3s ease;
		background-color: 0.3s ease;
	}

	.column > a:hover {
		color: #2c4d3d;
		box-shadow: inset 15em 0 0 0 #e2ca8e;
		font-size: 2.1dvw;
	}
	.column > a:focus {
		box-shadow: inset 0 0 0 0 #e2ca8e;
		background-color: #ba99f7;
		font-size: 2.3dvw;
	}

	.disabled {
		pointer-events: none; /* Disable pointer events */
		opacity: 0.6;
	}

	@media (max-width: 900px) {
		.column > a {
			font-size: 2.3dvw;
		}
	}

	@media (max-width: 700px) {
		.menu {
			justify-content: space-around;
		}

		.title {
			font-size: 12dvw;
			text-shadow: 3px 3px 0px #ecb390;
			box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
			-webkit-text-stroke: 0.5px #dd4a48; /* For Safari and Chrome */
		}

		.games {
			flex-wrap: wrap;
			margin-bottom: 20px;
		}

		.column {
			padding-bottom: 0;
			padding-top: 0;
		}

		.column > a {
			min-height: 0;
			font-size: 5dvw;
			width: unset;
		}

		.column > a:hover,
		.column > a:focus {
			color: #2c4d3d;
			background-color: #e2ca8e;
			font-size: 5.1dvw;
		}
	}
</style>
