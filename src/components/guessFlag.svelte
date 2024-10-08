<script>
	// @ts-nocheck

	import GameScore from './gameScore.svelte';
	import Timer from './timer.svelte';
	import { onMount } from 'svelte';
	import { Circle3 } from 'svelte-loading-spinners';

	import {
		rightAnswer,
		wrongAnswer,
		enableButtons,
		disableButtons,
		shuffleArray
	} from '$lib/gameFunctions';

	const countriesNum = 4;
	let data;
	let flag;
	let rightCountry;
	let newGame = false;
	let countries = [];
	let randomNums = []; //To check for duplicates
	let selected = null;
	let isCorrect = false;
	let isIncorrect = false;
	let isDisabled = false;
	let round = 1; //Start in first round
	let score = 0;
	let isReady = false;
	let restart = false; //Exported from timer
	let seconds = 5; //Exported from timer
	let isClicked = false;
	let isImageLoaded = false; // New variable to track image load

	const findNewData = async () => {
		//Fetch data
		const response = await fetch('https://restcountries.com/v3.1/all');
		data = await response.json();
		countries = []; //Empty array in every iteration
		restart = false; //Set to false when new question
		isClicked = false;
		seconds = 5; //Reset seconds to 5
		let random = sessionStorage.getItem('random') || Math.floor(Math.random() * data.length); //Generate random country number;
		sessionStorage.setItem('random', random);

		while (randomNums.includes(random)) {
			random = Math.floor(Math.random() * data.length); //Generate random country number
			sessionStorage.setItem('random', random);
		}

		randomNums = [...randomNums, random];
		flag = data[random].flags.png; //Get random flag
		rightCountry = data[random].name.common; //Flag selected country name
		countries = sessionStorage.getItem('countries')
			? sessionStorage.getItem('countries').split(',')
			: [...countries, rightCountry]; //Push random country name to array

		//Get random countries for answers
		if (countries.length < 4) {
			for (let i = 0; i < countriesNum - 1; i++) {
				let newCountry;

				do {
					random = Math.floor(Math.random() * data.length); //Generate random country number
					newCountry = data[random].name.common;
				} while (countries.includes(newCountry));

				countries = [...countries, newCountry]; //Push random country name to array
			}
			sessionStorage.setItem('countries', countries);
		}

		shuffleArray(countries); //Shuffle possible answers
	};

	//Fetch data on component mount
	onMount(async () => {
		score = sessionStorage.getItem('score') || score; //Use stored score to keep it on refresh
		round = sessionStorage.getItem('round') || round; //Use stored round to keep it on refresh
		sessionStorage.removeItem('countries'); //Remove list of countries on mount
		const prepare = async () => {
			try {
				// Artificially delay for 2 seconds to simulate a slow loading
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (err) {
				console.log(err);
			} finally {
				isReady = true;
			}
		};
		prepare();
		await findNewData(
			data,
			countries,
			restart,
			isClicked,
			randomNums,
			flag,
			rightCountry,
			countriesNum
		);
	});

	async function passRound() {
		round++;
		restart = true; //Activate restart timer in timer component after
		sessionStorage.setItem('round', round); //Store round in case of refresh
		sessionStorage.removeItem('random');
		sessionStorage.removeItem('countries');
		enableButtons();
		selected = null; //Deselect button
		if (round <= 10) {
			findNewData(); //Get new flag
		}
	}

	function onImageLoad() {
		isImageLoaded = true; // Set to true when the image is fully loaded
	}

	$: {
		// When times runs out
		if (seconds === 0) {
			async function activateWrongAnswer() {
				disableButtons();
				await wrongAnswer(rightCountry, selected);
				await passRound();
			}
			activateWrongAnswer();
		}
	}

	$: {
		//If newGame
		if (newGame) {
			newGame = false;
			findNewData();
		}
	}

	// Handle answer selection
	async function handleClick(index) {
		isClicked = true;
		selected = document.querySelector(`.element:nth-child(${index + 1})`); //Get selected html element
		disableButtons(); //Dissable buttons

		// If selection is correct
		if (selected.textContent === rightCountry) {
			score = await rightAnswer(selected, score);

			// If selection is incorrect
		} else {
			await wrongAnswer(rightCountry, selected);
		}
		await passRound(); // Next round
	}
</script>

<div class="main">
	{#if isReady}
		<div class="guessFlag">
			{#if round <= 10}
				<!-- 10 rounds -->
				<div class="data">
					<h2>Round&nbsp;&nbsp;{round}/10</h2>
					<h2>Score: {score}</h2>
				</div>
				<img src={flag} alt="" on:load={onImageLoad} />
				<div class="options">
					{#if isImageLoaded}
						<Timer {restart} {seconds} {isClicked} onChangeTimer={(v) => (seconds = v)} />
					{/if}
					<ul class="countryList">
						{#each countries as country, index}
							<button
								value={country}
								class="element"
								on:click={() => handleClick(index)}
								class:correct={isCorrect}
								class:incorrect={isIncorrect}
								class:disabled={isDisabled}>{country}</button
							>
						{/each}
					</ul>
				</div>
			{:else}
				<GameScore
					{score}
					onNewGame={(v) => (newGame = v)}
					onChangeRound={(v) => (round = v)}
					onChangeScore={(v) => (score = v)}
				/>
			{/if}
		</div>
	{:else}
		<Circle3 size="100" unit="px" duration="1.5s" />
	{/if}
</div>

<style>
	.main {
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #bdd2b6;
	}

	.guessFlag {
		background-color: #f8ede3;
		padding: 50px;
		border-radius: 10px;
		box-shadow: 6px 6px 10px rgb(0 0 0 / 0.4);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.guessFlag > img {
		border-radius: 3px;
		max-height: 30%;
	}

	.options {
		width: -webkit-fill-available;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.data {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.countryList {
		list-style: none;
		padding: 0;
		margin: 0;
		width: inherit;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.element {
		width: 100%;
		border: none;
		display: flex;
		padding: 10px;
		background-color: white;
		margin-top: 15px;
		border-radius: 5px;
		box-shadow: 3px 3px 0px #798777;
		cursor: pointer;
		text-align: left;
		font-family: 'Chakra Petch';
		font-weight: bold;
		font-size: 1.3dvw;
	}
	.element:hover {
		background-color: #a2b29f;
		color: white;
	}
	.element:active {
		box-shadow: 0 0 0;
		transform: translateY(4px);
	}

	.correct {
		background-color: rgb(132, 255, 132);
		color: white;
	}
	.correct:hover {
		background-color: rgb(132, 255, 132);
		color: white;
	}

	.incorrect {
		background-color: rgb(255, 128, 128);
		color: white;
	}
	.incorrect:hover {
		background-color: rgb(255, 128, 128);
		color: white;
	}

	.disabled {
		pointer-events: none; /* Disable pointer events */
		opacity: 0.6;
	}

	@media (max-width: 900px) {
		.guessFlag {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}
		.options {
			margin-bottom: 30px;
		}
		.element {
			height: 7dvh;
			display: flex;
			align-items: center;
			font-size: 5dvw;
		}
		.element:hover {
			background-color: white;
			color: black;
		}
		.correct:hover {
			background-color: rgb(132, 255, 132);
			color: white;
		}
		.incorrect:hover {
			background-color: rgb(255, 128, 128);
			color: white;
		}
	}
</style>
