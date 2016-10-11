/****************************
 * 		GAME OF PAIRS 		*
 ****************************/

class GameOfPairs {

	
	constructor(){
		
		this.selected;
		this.images = new Array;
		this.moves = 0;
		this.score;
		
		this.images = this.getAllImages();
		this.hideAllImages();
		this.setActionToImages();
		this.progress = this.images.length;
		
		this.getScore();
	}
	
	getAllImages(){
		var container = document.getElementById('game');
		var images = container.getElementsByTagName('img');
		return images;
	}
	
	hideAllImages(){
		for(var i=0; i < this.images.length; i++){
			this.hideImage(this.images[i]);
		}
	}
	
	hideImage(img){
		/**
		 * Save the original src into the element
		 */
		img.setAttribute('originalsource', img.src);
		img.src="img/holder.jpg";
	}
	
	showImage(img){
		var image = img;
		image.src = image.getAttribute('originalsource');
	}
	
	/**
	 * For each image set the action "oneTurn"
	 * which is the core functionality
	 */
	setActionToImages(){
		for(var i = 0; i < this.images.length; i++){
			this.images[i].addEventListener('click', this.setAction(i), true);
		}
	}
	
	setAction(imgNumber){
		var _this = this;
		return function(){
			_this.oneTurn(imgNumber);
		}
	}
	
	/**
	 * Check if the sources are equal 
	 * then return result
	 */
	checkPair(secondImage){
		if(this.selected.src == secondImage.src){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * When the two selected image are not
	 * the same, bring a layer on top of 
	 * everything to prevent user to click 
	 * on a new image. (cancelling event)
	 */
	setHoldingLayer(){
		var layer = document.createElement('div');
		var main = document.getElementsByTagName('main')[0];
		var styles = {
				position : 'absolute',
				height : '100%',
				width : '100%',
				zIndex : '1000',
				background : 'black',
				opacity : '0.2'
		};
		
		for(var style in styles){
			layer.style[style] = styles[style];
		}
		
		document.body.insertBefore(layer, main);
		
		return this.layer = layer;
		
	}
	
	removeHoldingLayer(layer){
		layer.parentNode.removeChild(layer);
	}
	
	/**
	 * To remove the event listener, clone
	 * the image and replace it in the document
	 */
	cloneImage(img){
		var clone = img.cloneNode();
		img.parentNode.replaceChild(clone, img);
	}
	
	/**
	 * Main functionality of the game when
	 * a card is turned over.
	 */
	oneTurn(imgNumber){
		var img = this.images[imgNumber];
		var _this = this;
		/**
		 * Add 1 to counted moves and display it
		 */
		this.countMoves();
		/**
		 * First turn a card and save it as selected
		 */
		if(!this.selected){
			this.showImage(img);
			this.selected = img;
		}else{

			this.showImage(img);
			
			/**
			 * Check the second card and determine if 
			 * they are a pair or not.
			 */
			
			if(!this.checkPair(img)){
				/**
				 * Bring the holding div to avoid any clicks 
				 * while the pair is displayed
				 */
				var layer = this.setHoldingLayer();

				/**
				 * If they aren't a pair then hide them back
				 * after 5 seconds of showing.
				 */
				
				window.setTimeout(function(){
					// Hide Images
					_this.hideImage(_this.selected);
					_this.hideImage(img);
					
					_this.selected = false;
					
					_this.removeHoldingLayer(layer);
					
				}, 1500)
				
			}else{
				/**
				 * Clone the nodes to remove the event listeners
				 */
				this.cloneImage(img);
				this.cloneImage(this.selected)
				
				// Release the selected image
				this.selected = false;
				
				/**
				 * Substact the pair of the score
				 * and check if the game is won
				 */
				if(this.setProgress()){
					/**
					 * The game is won
					 */
					this.gameWon();
					this.setScore();
				}
					
			}			
		}
	}
	
	setNumberOfPairs(numberOfPairs){
		/*
		 * Pass the argument into GET 
		 * to change the number of pairs 
		 * through php
		 */
		location.assign(location.pathname + '?pairs=' + numberOfPairs);
	}
	
	/**
	 * Progress is substracting the number
	 * of images just paired (2) to the 
	 * total number of image.
	 * If all the images are paired then the
	 * wining condition is met and return true.
	 */
	setProgress(){
		this.progress -= 2;
		if(this.progress > 0){
			return false;
		}else{
			return true;
		}
	}
	
	countMoves(){
		this.moves += 1;
		document.getElementById('numberOfMoves').innerHTML = this.moves;
	}
	/**
	 * Bring a glory box and let
	 * the user decide if she wants 
	 * to play another game.
	 */
	gameWon(){
		var glorybox = document.createElement('div');
		var newGame = document.createElement('button');
		var cancel = document.createElement('button');
		
		newGame.innerHTML = 'New Game?';
		newGame.addEventListener('click', function(){
			location.reload();
		})
		
		cancel.innerHTML = "That's it for now";
		cancel.addEventListener('click', function(){
			glorybox.parentNode.removeChild(glorybox);
		})
		
		glorybox.innerHTML = 'You have won the game! Play again? <br/>Your score is : ' + this.calculateScore();
		glorybox.setAttribute('class', 'glorybox');

		glorybox.appendChild(newGame);
		glorybox.appendChild(cancel);
		
		document.body.appendChild(glorybox);
	
	}
	
	calculateScore(){
		var score = this.score + Math.round((this.images.length / this.moves ) * 100);
		return score;
	}
	
	setScore(){
		var score = this.calculateScore();
		document.cookie = 'score=' + score + ';';
	}
	
	getScore(){
		var cookieArray = document.cookie.split(';');
		var name = "score=";
		for(var i=0; i < cookieArray.length; i++){
			var cookie = cookieArray[i];
			if(cookie.indexOf(name) == 0){
				var score = cookie.substring(name.length, cookie.length);
				document.getElementById('score').innerHTML = score;
				this.score = Number(score);
			}else{
				this.score = 0;
			}
		}
	}
	
	resetScore(){
		var d = new Date();
		d.setTime(0);
		document.cookie = 'score=0;' + 'expires=' + d.toUTCString();
		document.location.reload();
	}
	
	
}

window.addEventListener('load', function(){
	var game = new GameOfPairs();
	
	// Set the different functionalities that need to be attached to the UI.
	var selectPairs = document.getElementById('selectNumberOfPairs');
	selectPairs.addEventListener('change', function(){
		game.setNumberOfPairs(this.value);
	});
	
	var resetScore = document.getElementById('resetScore');
	resetScore.addEventListener('click', function(){
		game.resetScore();
	});
	
})




