<?php

require "sortablelist.php";
require "filesystem.php";

Class Ajax {
    
    private $request;
    private $sortable;
    private $filesystem;
    
    public function __construct(){
        /**
         * @var Ajax $request
         * POST: ?action=list&data=data
         */
        $this->request = $_REQUEST;
        $this->sortable = new sortableList('localhost', 'root', '', 'sortablelist');
        $this->filesystem = new FileSystem();
        $this->sortRequest();
    }
    
    private function sortRequest(){
        
        switch ($this->request['action']):

            case 'lists'    :
                echo $this->sortable->getLists();
                break;  
            
            case 'list'     :
                echo $this->sortable->getList($this->request['id']);
                break;
            
            case 'setlist'  :
                var_dump($_REQUEST['item']);
                echo $this->sortable->setList($this->request['id'], $this->request['item']);
                break;
            case 'readfile' : 
                return $this->filesystem->readFile($_REQUEST['file']);
        
        endswitch;
    }
    
}

new Ajax();   