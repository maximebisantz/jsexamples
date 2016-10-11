class sortableListAjax {
	
	
	constructor(){
		this.url = "php/ajax.php";
	}
	
	loadData(url, callback){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				callback(this);
			}
		}
		xhttp.open("GET", url, true);
		xhttp.send();
	}
	
	sendData(url, post, callback){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				callback(this);
			} 
		}
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(post);
	}

	getList(id){
		var url = this.url + "?action=list&id=" + id;
		var _this = this;
		
		this.loadData(url, function(response){

			var list = JSON.parse(response.response);
			var _list = [];
			var htmlList = document.createElement('ul');
			htmlList.id = "list" + id;
			
			// Sorting the JSON response to be order by position.
			for(var key in list){
				var value = list[key];
				_list[list[key].id] = list[key];
			}
			
			// Custom sort to sort by position
			// http://www.levihackwith.com/code-snippet-how-to-sort-an-array-of-json-objects-by-property/
			_list.sort(function(a,b){
				var sortStatus = 0;
				
				if(a.position < b.position){
					sortStatus = -1;
				}else if(a.position > b.position){
					sortStatus = 1;
				}
				
				return sortStatus;
			});
			
			list = _list;
			
			console.log(list);
			
			
			for(var item in list){
				
				// Create list item
				var li = document.createElement('li');
				li.innerHTML = list[item].content;
				li.id=list[item].id;
				
				// define the position attributes
				li.position = list[item].position; 
				htmlList.appendChild(li);
				
				// Add mouseup listener.
				
				var listmousedown = function(){
					var _object = this;
					
					var listmouseup = function(e){
						
						var list = e.target.parentNode.getElementsByTagName('li');
						
						// Run through the items and write their position in the list.
						var position = 0;
						for(var i=0; i < list.length; i++){
							// Do not take into account the item selected.
							if(list[i] == _object)
								continue;
							
							list[i].position = position + 1 ;
							
							// The holder is in the right place (where the item has been moved)
							// So the function will send the item selected into the setList function.
							if(list[i].id == 'holder'){
								_object.position = position + 1;
								_this.setList(_object);
							}
							position++;
						}
						
						
						
						//console.log(_this.position);
						document.removeEventListener('mouseup', listmouseup)
						
					}

					document.addEventListener('mouseup', listmouseup);
				}
				
				li.addEventListener('mousedown', listmousedown);
				
			}
			
			//!!!! Change to allow the list to be placed anywhere.
			document.body.appendChild(htmlList);
			
			sortableList(htmlList.id);
			
						
		})
		
		
	}
	
	/**
	 * TODO: Need to implement listId parameter.
	 */
	setList(object){
		console.log(object +  ' : '  + object.position);
		/**
		 * JSON : {"id" : 1, "position" : 2}
		 */

		
		var data = 'id=1';
		data += '&item={"id" : ' + object.id + ', "position" : ' + object.position + '}';
		
		
		this.sendData('php/ajax.php?action=setlist', data, function(response){
			
			var div = document.createElement('div');
			div.innerHTML = response.response;
			
			document.body.appendChild(div);
			
			//console.log(response);
			
		});
		
	}
	
}

var sortable = new sortableListAjax();

sortable.getList(1);

//var obj = {'id' : 1, 'position' : 3};

//sortable.setList(obj);



