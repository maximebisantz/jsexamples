function sortableList(containerId){
	
	var container = document.getElementById(containerId);
	
	var _fixPageXY = function(e) {
		if (e.pageX == null && e.clientX != null ) {
			var html = document.documentElement
			var body = document.body
			
			e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
			e.pageX -= html.clientLeft || 0
			
			e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
			e.pageY -= html.clientTop || 0
		}
	}
	
	var _createHolderElement = function(baseElement){

		var elm = baseElement.cloneNode();

		elm.style.position = 'relative';
		elm.style.opacity = "0.5";
		elm.id = 'holder';
		elm.innerHTML = baseElement.innerHTML;
		
		baseElement.parentElement.insertBefore(elm, baseElement);
		
		return elm;
	}
	
	var _retrieveCoordinatesForAllBoxes = function(container){
		var allBoxes = container.getElementsByTagName('li');
		var coordinates = [];

		for(var i = 0; i < allBoxes.length ; i++){
			var rect = allBoxes[i].getBoundingClientRect();
			coordinates[i] = {
					'element': allBoxes[i],
					'top' 	 : rect.top,
					'left' 	 : rect.left,
					'height' : allBoxes[i].offsetHeight,
					'width'  : allBoxes[i].offsetWidth
			}
		}
		
		return coordinates;
	}

	var _windowMouseMove = function(e, dragBox, holder){
		var e = e || event;
		/**
		 * TODO : Replace the references and drop static selection for a more flexible one.
		 */
		var boxes = _retrieveCoordinatesForAllBoxes(dragBox.parentNode);
		
		_fixPageXY(e);
		
		// creating a mouseover for each box;
		for(var i = 0; i <= boxes.length -1; i++){
			var box = boxes[i];
			
				if(box.element == dragBox ||  box.element == holder)
				continue; 
				
			if(e.pageX >= box.left && e.pageX <= box.left + box.width
					&& e.pageY >= box.top && e.pageY <= box.top + 20){
				//HERE GOES THE CODE FOR MOUSE OVER EVENT.
				
				// Switch the Holder with the Box
				var posElm = null;
				var posHol = null;
				
				//defining if the holder is before or after the node
				for(var j=0; j <= boxes.length -1; j++){
					if(boxes[j].element == box.element)
						posElm = j
					if(boxes[j].element == holder)
						posHol = j;
				}
				
				// Conditional statement to correct insertBefore glitch and moving the holder box
				if(posElm < posHol){
					holder.parentNode.insertBefore(holder, box.element);
				}else{
					if(boxes[i+1]){
							holder.parentNode.insertBefore(holder, boxes[i+1].element);
					}else{
						holder.parentNode.appendChild(holder);
					}
				}
					
			}
		}
		
	}	
	
	var constructor = function(){
		
		var allBoxes = container.getElementsByTagName('li');
		var box;
		
		for(var i=0; i <= allBoxes.length - 1; i++){
			box = allBoxes[i];
			
			box.addEventListener('mousedown', function(e){
				// ensure the scope
				var self = this;
				var rect = self.getBoundingClientRect();
				var boxLeft = e.pageX - rect.left;
				var boxTop = e.pageY - rect.top;
				var holder;

				// Fixing mouse positioning
				_fixPageXY(e);

				// Bring the styles for the drag event
				this.style.position = 'absolute';
				this.style.zIndex = '1000';
				this.style.cursor = 'move';
				
				// Making a holder block from the clone of the element
				holder = _createHolderElement(this);


				// Global Mouse Move Event
				var windowOnMouseMove = function (e){
					_windowMouseMove(e, self, holder);
				}
				window.addEventListener('mousemove', windowOnMouseMove);
				
				
				this.style.left =  e.pageX - boxLeft + 'px';
				this.style.top = e.pageY - boxTop + 'px';

				// Drag event
				var onmousemove =  function(e){
					e = e || event;
					_fixPageXY(e);
					
					self.style.left = e.pageX - boxLeft + 'px';
					self.style.top = e.pageY - boxTop + 'px';
				}
				
				// Start the draging function
				document.addEventListener('mousemove', onmousemove);
				
				// End of the drag event
				document.addEventListener('mouseup', function(){
					
					
				document.removeEventListener('mousemove', onmousemove);
				window.removeEventListener('mousemove', windowOnMouseMove);

				// put back the box in its original place
				self.style.left = 0;
				self.style.top = 0;
				self.style.cursor = 'default';

				self.style.position = 'relative';
				
				// Replace the placeholder with the box
				if(holder.parentNode){
					holder.parentNode.replaceChild(self, holder);
				}
				
					
					
				})
				
			})
			
		}
	}
	
	constructor();
	
	
	
	
	
}