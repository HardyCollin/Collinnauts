<?php
//this is checking the class database and making it all PRIVATE
class Database {
    //here it makes it all private cause privacy is good.
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;
    //here is doing this functions and calling username password and database.
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        //this mysqli thing is checking the host udername and password through the this thing.
        $this->connection = new mysqli($host, $username, $password);
        //if it doesn't work it dies and sends and error message.
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
        //this checks the connection and does stuff in the database
        $exists = $this->connection->select_db($database);
        //checks the thing by querying the thing
        if (!$exists) {
            $query = $this->connection->query("CREATE DATABASE $database");
            //if it works it exectues
            if ($query) {
            }
            //if not it goes the the else statement
        } else {
        }
    }
    //this public function is checking  all the sstuff and if it doesn't have it it sends an error
    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
       //this is the error
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }
    //this here closes the public connetion or something 
    public function closeConnection() {
        if(isset($this->connection)) {
            $this->connection->close();
        }
    }
    //pthis string checks the query which it is desired to check
    public function query($string) {
        $this->openConnection();
        
        $query = $this->connection->query($string);
        //heres the if statement if the query is correct.
        if(!$query) {
            $this->error = $this->connection->error;
        }
        
        //this closes the connectioin then it returns to the query thing or something.
        $this->closeConnection();
        //this is the return query code.
        return $query;
    }
    
}