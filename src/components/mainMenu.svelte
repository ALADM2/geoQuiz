<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import FontFaceObserver from 'fontfaceobserver';
	import EarthLogo from '../svg/Earth.svelte';
	import Flag from '../svg/Flag.svelte';
	import Speech from '../svg/Speech.svelte'
	import City from '../svg/City.svelte'
	import Currency from '../svg/Currency.svelte'

	let isDisabled = false;
	let fontLoaded = false;

	onMount(() => {
		// Reset round and score every time user goes to main menu
		sessionStorage.setItem('score', 0);
		sessionStorage.setItem('round', 1);
		// Check if the font is loaded
		const font1 = new FontFaceObserver('Permanent Marker');
		const font2 = new FontFaceObserver('Rubik Doodle Shadow');
		font1.load().then(() => {
			font2.load().then(() => {
				fontLoaded = true;
			});
		});
	});

	async function delay(event) {
		event.preventDefault();
		const links = document.querySelectorAll(`a`);
		links.forEach((e) => {
			e.classList.add('disabled');
			isDisabled = true;
		});
		// Set a timeout for the desired delay (in milliseconds)
		const delayInMilliseconds = 500; // 500 milliseconds (1/2 second)
		setTimeout(function () {
			// Manually redirect after the delay
			window.location.href = event.target.href;
			isDisabled = false;
		}, delayInMilliseconds);
	}
</script>

<div class="menu">
	{#if fontLoaded}
		<h1 class="title">
			Geo
			<div class="logo">
				<EarthLogo />
			</div>
			Quiz
		</h1>
		<div class="games">
			<div class="column">
				<a on:click={delay} id="a" class:disabled={isDisabled} href="/guessFlag">Guess the Flag <div class="icon"><Flag/></div></a>
				<a on:click={delay} id="b" class:disabled={isDisabled} href="/guessLanguage"
					>Guess the Language<Speech class='icon'/></a
				>
			</div>
			<div class="column">
				<a on:click={delay} id="c" class:disabled={isDisabled} href="/guessCapital"
					>Guess the Capital <div><City/></div></a
				>
				<a on:click={delay} id="d" class:disabled={isDisabled} href="/guessCurrency"
					>Guess the Currency <div><Currency/></div></a
				>
			</div>
		</div>
		<div class="coffee">
			<h3>You can support me by buying me a coffee.</h3>
			<a href="https://www.buymeacoffee.com/aladm1">
				<img
					src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
					alt="Buy Me a Coffee"
				/>
			</a>
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
		display: flex;
		margin: 0;
		align-items: center;
		font-family: 'Permanent Marker';
		font-size: 5dvw;
		-webkit-text-stroke: 0.1px #dd4a48; /* For Safari and Chrome */
		text-stroke: 0.1px black; /* For other browsers (may not be supported) */
		color: #f5eedc; /* Set the text color */
		letter-spacing: 7px;
		text-align: center;
		text-shadow: 5px 5px 0px #ecb390;
		padding: 10px 0px;
		cursor: default;
	}
	.logo {
		margin: 0 10px;
	}
	.icon {
		/* margin-left: 20px; */
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
		justify-content: space-between;
		margin: 10px;
		padding: 35px 20px;
		height: -webkit-fill-available;
		width: 25dvw;
		min-height: 80px;
		cursor: pointer;
		border: none;
		border-radius: 15px;
		text-decoration: none;
		font-family: 'Rubik Doodle Shadow';
		font-size: 1.7dvw;
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
		box-shadow: inset 17em 0 0 0 #e2ca8e;
		font-size: 1.75dvw;
	}
	.column > a:focus {
		box-shadow: inset 0 0 0 0 #e2ca8e;
		background-color: #ba99f7;
		font-size: 2dvw;
	}

	.disabled {
		pointer-events: none; /* Disable pointer events */
		opacity: 0.6;
	}

	.coffee {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.coffee > h3 {
		color: #125737;
		font-family: 'Chakra Petch';
		font-style: oblique;
	}

	.coffee > a > img {
		width: 150px;
	}

	@media (max-width: 1024px) {
		.column > a {
			font-size: 2.3dvw;
			width: 90%;
		}
	}

	@media (max-width: 700px) {
		.menu {
			justify-content: space-around;
		}

		.title {
			font-size: 12dvw;
			text-shadow: 3px 3px 0px #ecb390;
			/* box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5); */
			-webkit-text-stroke: 0.5px #dd4a48; /* For Safari and Chrome */
		}

		.games {
			flex-wrap: wrap;
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

		.coffee {
			margin-bottom: 20px;
		}
	}
</style>
