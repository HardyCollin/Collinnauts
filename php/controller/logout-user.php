<!--This here code logs out the user if they close down the web browser.-->
<?php
    //requiring the config.php file
    require_once(__DIR__ . "/../model/config.php");
    //if the user closes down their browser completely it logs out 
    unset($_SESSION["authenticated"]);
    //and destroys the session.
    session_destroy();
    header("Location: " . $path . "index.php");