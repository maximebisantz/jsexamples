<?php 


Class GameOfPairs{
    
    private $folder;
    private $listOfImage;
    private $selectedImages;
    
    private $numberOfPairs = 4;
    
    public function __construct($imgFolder){
        $this->folder = $imgFolder;
        
        $this->getImageList($this->folder);
    }
    
    private function getImageList($imgFolder){
        $list = array();
        
        $folder = dir($imgFolder);
        while(false !== ($entry = $folder->read())){
            if($entry == '.' || $entry == '..' || $entry == 'holder.jpg')
                continue;
            $list[] = $entry;
        }
        $folder->close();
        
        $this->listOfImage = $list;
        
    }
    
    private function selectImage(){
        // Select random index for image
        $random = array_rand($this->listOfImage);

        // Save the selected image.
        $this->selectedImages[] = $this->listOfImage[$random];
        
        // remove it from the picking list.
        unset($this->listOfImage[$random]);
    }
    
    public function buildGame(){
        // Select 4 images
        for($i=0; $i <= $this->numberOfPairs - 1; $i++){
            $this->selectImage();
        }
        // Add their double to the array
        foreach($this->selectedImages as $value){
            $this->selectedImages[] = $value;
        }
        
        // Shuffle the array
        shuffle($this->selectedImages);
        
        return $this->selectedImages;
                
    }
    
    public function setNumberOfPairs($numberOfPairs){
        $this->numberOfPairs = $numberOfPairs;
    }
    
    public function getNumberOfPairs(){
        return $this->numberOfPairs;
    }
    
    
}

// $game = new GameOfPairs('../img');

// $game->buildGame();



