<?php 
session_start();
require 'db.php';
require 'auth.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $user = loginUser($pdo, $email, $password);

    header('Content-Type: application/json'); // Set the content type to JSON

    if ($user) {
        // Store user data in session
        $_SESSION["user"] = $user;
        $_SESSION["role"] = $user['user_type'];
        
        echo json_encode([
            "success" => true,
            "redirect" => ($user['user_type'] === 'admin') ? '../View/admin.html' : 
                         (($user['user_type'] === 'student') ? 'student.php' : 'pilot.php'),
            "message" => "Login successful"
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid credentials"
        ]);
        exit;
    }
}
else {
    header('Content-Type: application/json');
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}
?>
