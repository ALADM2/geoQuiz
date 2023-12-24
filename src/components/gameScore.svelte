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
        <h1>{score}/100</h1>
    </div>
	<button on:click={handleClick}>Play Again!</button>
</div>

<style>
    h1{
        margin: 0;
    }

    .scorePanel{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
    }

    .scorePanel>div{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .scorePanel>button{
        padding: 20px;
        font-size: larger;
        border-radius: 10px;
        cursor: pointer;
    }
</style>