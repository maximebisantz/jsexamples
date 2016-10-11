<?php

require 'php/filesystem.php';

$filesys = new FileSystem();

if(isset($_REQUEST['file'])){
    
    $filepath = $_REQUEST['file'];
    $file = $filesys->readFile($filepath);
    
}

echo $file;