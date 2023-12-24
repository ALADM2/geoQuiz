<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import GameScore from './gameScore.svelte';

	const countriesNum = 4;
	let data;
	let flag;
	let rightCountry;
	let countries = [];
	let selected;
	let isCorrect = false;
	let isIncorrect = false;
	let round = 1; //Start in first round
	let score = 0;

	const findNewData = async () => {
		//Fetch data
		const response = await fetch('https://restcountries.com/v3.1/all');
		data = await response.json();

		let random = Math.floor(Math.random() * data.length); //Generate random country number
		flag = data[random].flags.png; //Get random flag
		rightCountry = data[random].name.common; //Flag selected country name
		countries = []; //Empty array in every iteration
		countries = [...countries, rightCountry]; //Push random country name to array

		//Get random countries
		for (let i = 0; i < countriesNum - 1; i++) {
			let newCountry;
			do {
				random = Math.floor(Math.random() * data.length); //Generate random country number
				newCountry = data[random].name.common;
				console.log(countries);
				console.log(newCountry)
			} while (countries.includes(newCountry));
			
			countries = [...countries, newCountry]; //Push random country name to array
		}

		//Shuffle array countries
		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
		shuffleArray(countries);
	};

	//Fetch data on component mount
	onMount(async () => {
		findNewData();
	});

	async function handleClick(index) {
		selected = document.querySelector(`.element:nth-child(${index + 1})`); //Get selected html element
		const list = document.querySelectorAll('.element'); //Get all list elements

		//Find correct html element
		let rightListElement;
		list.forEach((element) => {
			if (element.textContent.includes(rightCountry)) {
				rightListElement = element;
				return;
			}
		});

		// If selection is correct
		if (selected.textContent === rightCountry) {
			selected.classList.add('correct');
			score = score + 10; //10 points for each correct answer
			await new Promise((resolve) => setTimeout(resolve, 2000));
			selected.classList.remove('correct');
			round++;
			findNewData(); //Get new flag

			// If selection is incorrect
		} else {
			selected.classList.add('incorrect');
			rightListElement.classList.add('correct');
			await new Promise((resolve) => setTimeout(resolve, 2000));
			selected.classList.remove('incorrect');
			rightListElement.classList.remove('correct');
			round++;
			findNewData(); //Get new flag
		}
	}
</script>

<div class="main">
	<div class="guessFlag">
		{#if round <= 10} <!-- 10 rounds -->
			<img src={flag} alt="" />
			<div class="options">
                <div class="data">
                    <h2>Round {round}/10</h2>
                    <h2>Score: {score}</h2>
                </div>
				<ul class="countryList">
					{#each countries as country, index}
						<button
							value={country}
							class="element"
							on:click={() => handleClick(index)}
							class:correct={isCorrect}
							class:incorrect={isIncorrect}>{country}</button
						>
					{/each}
				</ul>
			</div>
		{:else}
			<GameScore {score} onChangeRound={(v) => (round = v)} onChangeScore={(v) => (score = v)} />
		{/if}
	</div>
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
	}

    .guessFlag>img{
        border-radius: 3px;
    }

    .options{
        width: -webkit-fill-available;
    }

    .data{
        display: flex;
        justify-content: space-between;
        margin: 0px 20px;
    }

	.countryList {
		list-style: none;
		padding: 0;
		margin: 0;
		margin-top: 30px;
	}

	.element {
		width: 100%;
		border: none;
		display: flex;
		padding: 10px;
		background-color: white;
		margin-top: 15px;
		border-radius: 5px;
		box-shadow: 3px 3px 0px #a2b29f;
		cursor: pointer;
        text-align: left;
	}
	.element:hover {
		background-color: #798777;
		color: white;
	}
	.element:active {
		box-shadow: 0 0 0;
		transform: translateY(4px)
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

    @media (max-width: 900px){
        .guessFlag{
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }

        .element{
            height: 7dvh;
            display: flex;
            align-items: center;
            font-size: 5dvw;
        }
    }
</style>
