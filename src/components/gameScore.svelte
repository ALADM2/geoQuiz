<script>
	// @ts-nocheck
	export let score = 0;
	export let onChangeRound;
	export let onChangeScore;
	let round = 1;

	function handleClick() {
		score = 0;
		onChangeScore(score);
		onChangeRound(round);
	}
</script>

<div class="scorePanel">
	<div>
		<h1>Final Score</h1>
		{#if score === 100}
			<div class="perfectScore">
				<span>&#127881;</span>
				<h1>{score}/100</h1>
				<span>&#127881;</span>
			</div>
		{:else}
			<h1>{score}/100</h1>
		{/if}
	</div>
	<button on:click={handleClick}>Play Again!</button>
</div>

<style>
	h1 {
		margin: 0;
		letter-spacing: 3px;
	}

	.scorePanel {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 50px;
	}

	.scorePanel > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.scorePanel > button {
		padding: 20px;
		font-size: larger;
		border-radius: 10px;
		cursor: pointer;
		font-family: 'Chakra Petch';
		font-weight: bold;
		font-size: 1.3dvw;
		letter-spacing: 3px;
		background: #bdd2b6;
		border: none;
		box-shadow: 4px 4px 0px #798777;
	}
	.scorePanel > button:hover {
		background-color: #a2b29f;
		color: white;
	}
	.scorePanel > button:active {
		box-shadow: 0 0 0;
		transform: translateY(4px);
	}

	.perfectScore {
		display: flex;
		align-items: baseline;
		gap: 30px;
	}
    .perfectScore>span{
        font-size: 80px;
    }

	@media (max-width: 900px) {
		.scorePanel > button {
			font-size: 5dvw;
		}
        .perfectScore>span{
            font-size: 50px;
        }
	}
</style>
