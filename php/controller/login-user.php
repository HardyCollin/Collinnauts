<?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    
    $array = array(
        'exp'=> '',
        'exp1'=> '',
        'exp2'=> '',
        'exp3'=> '',
        'exp4'=> ''
    );
    
    //this code is filtering the input through the username and password database.
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    //this code calls upon the query for salt from users to where username thing.
    $query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
  
   //This here code sets the number of rows and fetches the array
    if($query->num_rows == 1) {
        $row = $query->fetch_array();
        //this here code checks if the login is successful and if it is it logs in.
        if($row["password"] === crypt($password, $row["salt"])) {
            $_SESSION["authenticated"] = true;
            $array["exp"] = $row["exp"];
            $array["exp1"] = $row["exp1"];
            $array["exp2"] = $row["exp2"];
            $array["exp3"] = $row["exp3"];
            $array["exp4"] = $row["exp4"];
            
            $_SESSION["name"] = $username;
            
            echo json_encode($array);
            
        }
        //if its wrong it echos the following stuff
        else {
            echo "Invalid username and password";
        }
    }
    //if its wrong it also echos this stuff and its twice because this blog is awesome.
    else {
        echo "Invalid username and password";
    }
    