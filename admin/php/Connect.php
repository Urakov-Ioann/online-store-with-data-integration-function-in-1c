<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mitsubishiautoparts";

function connect(){
    $conn = mysqli_connect("localhost", "root", "", "mitsubishiautoparts");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    mysqli_set_charset($conn, charset: "utf8");
    return $conn;
}
?>