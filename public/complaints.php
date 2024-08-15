<?php
// complaints.php

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

// Function to insert complaint into database
function insertComplaint($conn, $place, $date, $user_name, $department, $position, $contact_number, $email, $hardware_type, $hardware_serial_number, $comments) {
    $sql = "INSERT INTO complaints (place, date, user_name, department, position, contact_number, email, hardware_type, hardware_serial_number, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $place, $date, $user_name, $department, $position, $contact_number, $email, $hardware_type, $hardware_serial_number, $comments);
    $stmt->execute();
    $stmt->close();
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $place = $_POST["place"];
    $date = $_POST["date"];
    $user_name = $_POST["user_name"];
    $department = $_POST["department"];
    $position = $_POST["position"];
    $contact_number = $_POST["contact_number"];
    $email = $_POST["email"];
    $hardware_type = $_POST["hardware_type"];
    $hardware_serial_number = $_POST["hardware_serial_number"];
    $comments = $_POST["comments"];

    insertComplaint($conn, $place, $date, $user_name, $department, $position, $contact_number, $email, $hardware_type, $hardware_serial_number, $comments);
}

// Close database connection
$conn->close();