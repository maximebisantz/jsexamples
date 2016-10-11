<?php 

Class Connection{
    
    private $servername;
    private $username;
    private $password;
    private $db;
    private $conn;    
    
    public function __construct($servername, $username, $password, $db){
        
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->db = $db;
    }
    
    private function connect(){
        $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->db);
        if(!$conn){
            die ("connection failed" . $conn->connect_error());
        }else{
            $this->conn = $conn;
        }
    }
    
    public function query($query){
        $this->connect();
        
        $result = $this->conn->query($query);
        
        $this->conn->close();
        
        return $result;
        
    }
    
}

?>