<!--The start of the code.-->
<?php
    //requiring the config file for the following code.
    require_once(__DIR__ . "/../model/config.php");
    //this is the second query which attempts to create the tables and users or something.
    $query2 = $_SESSION["connection"]->query("CREATE TABLE users ("
               //code that helps do stuff
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "username varchar(30) NOT NULL,"
            . "email varchar (50) NOT NULL,"
            . "password char (128) NOT NULL,"
            . "salt char(128) NOT NULL,"
            . "exp int(4), "
            . "exp1 int(4), "
            . "exp2 int(4), "
            . "exp3 int(4), "
            . "exp4 int(4), "
            . "PRIMARY KEY (id))");