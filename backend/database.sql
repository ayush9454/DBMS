-- Create the database
CREATE DATABASE IF NOT EXISTS smart_parking_system;
USE smart_parking_system;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parking lots table
CREATE TABLE IF NOT EXISTS parking_lots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    total_spots INT NOT NULL,
    available_spots INT NOT NULL,
    rate_per_hour DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parking spots table
CREATE TABLE IF NOT EXISTS parking_spots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parking_lot_id INT NOT NULL,
    spot_number VARCHAR(10) NOT NULL,
    status ENUM('available', 'occupied', 'reserved', 'maintenance') DEFAULT 'available',
    type ENUM('standard', 'handicap', 'electric', 'vip') DEFAULT 'standard',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parking_lot_id) REFERENCES parking_lots(id) ON DELETE CASCADE,
    UNIQUE KEY unique_spot (parking_lot_id, spot_number)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    parking_spot_id INT NOT NULL,
    booking_id VARCHAR(20) UNIQUE NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    duration INT NOT NULL, -- in hours
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parking_spot_id) REFERENCES parking_spots(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'upi', 'wallet') NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Insert sample data for parking lots in Bangalore
INSERT INTO parking_lots (name, address, total_spots, available_spots, rate_per_hour) VALUES
('MG Road Parking', 'MG Road, Bangalore, Karnataka 560001', 50, 15, 50.00),
('Koramangala Plaza', '8th Block, Koramangala, Bangalore, Karnataka 560034', 30, 8, 40.00),
('Indiranagar Complex', '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038', 100, 20, 45.00),
('Whitefield Tech Park', 'ITPL Road, Whitefield, Bangalore, Karnataka 560066', 75, 25, 35.00),
('Electronic City', 'Phase 1, Electronic City, Bangalore, Karnataka 560100', 60, 18, 30.00);

-- Insert sample parking spots for each lot
INSERT INTO parking_spots (parking_lot_id, spot_number, type) VALUES
-- MG Road Parking spots
(1, 'A1', 'standard'),
(1, 'A2', 'standard'),
(1, 'A3', 'handicap'),
(1, 'A4', 'electric'),
(1, 'A5', 'vip'),

-- Koramangala Plaza spots
(2, 'B1', 'standard'),
(2, 'B2', 'standard'),
(2, 'B3', 'handicap'),
(2, 'B4', 'electric'),
(2, 'B5', 'vip'),

-- Indiranagar Complex spots
(3, 'C1', 'standard'),
(3, 'C2', 'standard'),
(3, 'C3', 'handicap'),
(3, 'C4', 'electric'),
(3, 'C5', 'vip'),

-- Whitefield Tech Park spots
(4, 'D1', 'standard'),
(4, 'D2', 'standard'),
(4, 'D3', 'handicap'),
(4, 'D4', 'electric'),
(4, 'D5', 'vip'),

-- Electronic City spots
(5, 'E1', 'standard'),
(5, 'E2', 'standard'),
(5, 'E3', 'handicap'),
(5, 'E4', 'electric'),
(5, 'E5', 'vip');

-- Create indexes for better performance
CREATE INDEX idx_parking_lots_status ON parking_lots(status);
CREATE INDEX idx_parking_spots_status ON parking_spots(status);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);

-- Create a view for available parking spots
CREATE VIEW available_spots AS
SELECT 
    pl.id as parking_lot_id,
    pl.name as parking_lot_name,
    pl.address,
    pl.rate_per_hour,
    ps.id as spot_id,
    ps.spot_number,
    ps.type
FROM parking_lots pl
JOIN parking_spots ps ON pl.id = ps.parking_lot_id
WHERE pl.status = 'active'
AND ps.status = 'available';

-- Create a view for active bookings
CREATE VIEW active_bookings AS
SELECT 
    b.id as booking_id,
    b.booking_id as reference_number,
    u.username,
    u.email,
    pl.name as parking_lot_name,
    ps.spot_number,
    b.start_time,
    b.end_time,
    b.duration,
    b.total_amount,
    b.status
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN parking_spots ps ON b.parking_spot_id = ps.id
JOIN parking_lots pl ON ps.parking_lot_id = pl.id
WHERE b.status IN ('pending', 'confirmed'); 