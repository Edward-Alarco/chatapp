<?php 
    $conn = mysqli_connect("localhost","root","","chatapp");
    //si es que no conecta, que muestre cual es el error
    if(!$conn){
        echo "database connected".mysqli_connect_error();
    }
?>