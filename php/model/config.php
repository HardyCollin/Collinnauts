<?php
    //this is getting all the information from database.php
    require_once(__DIR__ . "/Database.php");
    session_start();
    session_regenerate_id(true);
    //checking the path of this project
    $path = "/CollinHAwesomenauts/php/";
    //this is all checking the host username stuff from the main database
    $host = "localhost";
    $username = "root";
    $password = "root";
    $database = "awesomenauts_db";
    //this is an if function checking connection and the connection with the database
    //and all the other stuff.
    //connection  to the datatabase
     if(!isset ($_SESSION["connection"])) {
        $connection = new Database($host, $username, $password, $database);
        $_SESSION["connection"] = $connection;
    }
    
    