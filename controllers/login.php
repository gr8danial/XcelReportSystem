<?php
// login.php

// Connect to the database
$servername = 'localhost'; 
$username = 'root'; 
$password = ''; 
$dbname = 'test';

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to check if user exists and retrieve role
function checkUser($conn, $username, $password) {
    $sql = "SELECT role FROM users WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['role'];
    } else {
        return false;
    }
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $role = checkUser($conn, $username, $password);

    if ($role !== false) {
        // Login successful, redirect to appropriate page based on role
        switch ($role) {
            case 'user':
                header("Location: complaints.php");
                break;
            case 'technician':
                header("Location: reports.php");
                break;
            case 'admin':
                header("Location: admin.php");
                break;
            default:
                echo "Invalid role";
                break;
        }
        exit;
    } else {
        // Login failed, display error message
        echo "Invalid username or password";
    }
}

// Close database connection
$conn->close();
?>

