<?php

// Configuration
$servername = 'localhost'; 
$username = 'root'; 
$password = ''; 
$dbname = 'test';

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to execute a query and return the results
function executeQuery($conn, $sql) {
    $result = $conn->query($sql);
    if (!$result) {
        die("Query failed: " . $conn->error);
    }
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

// Function to fetch all complaints
function fetchAllComplaints($conn) {
    $sql = "SELECT * FROM complaints";
    return executeQuery($conn, $sql);
}

// Function to fetch all service reports
function fetchAllServiceReports($conn) {
    $sql = "SELECT * FROM service_reports";
    return executeQuery($conn, $sql);
}

// Call the functions and store the results
$complaints = fetchAllComplaints($conn);
$serviceReports = fetchAllServiceReports($conn);

// Print the results
print_r($complaints);
print_r($serviceReports);

?>