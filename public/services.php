<?php
// services.php

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

// Function to insert service report into database
function insertServiceReport($conn, $complaint_id, $eu_name, $job_card_number, $service_date, $service_time, $xisb_tech, $status, $department, $location, $equipment_type, $model_serial_number, $nature_of_defect, $probable_cause, $action_taken, $remarks, $created_at, $updated_at) {
    $sql = "INSERT INTO service_reports (complaint_id, eu_name, job_card_number, service_date, service_time, xisb_tech, status, department, location, equipment_type, model_serial_number, nature_of_defect, probable_cause, action_taken, remarks, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssssssssss", $complaint_id, $eu_name, $job_card_number, $service_date, $service_time, $xisb_tech, $status, $department, $location, $equipment_type, $model_serial_number, $nature_of_defect, $probable_cause, $action_taken, $remarks, $created_at, $updated_at);
    $stmt->execute();
    $stmt->close();
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $complaint_id = $_POST["complaint_id"];
    $eu_name = $_POST["eu_name"];
    $job_card_number = $_POST["job_card_number"];
    $service_date = $_POST["service_date"];
    $service_time = $_POST["service_time"];
    $xisb_tech = $_POST["xisb_tech"];
    $status = $_POST["status"];
    $department = $_POST["department"];
    $location = $_POST["location"];
    $equipment_type = $_POST["equipment_type"];
    $model_serial_number = $_POST["model_serial_number"];
    $nature_of_defect = $_POST["nature_of_defect"];
    $probable_cause = $_POST["probable_cause"];
    $action_taken = $_POST["action_taken"];
    $remarks = $_POST["remarks"];
    $created_at = $_POST["created_at"];
    $updated_at = $_POST["updated_at"];

    insertServiceReport($conn, $complaint_id, $eu_name, $job_card_number, $service_date, $service_time, $xisb_tech, $status, $department, $location, $equipment_type, $model_serial_number, $nature_of_defect, $probable_cause, $action_taken, $remarks, $created_at, $updated_at);
}

// Close database connection
$conn->close();
?>