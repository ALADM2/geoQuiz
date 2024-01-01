<div class="menu">
	<h1 class="title">Geo Quiz</h1>
	<div class="games">
		<div class="column">
			<a href="/guessFlag">Guess the Flag</a>
			<a href="">Guess the Languaje</a>
		</div>
		<div class="column">
			<a href="">Guess the Capital</a>
			<a href="">Guess the Currency</a>
		</div>
	</div>
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
		transition: box-shadow 0.3s ease;
	}

	.column > a:hover,
	.column > a:focus {
		color: #2c4d3d;
		box-shadow: inset 13em 0 0 0 #e2ca8e;
		text-decoration: underline;
		text-underline-offset: 20px;
		text-decoration-thickness: 0.2dvw;
	}

	@media (max-width: 900px) {
		.column > a {
			font-size: 3dvw;
		}
	}

	@media (max-width: 700px) {
        .menu{
            justify-content: space-around;
        }

		.title {
			font-size: 12dvw;
            text-shadow: 3px 3px 0px #ecb390;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
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
		}

		.column > a:hover,
		.column > a:focus {
			color: #2c4d3d;
			background-color: #e2ca8e;
		}
	}
</style>
