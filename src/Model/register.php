<?php
// First require the database connection
require_once 'db.php';

class Register {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function registerAdmin($name, $email, $password) {
        try {
            // Check if email already exists
            $stmt = $this->pdo->prepare("SELECT email FROM admin WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() > 0) {
                return ["success" => false, "message" => "Email already exists"];
            }

            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Prepare INSERT statement
            $stmt = $this->pdo->prepare(
                "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)"
            );

            // Execute with parameters
            $success = $stmt->execute([$name, $email, $hashedPassword]);

            if ($success) {
                return ["success" => true, "message" => "Admin registered successfully"];
            } else {
                return ["success" => false, "message" => "Registration failed"];
            }

        } catch (PDOException $e) {
            return ["success" => false, "message" => "Error: " . $e->getMessage()];
        }
    }
}

// Make sure we have a valid PDO connection
if (!isset($pdo)) {
    die("Database connection failed");
}

// Create instance with the PDO connection
$register = new Register($pdo);

// Admin credentials
$name = "Administrator";
$email = "admin@example.com";
$password = "admin123";

try {
    // Register the admin
    $result = $register->registerAdmin($name, $email, $password);
    
    // Display result
    echo $result["message"];
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
