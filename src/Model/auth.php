<?php
require 'db.php';

function loginUser($pdo, $email, $password) { 
    // Try admin table first
    $stmt = $pdo->prepare("SELECT *, 'admin' as user_type FROM admin WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // Try student table
        $stmt = $pdo->prepare("SELECT *, 'student' as user_type FROM student WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    if (!$user) {
        // Try pilot table
        $stmt = $pdo->prepare("SELECT *, 'pilot' as user_type FROM pilot WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    if ($user && password_verify($password, $user['password'])) { 
        return $user; 
    }
    return false; 
}




?>