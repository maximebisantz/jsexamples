<?php

require 'php/gameofpairs.php';

$path = 'img/';
$game = new GameOfPairs($path);

$numberOfPairs = 4;
if(isset($_GET['pairs'])){
    $numberOfPairs = $_GET['pairs'];
    $game->setNumberOfPairs($numberOfPairs);
}

if($game->getNumberOfPairs() > 4){
    $width = 100;
    $height = 150;
}else{
    $width = 200;
    $height = 300;
}

?>
<!Doctype html>
<html>
	<head>
		<title>Game Of Pairs</title>
		<meta charset="UTF-8"/>
		<meta name="description" content="A game of pairs that is build upon javascript and php"/>
		<meta name="viewport" content="width=device-width, intial-scale=1" />
		<link rel="stylesheet" href="css/reset.css" />
		<link rel="stylesheet" href="css/gameofpairs.css" />
		<script type="text/javascript" src="js/gameofpairs.js"></script>
	</head>
	<body>
		<main>
			<a href="view-source.php">View Source</a>
			<div id="settings">
				<label for="selectNumberOfPairs">Choose the number of pairs : </label>
				<select id="selectNumberOfPairs">
					<?php for($i = 4; $i <= 8; $i++) :?>
					<option value="<?php echo $i?>" <?php if($i == $numberOfPairs){echo 'selected="selected"';};?>><?php echo $i?></option>
					<?php endfor;?>
				</select>
				<span>Number of moves: <span id="numberOfMoves">0</span></span>
				<span>Score : <span id="score">0</span></span>
				<span><button id="resetScore">Reset Score</button></span>
			</div>
    		<div id="game">
    		<?php foreach ($game->buildGame() as $card) : ?>
    			<div class="card"><img src="<?php echo $path . $card; ?>" alt="Click to flip the card" width="<?php echo $width?>" height="<?php echo $height;?>" /></div>
    		<?php  endforeach; ?>
    		</div>
		</main>
	</body>
</html>