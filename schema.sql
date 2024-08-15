CREATE DATABASE complaint_service;

USE complaint_service;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE complaints (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    place VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hardware_type VARCHAR(255) NOT NULL,
    hardware_serial_number VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE service_reports (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    eu_name VARCHAR(255) NOT NULL,
    job_card_number VARCHAR(255) NOT NULL,
    service_date DATE NOT NULL,
    service_time TIME NOT NULL,
    xisb_tech VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    equipment_type VARCHAR(255) NOT NULL,
    model_serial_number VARCHAR(255) NOT NULL,
    nature_of_defect TEXT NOT NULL,
    probable_cause TEXT NOT NULL,
    action_taken TEXT NOT NULL,
    remarks TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, role)
VALUES ('user1', 'user1@example.com', '123', 'user');


INSERT INTO users (username, email, password, role)
VALUES ('tech1', 'tech1@example.com', '123', 'technician');


INSERT INTO users (username, email, password, role)
VALUES ('admin1', 'admin1@example.com', '123', 'admin');
