<?php
/*This here code authenticates the User who is trying to log in. It also calls
upon the config.php for some handy code that helps run this amazing blog that
blows everyones mind.*/
    require_once(__DIR__ . "/../model/config.php");
    //here it authenticates the user and if it's false it says you have the wrong username and password.
    function authenticateUser() {
        if(!isset($_SESSION["authenticated"])) {
            return false;
        }
        else {
            if($_SESSION["authenticated"] != true){
                return false;
            }
            else {
                return true;
            }
        }
    }