<?php 
$host = 'localhost';
$dbname = 'siteweb';
$password = 'rami2004';
$user = 'root'; 

try { 
    $pdo = new PDO('mysql:host='.$host.';dbname='.$dbname, $user, $password);
    // Set PDO to throw exceptions on error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}
?>
