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

	const capitalsNum = 4;
	let screenWidth;
	let data;
	let countryToGuess;
	let countryLength; //Take country length to change size depending on length
	let rightCapital;
	let newGame = false;
	let capitals = [];
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

	const findNewData = async () => {
		//Fetch data
		const response = await fetch('https://restcountries.com/v3.1/all');
		data = await response.json();
		capitals = []; //Empty array in every iteration
		restart = false; //Set to false when new question
		isClicked = false;
		seconds = 5; //Reset seconds to 5
		let random = sessionStorage.getItem('random') || Math.floor(Math.random() * data.length); //Generate random country number;
		sessionStorage.setItem('random', random);

        async function generateRandom() {
            while (randomNums.includes(random) || !data[random].capital) {
                random = Math.floor(Math.random() * data.length); //Generate random country number
                sessionStorage.setItem('random', random);
            }
        }

        try{
            await generateRandom();
        } catch (error){
            console.error(`Error caught: ${error.message}, getting new data`);
            await generateRandom();
        }

		randomNums = [...randomNums, random];
		countryToGuess = data[random].name.common; //Get random country
		countryLength = countryToGuess.length; //Take country length to change size depending on length
		rightCapital = data[random].capital[0]; //Capital selected country name
		capitals = sessionStorage.getItem('capitals')
			? sessionStorage.getItem('capitals').split(',')
			: [...capitals, rightCapital]; //Push random capital name to array

		//Get random countries for answers
		if (capitals.length < 4) {
			for (let i = 0; i < capitalsNum - 1; i++) {
				let newCapital;

				do {
					random = Math.floor(Math.random() * data.length); //Generate random country number
					newCapital = data[random].capital ? data[random].capital[0] : null;
				} while (capitals.includes(newCapital) || !newCapital);

				capitals = [...capitals, newCapital]; //Push random country name to array
			}
			sessionStorage.setItem('capitals', capitals);
		}

		shuffleArray(capitals); //Shuffle possible answers
	};

	//Fetch data on component mount
	onMount(async () => {
		score = sessionStorage.getItem('score') || score; //Use stored score to keep it on refresh
		round = sessionStorage.getItem('round') || round; //Use stored round to keep it on refresh
		sessionStorage.removeItem('capitals'); //Remove list of capitals on mount
		screenWidth = window.innerWidth;
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
		findNewData();
	});

	async function passRound() {
		round++;
		restart = true; //Activate restart timer in timer component after
		sessionStorage.setItem('round', round); //Store round in case of refresh
		sessionStorage.removeItem('random');
		sessionStorage.removeItem('capitals');
		enableButtons();
		selected = null; //Deselect button
		if (round <= 10) {
			findNewData(); //Get new Capital
		}
	}

	$: {
		// When times runs out
		if (seconds === 0) {
			async function activateWrongAnswer() {
				disableButtons();
				await wrongAnswer(rightCapital, selected);
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
		if (selected.textContent === rightCapital) {
			score = await rightAnswer(selected, score);

			// If selection is incorrect
		} else {
			await wrongAnswer(rightCapital, selected);
		}
		await passRound(); // Next round
	}
</script>

<div class="main">
	{#if isReady}
		<div class="guessCapital">
			{#if round <= 10}
				<!-- 10 rounds -->
				<div class="data">
					<h2>Round&nbsp;&nbsp;{round}/10</h2>
					<h2>Score: {score}</h2>
				</div>
				{#if screenWidth > 900}
					<h1 class="country" style={countryLength >= 17 ? "font-size:2.3dvw" : "font-size:3dvw" }>{countryToGuess}</h1>
				{:else}
					<h1 class="country" style={countryLength >= 17 ? "font-size:8dvw" : "font-size:10dvw" }>{countryToGuess}</h1>
				{/if}
				<div class="options">
					<Timer {restart} {seconds} {isClicked} onChangeTimer={(v) => (seconds = v)} />
					<ul class="capitalList">
						{#each capitals as capital, index}
							<button
								value={capital}
								class="element"
								on:click={() => handleClick(index)}
								class:correct={isCorrect}
								class:incorrect={isIncorrect}
								class:disabled={isDisabled}>{capital}</button
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

	.guessCapital {
		background-color: #f8ede3;
		padding: 50px;
		border-radius: 10px;
		box-shadow: 6px 6px 10px rgb(0 0 0 / 0.4);
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 30dvw;
        max-width: 60dvh;
        max-height: 98dvh;
	}

	.guessCapital > h1 {
		font-family: 'Permanent Marker';
		font-size: 3dvw;
		-webkit-text-stroke: 0.1px #000000; /* For Safari and Chrome */
		text-stroke: 0.1px black; /* For other browsers (may not be supported) */
		color: #ffffff; /* Set the text color */
		letter-spacing: 3px;
		text-shadow: 2px 2px 0px #ecb390;
		border: 2px solid black;
		border-radius: 30px;
		padding: 20px 40px;
		box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.5);
		border-radius: 60px;
		background-color: #bccdb6;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 95dvw;
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

	.capitalList {
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
		.guessCapital {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
            max-width: none;
            max-height: none;
		}
		.guessCapital > h1 {
			-webkit-text-stroke: 1px #000000; /* For Safari and Chrome */
		}
		.options {
			margin-bottom: 30px;
		}
		.element {
			height: 7dvh;
			display: flex;
			align-items: center;
		}
		.element{
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
