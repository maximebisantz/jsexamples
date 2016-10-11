class Navigation {
	
	constructor(container){
		
		var basecontainer = document.getElementById(container);

		this.links = this.getAllLinks(basecontainer);
		this.url = "source.php";
		
		for(var i=0; i < this.links.length; i++){
			this.setLink(this.links[i]);
		}
		
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
	
	getAllLinks(container){
		var links = container.getElementsByTagName('a');
		return links;
	}
	
	setLink(link){
		var _this = this;
		//console.log(link);
		link.addEventListener('click', function(e){
			var e = e || event;
			var href = link.href;

			href = href.slice(href.indexOf('?file='), href.length);	
			e.preventDefault();
			_this.setFile(href);
			
			
		});
		
	}
	
	setFile(file){
		var main = document.getElementsByTagName('main')[0];
		var url = this.url  + file;

		this.loadData(url, function(response){
			
			var mainContainer = document.getElementById('mainContent');
			
			mainContainer.innerHTML = "";
			mainContainer.innerHTML = response.responseText;
			
		})
		
	}
	
}

window.addEventListener('load', function(){
	var nav = new Navigation('navigation');	
})
