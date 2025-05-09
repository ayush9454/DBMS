-- Create the database
CREATE DATABASE IF NOT EXISTS smart_parking;
USE smart_parking;

-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parking lots table
CREATE TABLE parking_lots (
    lot_id INT PRIMARY KEY AUTO_INCREMENT,
    lot_name VARCHAR(100) NOT NULL,
    total_spaces INT NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parking spaces table
CREATE TABLE parking_spaces (
    space_id INT PRIMARY KEY AUTO_INCREMENT,
    lot_id INT NOT NULL,
    space_number VARCHAR(20) NOT NULL,
    space_type ENUM('regular', 'handicap', 'electric') DEFAULT 'regular',
    status ENUM('available', 'occupied', 'reserved', 'maintenance') DEFAULT 'available',
    FOREIGN KEY (lot_id) REFERENCES parking_lots(lot_id),
    UNIQUE KEY unique_space (lot_id, space_number)
);

-- Bookings table
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    space_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    total_amount DECIMAL(10,2),
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (space_id) REFERENCES parking_spaces(space_id)
);

-- Payments table
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    payment_status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- Vehicle information table
CREATE TABLE vehicles (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plate_number VARCHAR(20) NOT NULL,
    vehicle_type VARCHAR(50),
    make VARCHAR(50),
    model VARCHAR(50),
    color VARCHAR(30),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE KEY unique_plate (plate_number)
);

-- Insert sample admin user
INSERT INTO users (username, password, email, full_name, role)
VALUES ('admin', '$2b$10$xxxxxxxxxxx', 'admin@smartparking.com', 'System Admin', 'admin');

-- Insert new user
INSERT INTO users (username, password, email, full_name, role)
VALUES ('ayu123', '$2b$10$xxxxxxxxxxx', 'ayu123@example.com', 'Ayush Singh', 'user');

-- Insert sample parking lot
INSERT INTO parking_lots (lot_name, total_spaces, hourly_rate, location)
VALUES ('Main Parking', 100, 2.50, '123 Main Street'); 