<?php
 session_start();
 $y = $_REQUEST["getsession"];
 echo $_SESSION[$y];
?>