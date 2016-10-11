<?php 

Class FileSystem{
    
    private $directory = array();
    
    public function __construct(){
        
    }
    
    public function readFile($filepath){
        $file = file($filepath);
        
		$page = '';
        $page .= "<pre>";

        $file_parts = pathinfo($filepath);
        if($file_parts["extension"] == "php"){
            $page .= htmlentities(file_get_contents($filepath));
            
        }else{
            foreach ($file as $line){
                $page .= htmlentities($line);
            }
        }
		$page .= '</pre>';

        return $page;
        
    }
    
    /**
     * http://stackoverflow.com/questions/18251505/file-structure-to-multidimensional-array
     * 
     * Recursive function walking through the directory structure and storing the result in
     * an array. 
     */
    public function readTree($dir){
        $result = array();
        $cdir = scandir($dir);
        
        foreach($cdir as $key => $value){
            if(!in_array($value, array('.','..'))){
                if(is_dir($dir . DIRECTORY_SEPARATOR . $value)){
                    $result[$value] = $this->readTree($dir . DIRECTORY_SEPARATOR . $value);
                }else{
                    $result[] = array($dir . DIRECTORY_SEPARATOR , $value);
                }
            }
        }
        
        
        $result = $this->sortTree($result);
        
        return $result;
 
    }
    
    /**
     * Sorting first the folder and then the file 
     * of the directory 
     * 
     * @param array $tree
     */
    private function sortTree($tree){
        
        $result = array();
        
        // Add everything that is not a file of the current dir.
        foreach ($tree as $key => $value){
            if(is_array($value) && isset($value[0])){
                if($value[0] != '.\\'){
                    $result[$key] = $value;
                }
            }
        }
        // Add last the files of the current dir.
        foreach($tree as $key => $value){
            
            if(is_array($value) && isset($value[0])){
                if($value[0] == '.\\'){
                    $result[$key] = $value;
                };
            }
        }
        
       return $result;
    }
    
    
}


$filesys = new FileSystem();


//var_dump($filesys->readTree('../')) ;

//echo $filesys->readFile('../php/ajax.php');
