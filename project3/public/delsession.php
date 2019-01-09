<?php 
  session_start();
  $z = $_REQUEST['delsession'];
  unset($_SESSION[$z]);
?>