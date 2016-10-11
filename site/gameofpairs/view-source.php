<?php 

require "php/filesystem.php";


$filesys = new FileSystem();

?>
<!Doctype html>
<html>
	<head>
		<style type="text/css">
			@import url('css/reset.css');
			@import url('css/navigation.css');
			@import url('css/viewsource.css');
		</style>
		<script type="text/javascript" src="js/navigation.js"></script>
	</head>
	<body>
    		<?php 
    				if(!isset($file)){

    	?><nav id="navigation"><?php 
    		
			          $filesystem = new FileSystem();
			          $tree = $filesystem->readTree('.');
			          $folder = '';
			          
			          function treewalk($tree, $depth = 0){
			              
			              foreach ($tree as $key => $value){
			                  
			                  if(is_string($key)){
			                  		$folderdepth = $depth +20;
			                      echo "<div class='folder depth".$folderdepth."'>$key </div>";
			                  }
			                  if(is_array($value)){
			                      treewalk($value, $depth + 20);
			                  }else{
			                      if($key == 0){
			                          $folder = $value;
			                      }
			                      if($key == 1){
			                         echo '<div class="item depth'.$depth.'"><a href="?file='. $folder . $value .'"> '. $value .'</a></div>';
			                      }
			                  }
			                  
			              }
			              
			          }
					  treewalk($tree);

					?></nav><?php
		          
		          }
		          
		          ?>    	
		
		<main>
			<div id="mainContent">
			<p>Here you can view the source code used in this project. </p>
			<p>This is an important security issue since all the php files are exposed.</p> 
			<p>It is meant for demonstration only.</p>
			</div>
		</main>
	
	</body>
</html>

