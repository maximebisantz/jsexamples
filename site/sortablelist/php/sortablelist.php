<?php 

require 'connection.php';

class sortableList{

    private $conn;
    
    public function __construct($servername, $username, $password, $db){

        $this->conn = new Connection($servername, $username, $password, $db);

    }
    
    public function getLists(){
        $query = "SELECT id FROM lists";
        $result = $this->conn->query($query);
        $lists = array();
        while($row = $result->fetch_assoc()){
            $lists[] = $row;
        }
        return json_encode($lists);
    }
    
    public function getList($listId){
        
        $query = "SELECT * FROM lists WHERE id = $listId";
        $result = $this->conn->query($query);
        $row = $result->fetch_assoc();
        $items = explode(';', $row['items']);
        
        $itemList = array();
        foreach($items as $itemId){
            
            $itemId = (int)$itemId;
            
            $query = "SELECT * FROM items WHERE id = $itemId";
            $result = $this->conn->query($query);
            
            array_push($itemList, $result->fetch_assoc());
            
        }
        
        /**
         * { listId  : 1, items : {id : 1, content : blah, position: 4}}
         */
        
        // SORT THE RETURN OBJECT
        $sortable = array();
        foreach($itemList as $key => $item){
            $sortable[$key] = $item["position"];
        }
        
        asort($sortable);
        
        $sortedByPosition = array();
        
        foreach($sortable as $key => $value){
            $sortedByPosition[$key] = $itemList[$key];
        }
        

        return json_encode($sortedByPosition);
        
    }
    
    public function setList($listId, $item){
        
        $list = json_decode($this->getList($listId));
        $item = json_decode($item);
        
        $counter = 0;
        $arrayOfItems = array();
        
        //var_dump($item);
        
        $lastItem = end($list);
        $lastPosition = 0;
        
        // Determine the position before change.
        foreach($list as $listItem){
            if($listItem->id == $item->id){
                $lastPosition = $listItem->position;
            }
        }
        
        foreach ($list as $listItem){
            // If the target item is the same as the selected item
            if($listItem->id == $item->id && $listItem->position != $item->position){
                continue;
            }
            // If the target and selected are the same.
            if($listItem->id == $item->id && $listItem->position == $item->position){
                array_push($arrayOfItems, $item);
                continue;
            }
            
            // If the last item, then the push need to be 
            // before it pushes the selected item
            if($listItem == $lastItem){
                array_push($arrayOfItems, $listItem);
                if($listItem->position == $item->position){
                    array_push($arrayOfItems, $item);
                }
            }else{
                /*
                 * Change the way the item is positionned in the
                 * list according to its last position. It gives
                 * the ability to know if the item is moving up
                 * or down the list.
                 */
                if($lastPosition > $item->position){
                    if($item->position == $listItem->position){
                        array_push($arrayOfItems, $item);
                    }
                    array_push($arrayOfItems, $listItem);
                }else{
                    array_push($arrayOfItems, $listItem);
                    if($item->position == $listItem->position){
                        array_push($arrayOfItems, $item);
                    }
                    
                }
                
            }
        }
        
        var_dump($arrayOfItems);
        
        
        foreach($arrayOfItems as $arrayItem){
            $arrayItem->position = ++$counter;
            $position = $arrayItem->position;
            $id = $arrayItem->id;
            
            $query = "UPDATE items SET position=$position WHERE id=$id AND listId=$listId";
        
            $this->conn->query($query);
            
        }
        
        echo "The list has been updated";
        
    }

}